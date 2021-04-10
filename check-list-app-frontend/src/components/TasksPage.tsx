import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import TaskForm from './TaskForm';
import Modal from './Modal';
import useTasks from '../hooks/useTasks';
import TaskItem from './TaskItem';
import { TaskDto } from '../hooks/useClient';
import Button from './Button';
import Icon from './Icon';


const Title = styled.h3`

`
const Ul = styled.ul`
  list-style: none;
`
const Li = styled.li`

`
const Main = styled.main`
  display: flex;
  flex-direction: column;
  max-width: 1280px;
  margin: auto;
`


export default function TasksPage(): JSX.Element {
  const [tasks, { create, remove }] = useTasks()

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
    <Main>
      <Title>To do list</Title>
      <Ul>
        {tasks.map((task) => (
          <Li key={task.id}>
            <TaskItem task={task} onRemove={remove} />
          </Li>
        ))}
      </Ul>
      <Button onClick={openCreationModal}>
        <Icon 
          src='/svg/add_task_white_24dp.svg'
          title='Add task'
          alt='Add task'/>
        <span>Add task</span>
        </Button>

      {isOpenCreationModal && (
        <Modal
          onExit={closeCreationModal}
          titleText="Add task"
          verticallyCenter={true}
          underlayClickExits={true}
        >
          <h3>Add task</h3>
          <TaskForm onSubmit={addTask} />
          <Button onClick={closeCreationModal}>Cerrar</Button>
        </Modal>)}
    </Main>
  );
}
