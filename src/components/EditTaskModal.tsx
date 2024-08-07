'use client';

import React, { useState, FormEvent } from 'react';
import GoogleMapComponent from './GoogleMapComponent'; 
import Modal from './Modal';
interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  location: string;
  completed: boolean;
}

interface EditTaskModalProps {
  task: Task;
  onClose: () => void;
  onSave: (task: Task) => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ task, onClose, onSave }) => {
  const [formData, setFormData] = useState<Task>(task);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const getFormattedAddress = async (lat: number, lng: number) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    );
    const data = await response.json();
    if (data.results && data.results[0]) {
      return data.results[0].formatted_address;
    }
    return `${lat}, ${lng}`;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-70">
      <div className="bg-gray-900 p-6 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4">Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 text-gray-200"
              required
              aria-label="Task Title"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 text-gray-200"
              required
              aria-label="Task Description"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-300 mb-1">Due Date</label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 text-gray-200"
              required
              aria-label="Due Date"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="priority" className="block text-sm font-medium text-gray-300 mb-1">Priority</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 text-gray-200"
              required
              aria-label="Priority"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-1">Location</label>
            <div className="flex items-center">
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="flex-1 bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 text-gray-200"
                required
                aria-label="Location"
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
          <div className="mb-4">
            <label htmlFor="completed" className="block text-sm font-medium text-gray-300 mb-1">Completed</label>
            <input
              type="checkbox"
              id="completed"
              name="completed"
              checked={formData.completed}
              onChange={(e) => setFormData({ ...formData, completed: e.target.checked })}
              className="mt-1 block accent-yellow-500"
              aria-label="Completed"
            />
          </div>
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 bg-gray-600 text-gray-200 rounded-md hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-yellow-500 text-gray-900 rounded-md hover:bg-yellow-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
            >
              Save
            </button>
          </div>
        </form>
        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <GoogleMapComponent
              onSelectLocation={async (lat, lng) => {
                const address = await getFormattedAddress(lat, lng);
                setFormData({ ...formData, location: address });
                setIsModalOpen(false);
              }}
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default EditTaskModal;
