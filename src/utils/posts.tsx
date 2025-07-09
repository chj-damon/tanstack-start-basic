import { notFound } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { logMiddleware } from '@/middlewares/loggingMiddleware'

export type PostType = {
  id: string
  title: string
  body: string
}

export const fetchPost = createServerFn()
  .validator((d: string) => d)
  .handler(async ({ data }) => {
    console.info(`Fetching post with id ${data}...`)
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${data}`)
    if (!res.ok) {
      if (res.status === 404) {
        throw notFound()
      }

      throw new Error('Failed to fetch post')
    }

    const post = (await res.json()) as PostType

    return post
  })

export const fetchPosts = createServerFn()
  .middleware([logMiddleware])
  .handler(async () => {
    console.info('Fetching posts...')
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts')
      const posts = (await res.json()) as Array<PostType>

      return posts.slice(0, 10)
    } catch (error) {
      throw new Error('Failed to fetch posts')
    }
  })
