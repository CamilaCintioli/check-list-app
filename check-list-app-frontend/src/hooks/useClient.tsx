import axios, { AxiosInstance } from "axios";
import { createContext, ReactNode, useContext, useMemo } from "react";

interface Client {
  getTasks(): Promise<TaskDto[]>
}

export interface TaskDto {
  id: number
  name: string
}

class HttpClient implements Client {
  private http: AxiosInstance;

  constructor(baseURL: string) {
    this.http = axios.create({ baseURL })
  }

  getTasks(): Promise<TaskDto[]> {
    return this.http.get("/tasks").then(({ data }) => (data))
  }
}

const ClientContext = createContext<Client>({
  getTasks: () => Promise.reject()
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
