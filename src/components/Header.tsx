import React, { useState } from "react";
import UserProfile from "./Users/UserProfile"; 
import { HeaderProps } from "../schema/task";
import UserNotification from "./Users/UserNotification";
import CreateTask from "./CreateTask";
  const Header: React.FC<HeaderProps> = ({ isAuthenticated }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
  return (
    <header className="bg-blue-600 text-white p-2 flex justify-between items-center fixed w-full top-0 z-10" data-testid="header">
      <div className="flex items-center">
      <h1 className="text-lg font-bold cursor-default mr-4">Task Management App</h1>
      {isAuthenticated && (
        <button onClick={handleOpenModal} className="bg-white text-blue-600 rounded py-1 px-2 text-sm hover:bg-gray-200">
        create task
      </button>
      )}
      </div>
        {isAuthenticated && (
        <div className="flex items-center">
        <UserNotification />
        <UserProfile />
      </div>
    )}
      <CreateTask data-testid="task-form" isOpen={isModalOpen} onClose={handleCloseModal}/>
    </header>
  );
};


export default Header;

