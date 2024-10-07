import { useState, useCallback, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddTask } from "../reducers/Task/taskReducer";
import useWebSocket from "./useWebsocket";
import { ActionTaskProps } from "../schema/task";
import { mockedUsers } from "../schema/users";
import { RootState } from "../store";
import { UpdateTask } from "../reducers/Task/taskReducer";

const useActionTask = ({ onClose, editId }: ActionTaskProps) => {
  const dispatch = useDispatch();
  const { sendMessage } = useWebSocket();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState(mockedUsers[0]?.name || "");
  const [dueDate, setDueDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [status, setStatus] = useState<"pending" | "in-progress" | "completed">("pending");
  const [priority, setPriority] = useState<"high" | "medium" | "low">("low");
  
  const taskToEdit = useSelector((state: RootState) => state.task.tasksInfo.find((task) => task.id === editId));
  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setAssignedTo(taskToEdit.assignedTo);
      setDueDate(taskToEdit.dueDate);
      setStatus(taskToEdit.status);
      setPriority(taskToEdit.priority);
    }
  }, [taskToEdit]);  

  const resetForm = useCallback(() => {
    setTitle("");
    setDescription("");
    setAssignedTo(mockedUsers[0]?.name || "");
    setDueDate(new Date().toISOString().split("T")[0]);
    setStatus("pending");
    setPriority("low");
  }, [mockedUsers]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!title || !description || !assignedTo || !dueDate || !status || !priority) {
        return;
      }

      const task = {
        id: Date.now(),
        title,
        description,
        status,
        assignedTo,
        dueDate,
        priority,
      };
      console.log('Sending addTask message:', task); 
      sendMessage('addTask', { task });

      dispatch(
        AddTask({
          task,
          successCallback: resetForm,
        })
      );
      onClose();  
    },
    [dispatch, sendMessage, title, description, assignedTo, dueDate, status, priority, resetForm]
  );

  const handleEditSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!title || !description || !assignedTo || !dueDate || !status || !priority || !editId) {
        return;
      }

      const task = {
        id: editId,
        title,
        description,
        status,
        assignedTo,
        dueDate,
        priority,
      };
      console.log('Sending editTask message:', task); 
      sendMessage('editTask', { task });

      dispatch(
        UpdateTask({
          task,
        })
      );
      onClose();  
    },
    [dispatch, sendMessage, title, description, assignedTo, dueDate, status, priority, resetForm]
  );
  
  const userOptions = useMemo(() => mockedUsers.map((user) => (
    <option key={user.id} value={user.name}>
      {user.name}
    </option>
  )), [mockedUsers]);

  return {
    title,
    setTitle,
    description,
    setDescription,
    assignedTo,
    setAssignedTo,
    dueDate,
    setDueDate,
    status,
    setStatus,
    priority,
    setPriority,
    handleSubmit,
    handleEditSubmit,
    userOptions,
  };
};

export default useActionTask;
