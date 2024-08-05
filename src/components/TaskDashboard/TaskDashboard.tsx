
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import BarChart from './BarChart';

const TaskDashboard: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.length - completedTasks;
  const highPriorityTasks = tasks.filter(task => task.priority === 'high').length;
  const mediumPriorityTasks = tasks.filter(task => task.priority === 'medium').length;
  const lowPriorityTasks = tasks.filter(task => task.priority === 'low').length;

  const chartData = [
    { label: 'High Priority', value: highPriorityTasks },
    { label: 'Medium Priority', value: mediumPriorityTasks },
    { label: 'Low Priority', value: lowPriorityTasks },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Task Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Task Statistics</h3>
          <ul className="list-disc ml-6 space-y-2 text-gray-600">
            <li className="flex items-center"><span className="font-medium text-gray-800">Total Tasks:</span> {tasks.length}</li>
            <li className="flex items-center"><span className="font-medium text-gray-800">Completed Tasks:</span> {completedTasks}</li>
            <li className="flex items-center"><span className="font-medium text-gray-800">Pending Tasks:</span> {pendingTasks}</li>
          </ul>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Task Priority Distribution</h3>
          <BarChart data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default TaskDashboard;
