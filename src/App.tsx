import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./store";

import Sidebar from "./components/Sidebar";
import TaskList from "./components/TaskList";
import Login from "./components/Users/Login";
import useWebSocket from "./hooks/useWebsocket";
import Header from "./components/Header";

const App: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isLoggedIn
  );

  useWebSocket();

  return (
    <Router>
      <div className="">
        <div className="flex items-center justify-center h-10 bg-gray-50 dark:bg-gray-800 mb-2">
        <Header data-testid="header" isAuthenticated={isAuthenticated} className="w-full md:w-3/4 mx-auto" />
        </div>
        <Routes>
          <Route path="/" element={<Login data-testid="login" />} />
          <Route
            path="/app"
            element={
              isAuthenticated ? (
                <div>
                    <Sidebar data-testid="sidebar" />
                    <TaskList data-testid="task-list" />
                </div>
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;


