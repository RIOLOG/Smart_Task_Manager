'use client';

import React from 'react';
import TaskForm from '../../components/TaskForm';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import ClientLayout from '../ClientLayout';

const AddEditTaskPage: React.FC = () => {
  const { id } = useParams();
  const task = useSelector((state: RootState) => 
    state.tasks.tasks.find((task) => task.id === id)
  );

  return (
    <ClientLayout>
      <TaskForm existingTask={task} />
    </ClientLayout>
  );
};

export default AddEditTaskPage;
