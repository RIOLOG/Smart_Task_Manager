
// import TaskForm from '../components/TaskForm';

// const HomePage = () => {
//   return (
//     <div>
//       <h1>Welcome to Smart Task Manager</h1>
//       <TaskForm />
//     </div>
//   );
// };

// export default HomePage;



import TaskForm from '../components/TaskForm';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="flex items-center justify-center text-3xl font-bold">Welcome to Smart Task Manager</h1>
        </div>
      </header>
      <main className="py-8">
        <div className="container mx-auto px-4">
          <TaskForm />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
