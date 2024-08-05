

'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, updateTask } from '../redux/tasksSlice';
import { toast } from 'react-toastify';
import { Task } from '../types';

interface TaskFormProps {
  existingTask?: Task;
}

const TaskForm: React.FC<TaskFormProps> = ({ existingTask }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(existingTask?.title || '');
  const [description, setDescription] = useState(existingTask?.description || '');
  const [dueDate, setDueDate] = useState(existingTask?.dueDate || '');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>(existingTask?.priority || 'medium');
  const [location, setLocation] = useState(existingTask?.location || '');
  const [completed, setCompleted] = useState(existingTask?.completed || false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const task: Task = {
      id: existingTask?.id || Date.now().toString(),
      title,
      description,
      dueDate,
      priority,
      location,
      completed,
    };

    try {
      const response = await fetch(`/api/tasks`, {
        method: existingTask ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });

      const data = await response.json();
      if (response.ok) {
        if (existingTask) {
          dispatch(updateTask(data));
          toast.success('Task updated successfully!');
        } else {
          dispatch(addTask(data));
          toast.success('Task added successfully!');
        }

        if (!existingTask) {
          setTitle('');
          setDescription('');
          setDueDate('');
          setPriority('medium');
          setLocation('');
          setCompleted(false);
        }
      } else {
        toast.error(data.message || 'Failed to save the task.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to save the task.');
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
        {existingTask ? 'Edit Task' : 'Add New Task'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
            rows={4}
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Due Date</label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Priority</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as 'high' | 'medium' | 'low')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
            required
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
            required
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="completed"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-900"
          />
          <label htmlFor="completed" className="text-sm font-medium text-gray-700 dark:text-gray-300">Completed</label>
        </div>
        <div className="flex justify-center mt-6">
          <button type="submit" className="py-2 px-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600">
            {existingTask ? 'Update Task' : 'Add Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
