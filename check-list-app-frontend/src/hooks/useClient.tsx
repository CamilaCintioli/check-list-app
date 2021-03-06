import axios, { AxiosInstance } from "axios";
import { createContext, ReactNode, useContext, useMemo, useReducer } from "react";

interface Client {
  getTask(id: number): Promise<TaskDto>
  getTasks(): Promise<TaskDto[]>
  updateTask(task: Partial<TaskDto>): Promise<TaskDto>,
  removeTask(id: number): Promise<number>,
  createTask(task: TaskDto): Promise<TaskDto>
}

export interface TaskDto {
  id: number
  name: string
  isCompleted: boolean
}

class HttpClient implements Client {
  private http: AxiosInstance;

  constructor(baseURL: string) {
    this.http = axios.create({ baseURL })
  }

  getTasks(): Promise<TaskDto[]> {
    return this.http.get("/tasks").then(({ data }) => (data))
  }

  getTask(id: number): Promise<TaskDto> {
    return this.http.get(`/tasks/${id}`).then(({ data }) => (data))
  }

  updateTask(task: TaskDto): Promise<TaskDto> {
    return this.http.patch(`/tasks/${task.id}`, task).then(({ data }) => (data))
  }

  removeTask(id: number): Promise<number> {
    return this.http.delete(`/tasks/${id}`).then(({ data }) => (data))
  }
  
  createTask(task: TaskDto): Promise<TaskDto> {
    return this.http.post('/tasks', task).then(({ data }) => (data))
  }
}

const ClientContext = createContext<Client>({
  getTask: () => Promise.reject(),
  getTasks: () => Promise.reject(),
  updateTask: () => Promise.reject(),
  removeTask: () => Promise.reject(),
  createTask: () => Promise.reject()
});

interface ClientProviderProps {
  url: string
  children: ReactNode
}

export function ClientProvider({ url, children }: ClientProviderProps): JSX.Element {
  const client = useMemo(() => new HttpClient(url), [url]);

  return (
    <ClientContext.Provider value={client}>{children}</ClientContext.Provider>
  )
}

export default function useClient() {
  return useContext(ClientContext)
}
