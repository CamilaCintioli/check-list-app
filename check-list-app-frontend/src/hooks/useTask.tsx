import { useCallback, useEffect, useState } from 'react';
import useClient, { TaskDto } from "./useClient";

interface TaskActions {
  update: (task: Partial<TaskDto>) => Promise<TaskDto>,
  remove: () => Promise<number>
}

export default function useTask(id: number, initialTask?: TaskDto): [TaskDto | null, TaskActions] {
  const client = useClient();

  const [task, setTask] = useState<TaskDto | null>(initialTask ?? null)

  useEffect(() => {
    if (!initialTask) client.getTask(id).then(setTask);
  }, [client, id])

  const update = useCallback((task: Partial<TaskDto>) => {
    return client.updateTask({ ...task, id: (task.id ?? id) }).then(t => { setTask(t); return t })
  }, [id, client])

  const remove = useCallback(() => {
    return client.removeTask(id)
  }, [id, client])

  return [task, { update, remove }];
}