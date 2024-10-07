import React, { useCallback } from "react";
import { TaskItemProps } from "../schema/task";



export const TaskItem: React.FC<TaskItemProps> = ({ task,onEditClick }) => {
  const handleEditClick = useCallback(() => {
    onEditClick(task.id);
  }, [onEditClick, task.id]);
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
      {task.title}
    </th>
    <td className="px-6 py-4">
    {task.description}
    </td>
    <td className="px-6 py-4">
    {task.assignedTo}
    </td>
    <td className="px-6 py-4">
    {task.dueDate}
    </td>
    <td className="px-6 py-4">
    {task.status}
    </td>
    <td className="px-6 py-4">
    {task.priority}
    </td>
    <td className="px-6 py-4">
        <a href="#" onClick={handleEditClick} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
    </td>
</tr>
  );
};
