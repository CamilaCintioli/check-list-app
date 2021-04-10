import { useEffect, useState } from "react";
import useClient, { TaskDto } from "./useClient";

export default function useTasks(): [TaskDto[], { loading: boolean }] {
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

    return [
        tasks,
        {
            loading
        }
    ]
}
