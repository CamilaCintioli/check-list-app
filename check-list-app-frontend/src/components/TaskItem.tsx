import { useCallback, useState } from 'react';
import AriaModal from 'react-aria-modal';
import { TaskDto } from '../hooks/useClient';
import useTask from '../hooks/useTask';
import TaskForm from './TaskForm';


interface Props {
  task: TaskDto
}

export default function TaskItem({ task: initialTask }: Props): JSX.Element {
  const [task, { update, remove }] = useTask(initialTask?.id, initialTask);

  const [isOpenEditionModal, setIsOpenEditionModal] = useState(false);

  const handleChange = useCallback(({ target: { checked } }) => {
    return update({ isCompleted: (checked as boolean) });
  }, [update]);

  const removeTask = useCallback(() => {
    return remove();
  }, [remove])

  const closeEditionModal = useCallback(() => {
    setIsOpenEditionModal(false)
  }, [])

  const openEditionModal = useCallback(() => {
    setIsOpenEditionModal(true)
  }, [])

  const editTask = useCallback((task: TaskDto) => {
    return update(task).then(() => { closeEditionModal() })
  }, [update, closeEditionModal])

  return (
    <>
      <label>
        <input type="checkbox" defaultChecked={task?.isCompleted} onChange={handleChange} />
        {task?.name}
      </label>
      <button onClick={removeTask}>Delete task</button>
      <button onClick={openEditionModal}>Edit task</button>

      {isOpenEditionModal && (
        <AriaModal
          onExit={closeEditionModal}
          titleText="Edit task"
          verticallyCenter={true}
          underlayClickExits={true}
        >
          <>
          <h6>Edit task</h6>
          {task && <TaskForm task={task} onSubmit={editTask} />}
          <button onClick={closeEditionModal}>Cerrar</button>
          </>
        </AriaModal>)}

    </>
  );
}
