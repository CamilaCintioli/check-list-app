import React from 'react';
import { Formik, Form, Field } from 'formik';
import { TaskDto } from '../hooks/useClient';


interface Props {
  task?: TaskDto
  onSubmit: (task: TaskDto) => Promise<unknown>
}

export default function TaskForm({ task, onSubmit }: Props): JSX.Element {
  return (
    <Formik initialValues={task ?? { id: 0, name: "", isCompleted: false }} onSubmit={onSubmit}>
      <Form>
        <Field name='name' type="text" />
        <button type="submit">Aceptar</button>
      </Form>
    </Formik>
  );
}
