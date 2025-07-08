import { queryOptions } from "@tanstack/react-query"
import api from '@/utils/api';

export type User = {
  id: number
  name: string
  email: string
}

export const usersQueryOptions = () => queryOptions({
  queryKey: ['users'],
  queryFn: () => api.get<Array<User>>('/api/users').then(res => res.data).catch(() => {
    throw new Error('Unexpected status code')
  })
})

export const userQueryOptions = (userId: string) => queryOptions({
  queryKey: ['users', userId],
  queryFn: () => api.get<User>(`/api/users/${userId}`).then(res => res.data).catch(() => {
    throw new Error('Unexpected status code')
  })
});