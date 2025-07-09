import { Button, useComputedColorScheme, useMantineColorScheme } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'
import { create } from 'zustand'

export const Route = createFileRoute('/')({
  component: Home,
})

const initialState = {
  count: 0,
}

type Action = {
  increment: () => void
  decrement: () => void
}

const homeStore = create<typeof initialState & Action>((set) => ({
  ...initialState,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}))

function Home() {
  const count = homeStore((state) => state.count)
  const increment = homeStore((state) => state.increment)

  const { setColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  })
  const computedColorScheme = useComputedColorScheme()

  return (
    <div className="p-2 m-2">
      <h3>Welcome Home!!!</h3>
      <p>Count: {count}</p>
      <Button onClick={() => increment()}>increment</Button>
      <hr />
      <Button onClick={() => setColorScheme('light')}>Light ColorScheme</Button>
      <Button onClick={() => setColorScheme('dark')}>Dark ColorScheme</Button>
      <Button onClick={() => setColorScheme('auto')}>Auto ColorScheme</Button>
      <Button
        onClick={() => {
          setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark')
        }}
      >
        Toggle ColorScheme
      </Button>
    </div>
  )
}
