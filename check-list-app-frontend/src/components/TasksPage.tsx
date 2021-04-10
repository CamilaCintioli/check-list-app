import React from 'react';
import useTasks from '../hooks/useTasks';
import TaskItem from './TaskItem';


export default function TasksPage(): JSX.Element {
  const [tasks] = useTasks()
  return (
    <div>
      <h1>To do list</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <TaskItem task={task} />
          </li>
        ))}
      </ul>
    </div>
  );
}
