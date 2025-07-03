import { Link, Outlet, createFileRoute } from '@tanstack/react-router'
import { usersQueryOptions } from "@/utils/users";
import { useSuspenseQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/(user)/users')({
  // 使用queryClient之前
  // loader: async () => {
  //   const res = await fetch('/api/users')

  //   if (!res.ok) {
  //     throw new Error('Unexpected status code')
  //   }

  //   const data = (await res.json()) as Array<User>

  //   return data
  // },

  // 使用queryClient之后
  loader: async ({ context }) => {
    // 这里的主要目的是预取（prefetch）数据，以便在组件渲染时，React Query 已经有了数据，可以避免额外的 loading 状态。
    await context.queryClient.ensureQueryData(usersQueryOptions());
  },
  component: UsersComponent,
})

function UsersComponent() {
  // 因为主要是使用queryClient获取数据，所以不必使用useLoaderData
  // const users = Route.useLoaderData();
  
  const users = useSuspenseQuery(usersQueryOptions());
  const userList = users.data;

  return (
    <div className="p-2 flex gap-2">
      <ul className="list-disc pl-4">
        {[
          ...userList,
          { id: 'i-do-not-exist', name: 'Non-existent User', email: '' },
        ].map((user) => {
          return (
            <li key={user.id} className="whitespace-nowrap">
              <Link
                to="/users/$userId"
                params={{
                  userId: String(user.id),
                }}
                className="block py-1 text-blue-800 hover:text-blue-600"
                activeProps={{ className: 'text-black font-bold' }}
              >
                <div>{user.name}</div>
              </Link>
            </li>
          )
        })}
      </ul>
      <hr />
      <Outlet />
    </div>
  )
}
