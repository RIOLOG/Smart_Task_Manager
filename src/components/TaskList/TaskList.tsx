

'use client';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { deleteTask, setTasks, updateTask } from '../../redux/tasksSlice';
import EditTaskModal from '../EditTaskModal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchTasks, deleteTask as apiDeleteTask, updateTask as apiUpdateTask } from '../../lib/api'; 
import { Task } from '../../types/index';

const TaskList: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch: AppDispatch = useDispatch();
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        const data = await fetchTasks();
        dispatch(setTasks(data.tasks));
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
        toast.error('Failed to load tasks.');
      }
    };
    fetchAllTasks();
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    try {
      await apiDeleteTask(id);
      dispatch(deleteTask(id));
      toast.success('Task deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete task.');
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
  };

  const closeEditModal = () => {
    setEditingTask(null);
  };

  const handleSave = async (updatedTask: Task) => {
    try {
      await apiUpdateTask(updatedTask.id, updatedTask);
      dispatch(updateTask(updatedTask));
      toast.success('Task updated successfully!');
      closeEditModal();
    } catch (error) {
      toast.error('Failed to update task.');
    }
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task.id} className="p-5 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex justify-between items-center">
          <div className="flex-1 text-gray-200">
            <h3 className="text-xl font-semibold mb-2">{task.title}</h3>
            <p className="mb-1">{task.description}</p>
            <p className="mb-1">Due: {task.dueDate}</p>
            <p className="mb-1">Priority: 
              <span className={`font-medium ${task.priority === 'high' ? 'text-red-400' : task.priority === 'medium' ? 'text-yellow-400' : 'text-green-400'}`}>
                {task.priority}
              </span>
            </p>
            <p className="mb-1">Location: {task.location}</p>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => handleEdit(task)} 
              className="py-2 px-4 bg-yellow-600 text-gray-200 rounded-md hover:bg-yellow-500 transition-colors duration-300"
            >
              Edit
            </button>
            <button 
              onClick={() => handleDelete(task.id)} 
              className="py-2 px-4 bg-red-600 text-gray-200 rounded-md hover:bg-red-500 transition-colors duration-300"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      {editingTask && (
        <EditTaskModal 
          task={editingTask} 
          onClose={closeEditModal} 
          onSave={handleSave} 
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default TaskList;
