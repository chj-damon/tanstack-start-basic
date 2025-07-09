import { userQueryOptions } from '@/utils/users'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { NotFound } from 'src/components/NotFound'
import { UserErrorComponent } from 'src/components/UserError'

export const Route = createFileRoute('/(user)/users/$userId')({
  // loader: async ({ params: { userId } }) => {
  //   try {
  //     const res = await fetch('/api/users/' + userId)
  //     if (!res.ok) {
  //       throw new Error('Unexpected status code')
  //     }

  //     const data = await res.json()

  //     return data
  //   } catch {
  //     throw new Error('Failed to fetch user')
  //   }
  // },
  loader: async ({ params: { userId }, context }) => {
    await context.queryClient.ensureQueryData(userQueryOptions(userId))
  },
  errorComponent: UserErrorComponent,
  component: UserComponent,
  notFoundComponent: () => {
    return <NotFound>User not found</NotFound>
  },
})

function UserComponent() {
  // const user = Route.useLoaderData()

  const params = Route.useParams()
  const user = useSuspenseQuery(userQueryOptions(params.userId))
  const userData = user.data

  return (
    <div className="space-y-2">
      <h4 className="text-xl font-bold underline">{userData.name}</h4>
      <div className="text-sm">{userData.email}</div>
      <div>
        <a
          href={`/api/users/${userData.id}`}
          className="text-blue-800 hover:text-blue-600 underline"
        >
          View as JSON
        </a>
      </div>
    </div>
  )
}
