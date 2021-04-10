import React, { useCallback, useState } from 'react';
import AriaModal from 'react-aria-modal';
import { TaskDto } from '../hooks/useClient';
import useTask from '../hooks/useTask';
import TaskForm from './TaskForm';


interface Props {
  task: TaskDto
}

export default function TaskItem({ task }: Props): JSX.Element {
  const [, { update, remove }] = useTask(task.id);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = useCallback(({ target: { checked } }) => {
    return update({ isCompleted: (checked as boolean) });
  }, [update]);

  const removeTask = useCallback(() => {
    return remove();
  }, [remove])

  const closeTaskModal = useCallback(() => {
    setIsOpen(false)
  }, [])

  const openTaskModal = useCallback(() => {
    setIsOpen(true)
  }, [])

  const editTask = useCallback((task: TaskDto) => {
    return update(task).then(() => { closeTaskModal() })
  }, [update, closeTaskModal])

  return (
    <>
      <label>
        <input type="checkbox" defaultChecked={task.isCompleted} onChange={handleChange} />
        {task.name}
      </label>
      <button onClick={removeTask}>Delete task</button>
      <button onClick={openTaskModal}>Edit task</button>
      <button onClick={console.log}> Add task</button>

      <>
        {isOpen ?
          <AriaModal
            titleText="Edit task"
            verticallyCenter={true}
            underlayClickExits={true}
          >
            <h6>Edit task</h6>
            <TaskForm task={task} onSubmit={editTask} />
            <button onClick={closeTaskModal}>Cerrar</button>
          </AriaModal>
          : false}
      </>
    </>
  );
}
