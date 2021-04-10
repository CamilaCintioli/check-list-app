import React from 'react';
import { Formik, Form, Field } from 'formik';
import { TaskDto } from '../hooks/useClient';
import Button from './Button';


interface Props {
  task?: TaskDto
  onSubmit: (task: TaskDto) => Promise<unknown>
}

export default function TaskForm({ task, onSubmit }: Props): JSX.Element {
  return (
    <Formik initialValues={task ?? { id: 0, name: "", isCompleted: false }} onSubmit={onSubmit}>
      <Form>
        <Field name='name' type="text" />
        <Button type="submit">Aceptar</Button>
      </Form>
    </Formik>
  );
}
