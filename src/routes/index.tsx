import { Button } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'
import { create } from 'zustand'

export const Route = createFileRoute('/')({
  component: Home,
})

const homeStore = create<{
  count: number;
  increment: () => void;
  decrement: () => void;
}>(set => ({
  count: 0,
  increment: () => set(state => ({ count: state.count + 1 })),
  decrement: () => set(state => ({ count: state.count - 1 })),
}))

function Home() {
  const count = homeStore(state => state.count);
  const increment = homeStore(state => state.increment);

  return (
    <div className="p-2 m-2">
      <h3>Welcome Home!!!</h3>
      <p>Count: {count}</p>
      <Button onClick={() => increment()}>increment</Button>
    </div>
  )
}
