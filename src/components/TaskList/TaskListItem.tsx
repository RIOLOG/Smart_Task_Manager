

import React from 'react';
import { Task } from '../../types';

interface TaskListItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskListItem: React.FC<TaskListItemProps> = ({ task, onEdit, onDelete }) => {
  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex justify-between items-center">
      <div className="flex-1 text-gray-200">
        <h3 className="text-lg font-semibold text-gray-100 mb-1">{task.title}</h3>
        <p className="text-gray-400 mb-1">{task.description}</p>
        <p className="text-gray-400 mb-1">Due Date: {task.dueDate}</p>
        <p className="text-gray-400 mb-1">Priority: 
          <span className={`font-medium ${task.priority === 'high' ? 'text-red-400' : task.priority === 'medium' ? 'text-yellow-400' : 'text-green-400'}`}>
            {task.priority}
          </span>
        </p>
        <p className={`font-medium ${task.completed ? 'text-green-300' : 'text-red-400'}`}>
          Status: {task.completed ? 'Completed' : 'Pending'}
        </p>
      </div>
      <div className="space-x-2">
        <button
          onClick={() => onEdit(task)}
          className="py-1 px-2 bg-yellow-600 text-gray-200 rounded-md hover:bg-yellow-500 transition-colors duration-300"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="py-1 px-2 bg-red-600 text-gray-200 rounded-md hover:bg-red-500 transition-colors duration-300"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskListItem;
