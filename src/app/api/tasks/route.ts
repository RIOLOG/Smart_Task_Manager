import { NextRequest, NextResponse } from 'next/server';

let tasks: any[] = [];

export async function GET() {
  return NextResponse.json({ tasks });
}

export async function POST(request: NextRequest) {
  const { title, description, dueDate, priority, location, completed } = await request.json();
  const newTask = { id: Date.now().toString(), title, description, dueDate, priority, location, completed };
  tasks.push(newTask);
  return NextResponse.json(newTask);
}

export async function PUT(request: NextRequest) {
  const { id, title, description, dueDate, priority, location, completed } = await request.json();
  const taskIndex = tasks.findIndex(task => task.id === id);

  if (taskIndex !== -1) {
    tasks[taskIndex] = { id, title, description, dueDate, priority, location, completed };
    return NextResponse.json(tasks[taskIndex]);
  } else {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  }
}

export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  
  if (id) {
    tasks = tasks.filter(task => task.id !== id);
    return NextResponse.json({ message: 'Task deleted' });
  } else {
    return NextResponse.json({ error: 'Task ID is missing' }, { status: 400 });
  }
}
