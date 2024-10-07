import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { TaskInfoType } from "../schema/task";
import { TaskItem } from "./TaskItem";
import EditTask from "./EditTask";
import { mockedUsers } from "../schema/users";

const ITEMS_PER_PAGE = 10;

const TaskList: React.FC = () => {
  const tasksData = useSelector((state: { task: { tasksInfo: TaskInfoType[] } }) => state.task.tasksInfo);
  const [status, setStatus] = useState<"pending" | "in-progress" | "completed" | "all">("all");
  const [assignedTo, setAssignedTo] = useState("All Assignees");
  //filter tasks based on status and assignedTo
  const tasks = useMemo(() => {
    return tasksData.filter((task) => {
      if (status !== "all" && task.status !== status) {
        return false;
      }
      if (assignedTo!== "All Assignees" && task.assignedTo !== assignedTo) {
        return false;
      }
      return true;
    });
  }, [tasksData, status, assignedTo]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(tasks.length / ITEMS_PER_PAGE);
  const displayedTasks = tasks.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(0);
  const userOptions = useMemo(() => 
  ([<option key="all" value="All Assignees">All Assignees</option>]).concat(mockedUsers.map((user) => (
    <option key={user.id} value={user.name}>
      {user.name}
    </option>
  ))), [mockedUsers]);
  const handleOpenModal = (id: number) => {
    setIsModalOpen(true);
    setEditId(id);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
<>
<div data-testid="task-list" className="p-4 sm:ml-64">
   <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
      <div className="flex  h-10 mb-4 rounded">
      <h4 className="p-2">Tasks List </h4>
      </div>
      <hr className="my-6 border-gray-300" />
      <div className="flex items-center justify-start h-10 mb-4 rounded">
      <div className="relative overflow-x-auto sm:rounded-lg">
      <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4" style={{
    alignItems: 'baseline',
}}>
<div className="mb-4 p-2">
  <select
    id="taskStatus"
    value={status}
    onChange={(e) => setStatus(e.target.value as "pending" | "in-progress" | "completed")}
    className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
  >
    <option value="all">All Status</option>
    <option value="pending">Pending</option>
    <option value="in-progress">In Progress</option>
    <option value="completed">Completed</option>
  </select>
 </div>

 <div className="mb-4 p-2">
      <select
        id="assignedTo"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
        className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      >
        {userOptions}
      </select>
    </div>
    </div>
    </div>
      </div>
      <div className="flex items-center justify-start mb-4 rounded relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Task name
                </th>
                <th scope="col" className="px-6 py-3">
                    Description
                </th>
                <th scope="col" className="px-6 py-3">
                    Assignee
                </th>
                <th scope="col" className="px-6 py-3">
                    Due Date
                </th>
                <th scope="col" className="px-6 py-3">
                    Status
                </th>
                <th scope="col" className="px-6 py-3">
                    Priority
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
         {displayedTasks.map((task) => (
            <TaskItem key={task.id} task={task} onEditClick={() => handleOpenModal(task.id)} />
          ))}
        </tbody>
      </table>
      </div>
    <div className="mb-4 rounded">
      <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
        Showing{" "}
        <span className="font-semibold text-gray-900 dark:text-gray">
          {(currentPage - 1) * ITEMS_PER_PAGE + 1}-
          {Math.min(currentPage * ITEMS_PER_PAGE, tasks.length)}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-gray-900 dark:text-gray">
          {tasks.length}
        </span>
      </span>
      <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
        <li>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            Previous
          </button>
        </li>
        {[...Array(totalPages)].map((_, index) => (
          <li key={index}>
            <button
              onClick={() => setCurrentPage(index + 1)}
              className={`flex items-center justify-center px-3 h-8 leading-tight ${
                currentPage === index + 1
                  ? "text-blue-600 border border-gray-300 bg-blue-50"
                  : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              } dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
            >
              {index + 1}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            Next
          </button>
        </li>
      </ul>
      </nav>
   </div>
   </div>
   <EditTask data-testid="edit-task" isOpen={isModalOpen} onClose={handleCloseModal} editId={editId}/>
</div>
</>
  );
};

export default TaskList;


