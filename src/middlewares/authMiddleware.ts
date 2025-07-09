import { createMiddleware } from '@tanstack/react-start'
import { useAuthStore } from '@/stores/useAuthStore'

export const authMiddleware = createMiddleware({ type: 'function' }).client(async (ctx) => {
  // 检查是否已登录
  const { token } = useAuthStore.getState()
  if (!token) {
    // 如果未登录，重定向到登录页面
    window.location.href = '/login'
  }

  return ctx.next()
})
