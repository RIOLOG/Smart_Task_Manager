
'use client';

import React from 'react';
import TaskList from '../../components/TaskList/TaskList';
import ClientLayout from '../ClientLayout';

const TaskListPage: React.FC = () => {
  return (
    <ClientLayout>
      <TaskList />
    </ClientLayout>
  );
};

export default TaskListPage;
