import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { TaskDto } from '../hooks/useClient';
import useTask from '../hooks/useTask';
import Button from './Button';
import Checkbox from './Checkbox';
import Modal from './Modal';
import Icon from './Icon';
import TaskForm from './TaskForm';

const Article = styled.article`
display: flex;
align-items: center;
`

const Label = styled.label`
  display: contents;
`;

const TaskName = styled.span`
  margin-inline-start: 1em;
  margin-inline-end: auto;
`

const ButtonGroup = styled.div`
 
`
interface Props {
  task: TaskDto
  onRemove: (task: TaskDto) => unknown
}

export default function TaskItem({ task: initialTask, onRemove }: Props): JSX.Element {
  const [task, { update, remove }] = useTask(initialTask?.id, initialTask);

  const [isOpenEditionModal, setIsOpenEditionModal] = useState(false);

  const handleChange = useCallback(({ target: { checked } }) => {
    return update({ isCompleted: (checked as boolean) });
  }, [update]);

  const removeTask = useCallback(() => {
    onRemove(initialTask);
    return remove();
  }, [onRemove, initialTask, remove])

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
      <Article>
        <Label>
          <Checkbox type="checkbox" defaultChecked={task?.isCompleted} onChange={handleChange} />
          <TaskName>
            {task?.name}
          </TaskName>
        </Label>
        <ButtonGroup>
          <Button onClick={removeTask}>
            <Icon
              src='/svg/delete_white_24dp.svg'
              title='Remove task'
              alt='Remove task' />
            <span> Delete task </span>
          </Button>
          <Button onClick={openEditionModal}>

            <Icon
              src='/svg/edit_white_24dp.svg'
              title='Edit task'
              alt='Edit task' />
            <span> Edit task </span></Button>
        </ButtonGroup>
      </Article>
      {isOpenEditionModal && (
        <Modal
          onExit={closeEditionModal}
          titleText="Edit task"
          verticallyCenter={true}
          underlayClickExits={true}
        >
          <>
              <h3>Edit task</h3>
              {task && <TaskForm task={task} onSubmit={editTask} />}
              <Button onClick={closeEditionModal}>Cerrar</Button>
          </>
        </Modal>)}

    </>
  );
}
