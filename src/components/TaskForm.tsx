'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, updateTask } from '../redux/tasksSlice';
import { toast } from 'react-toastify';
import { Task } from '../types';
import GoogleMapComponent from './GoogleMapComponent';
import Modal from './Modal';

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
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const getFormattedAddress = async (lat: number, lng: number) => {
    console.log("1", lat, lng)
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    );
    const data = await response.json();
    if (data.results && data.results[0]) {
      return data.results[0].formatted_address;
    }
    console.log("2", data);
    return `${lat}, ${lng}`;
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
          <div className="flex items-center">
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
              required
            />
            <button
              onClick={() => setIsModalOpen(true)}
              type="button"
              className="ml-4 px-4 py-2 text-white bg-green-500 hover:bg-green-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Open Map
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="checkbox"
            id="completed"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label htmlFor="completed" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Completed</label>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {existingTask ? 'Update Task' : 'Add Task'}
        </button>
      </form>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <GoogleMapComponent
            onSelectLocation={async (lat, lng) => {
              const address = await getFormattedAddress(lat, lng);
              setLocation(address);
              setIsModalOpen(false);
            }}
          />
        </Modal>
      )}
    </div>
  );
};

export default TaskForm;
