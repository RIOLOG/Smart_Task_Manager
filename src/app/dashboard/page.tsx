'use client';

import React from 'react';
import TaskDashboard from '../../components/TaskDashboard/TaskDashboard';
import ClientLayout from '../ClientLayout';

const DashboardPage: React.FC = () => {
  return (
    <ClientLayout>
      <TaskDashboard />
    </ClientLayout>
  );
};

export default DashboardPage;
