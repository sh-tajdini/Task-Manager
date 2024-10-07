import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AddTask, UpdateTask } from '../reducers/Task/taskReducer';

const useWebSocket = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setSocket(ws);
  
    ws.onopen = () => {
      console.log('WebSocket connected');
    };
  
    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };
  
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('WebSocket message received:', data);
      switch (data.type) {
        case 'initialTasks':
          data.tasks.forEach((task: any) => {
            dispatch(AddTask({ task, successCallback: () => {} }));
          });
          break;
        case 'taskAdded':
          dispatch(AddTask({ task: data.task, successCallback: () => {} }));
          break;
        case 'taskUpdated':
          dispatch(UpdateTask({
            task: data.task,
          }));
          break;
        default:
          console.log('Unknown message type:', data.type);
      }
    };

    return () => {
      ws.close();
    };
  }, [dispatch]);

  const sendMessage = useCallback((type: string, payload: any) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type, ...payload }));
    }
  }, [socket]);

  return { sendMessage };
};

export default useWebSocket;