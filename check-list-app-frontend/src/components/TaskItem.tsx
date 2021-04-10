import React, { useCallback } from 'react';
import { TaskDto } from '../hooks/useClient';
import useTask from '../hooks/useTask';


interface Props {
  task: TaskDto
}

export default function TaskItem({ task }: Props): JSX.Element {
  const [,{ update, remove }] = useTask(task.id);

  const handleChange = useCallback(({target: {checked}}) => {
    update({ isCompleted: (checked as boolean) });
  },[update]);

   const removeTask = useCallback(() => {
     remove();
   }, [remove])

  return (
    <>
      <label>
        <input type="checkbox" defaultChecked={task.isCompleted} onChange={handleChange}/>
        {task.name}
      </label>
      <button onClick={removeTask}>Delete task</button>
    </>
  );
}
