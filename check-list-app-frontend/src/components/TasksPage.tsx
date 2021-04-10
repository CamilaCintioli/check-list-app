import { useCallback, useState } from 'react';
import AriaModal from 'react-aria-modal';

import TaskForm from './TaskForm';
import useTasks from '../hooks/useTasks';
import TaskItem from './TaskItem';
import { TaskDto } from '../hooks/useClient';


export default function TasksPage(): JSX.Element {
  const [tasks, { create }] = useTasks()

  const [isOpenCreationModal, setIsOpenCreationModal] = useState(false);

  const closeCreationModal = useCallback(() => {
    setIsOpenCreationModal(false)
  }, [])

  const openCreationModal = useCallback(() => {
    setIsOpenCreationModal(true)
  }, [])

  const addTask = useCallback((task: TaskDto) => {
    return create(task).then(() => { closeCreationModal() })
  }, [create, closeCreationModal])

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
      <button onClick={openCreationModal}> Add task</button>

      {isOpenCreationModal && (
        <AriaModal
          onExit={closeCreationModal}
          titleText="Add task"
          verticallyCenter={true}
          underlayClickExits={true}
        >
          <h6>Add task</h6>
          <TaskForm onSubmit={addTask} />
          <button onClick={closeCreationModal}>Cerrar</button>
        </AriaModal>)}
    </div>
  );
}
