import React from 'react';
import useActionTask from '../hooks/useActionTask';
import { ModalProps } from '../schema/task';

const EditTask: React.FC<ModalProps> = ({ isOpen, onClose, editId }) => {

  const {
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
    setPriority,
    handleEditSubmit,
    userOptions,
  } = useActionTask({ onClose,editId });

  if (!isOpen) return null;
  return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20" style={{ color: '#384151' }}>

    <form
    onSubmit={handleEditSubmit}
    className="w-full md:w-1/2 lg:w-1/3 mx-auto p-6 bg-white rounded-lg shadow-lg mt-20"
  >
  <div className="flex justify-between items-center mb-4"> 
    <h2 className="text-xl font-semibold text-gray-700">
      Create a New Task
    </h2>
    <button
      type="button"
      onClick={onClose}
      className="text-gray-500 hover:text-gray-800 focus:outline-none text-2xl" 
    >
      &times;
    </button>
  </div>
    <div className="mb-4">
      <label className="block mb-1 text-gray-700" htmlFor="taskTitle">
        Task Title
      </label>
      <input
        id="taskTitle"
        type="text"
        placeholder="Enter task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
        required
      />
    </div>

    <div className="mb-4">
      <label className="block mb-1 text-gray-700" htmlFor="taskDescription">
        Task Description
      </label>
      <textarea
        id="taskDescription"
        placeholder="Enter task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
        required
      />
    </div>

    <div className="mb-4">
      <label className="block mb-1 text-gray-700" htmlFor="assignedTo">
        Assign To
      </label>
      <select
        id="assignedTo"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
      >
        {userOptions}
      </select>
    </div>

    <div className="mb-4">
      <label className="block mb-1 text-gray-700" htmlFor="dueDate">
        Due Date
      </label>
      <input
        id="dueDate"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
        required
      />
    </div>

    <div className="mb-4">
      <label className="block mb-1 text-gray-700" htmlFor="taskStatus">
        Status
      </label>
      <select
        id="taskStatus"
        value={status}
        onChange={(e) => setStatus(e.target.value as "pending" | "in-progress" | "completed")}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
        required
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
    </div>

    <div className="mb-4">
      <label className="block mb-1 text-gray-700" htmlFor="taskPriority">
      Priority
      </label>
      <select
        id="taskPriority"
        value={status}
        onChange={(e) => setPriority(e.target.value as "high" | "medium" | "low")}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
        required
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>

    <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
      Edit Task
    </button>
  </form>
   </div>
  );
};

export default EditTask;