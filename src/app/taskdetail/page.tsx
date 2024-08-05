'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import ClientLayout from '../ClientLayout';



const TaskDetailPage: React.FC = () => {
  const { id } = useParams();
  const task = useSelector((state: RootState) => 
    state.tasks.tasks.find((task) => task.id === id)
  );

  if (!task) {
    return <p>Task not found</p>;
  }

  return (
    <ClientLayout>
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">{task.title}</h2>
        <p className="mb-2">{task.description}</p>
        <p className="mb-2">Due Date: {task.dueDate}</p>
        <p className="mb-2">Priority: {task.priority}</p>
        <p className="mb-2">Location: {task.location}</p>
        <button className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700">
          Edit Task
        </button>
        <button className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-700">
          Delete Task
        </button>
      </div>
    </ClientLayout>
  );
};

export default TaskDetailPage;
