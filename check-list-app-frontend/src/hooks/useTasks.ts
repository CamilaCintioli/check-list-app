import { useCallback, useEffect, useState } from "react";
import useClient, { TaskDto } from "./useClient";

interface TasksOperations { loading: boolean; create(task: TaskDto): Promise<TaskDto>; remove(task: TaskDto): void }

export default function useTasks(): [TaskDto[], TasksOperations] {
    const client = useClient()

    const [tasks, setTasks] = useState<TaskDto[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        client
            .getTasks()
            .then((ts) => { setTasks(ts) })
            .finally(() => {
                setLoading(false)
            })
    }, [client])

    const create = useCallback((task: TaskDto) => {
        return client.createTask(task).then(t => {
            setTasks(prevTasks => prevTasks.concat(t))
            return t
        })
      }, [client])
    
      const remove = useCallback((task: TaskDto) => {
          setTasks(prevTasks => prevTasks.filter(({ id }) => id !== task.id))
      }, [])

    return [
        tasks,
        {
            loading,
            create,
            remove,
        }
    ]
}
