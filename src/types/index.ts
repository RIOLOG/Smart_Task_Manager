// export interface Task {
//     id: string;
//     title: string;
//     description: string;
//     dueDate: string;
//     priority: 'high' | 'medium' | 'low';
//     location: string;
//   }
  



// types.ts

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string; // Ensure this property is included
  priority: 'high' | 'medium' | 'low';
  location: string; // Ensure this property is included
  completed: boolean;
}
