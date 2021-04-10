import React from 'react';
import { TaskDto } from '../hooks/useClient';


interface Props {
  task: TaskDto
}

export default function TaskItem({ task }: Props): JSX.Element {
  return (
    <label>
      <input type="checkbox"/>
      {task.name}
    </label>
  );
}
