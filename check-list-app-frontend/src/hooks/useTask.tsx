import { useCallback } from 'react';
import useClient, { TaskDto } from "./useClient";

interface TaskActions {
  update: (task: Partial<TaskDto>) => Promise<TaskDto>
}

export default function useTask(id: number): [TaskDto | null, TaskActions] {
  const client = useClient();

  const update = useCallback((task: Partial<TaskDto>) => {
    return client.updateTask({ ...task, id: (task.id ?? id) })
  }, [id, client])

  return [null, { update }];

}