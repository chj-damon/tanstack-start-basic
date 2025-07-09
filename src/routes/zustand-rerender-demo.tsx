import { createFileRoute } from '@tanstack/react-router'
import { immer } from 'zustand/middleware/immer'
import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'
import { Button } from '@mantine/core'

export const Route = createFileRoute('/zustand-rerender-demo')({
  component: RouteComponent,
})

const initialState = {
  name: 'John',
  age: 20,
  friends: [
    {
      name: 'Jane',
      age: 20,
    },
  ],
  hobby: {
    sing: '坤式唱腔',
    dance: '坤式舞步',
    rap: '坤式rap',
    basketball: '坤式篮球',
  },
}

interface Action {
  updateName: (nextName: string) => void
  setHobbyRap: (rap: string) => void
  setHobbyBasketball: (basketball: string) => void
  updateFriends: (nextFriends: any[]) => void
}

const useUserStore = create<typeof initialState & Action>()(
  immer((set) => ({
    ...initialState,
    updateName: (nextName: string) => {
      set((state) => {
        state.name = nextName
      })
    },
    setHobbyRap: (rap: string) =>
      set((state) => {
        state.hobby.rap = rap
      }),
    setHobbyBasketball: (basketball: string) =>
      set((state) => {
        state.hobby.basketball = basketball
      }),
    updateFriends: (nextFriends: any[]) => {
      set((state) => {
        state.friends = nextFriends
      })
    },
  }))
)

function RouteComponent() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', padding: '1rem' }}>
      <ComponentA />
      <ComponentB />
    </div>
  )
}

function ComponentA() {
  console.log('A组件渲染')
  const { name, age, hobby, setHobbyRap, setHobbyBasketball } = useUserStore()

  return (
    <div style={{ flex: 1, border: '1px solid blue' }}>
      <h1>A组件</h1>
      <div>
        <h3>{name}</h3>
        <div>
          年龄：<span>{age}</span>
        </div>
        <div>
          爱好1：<span>{hobby.sing}</span>
        </div>
        <div>
          爱好2：<span>{hobby.dance}</span>
        </div>
        <div>
          爱好3：<span>{hobby.rap}</span>
        </div>
        <div>
          爱好4：<span>{hobby.basketball}</span>
        </div>
        <Button onClick={() => setHobbyRap('只因你太美')}>改变爱好rap</Button>
        <Button onClick={() => setHobbyBasketball('篮球')}>改变爱好basketball</Button>
      </div>
    </div>
  )
}

// 使用useShallow之后，在A组件里修改hobby.basketball，B组件不会重新渲染，因为useShallow会忽略hobby.basketball的修改
function ComponentB() {
  console.log('B组件渲染')
  const { rap, name } = useUserStore(
    useShallow((state) => ({
      rap: state.hobby.rap,
      name: state.name,
    }))
  )
  return (
    <div style={{ flex: 1, border: '1px solid red' }}>
      <h1>B组件</h1>
      <div>
        <div>
          姓名：<span>{name}</span>
        </div>
        <div>
          rap：<span>{rap}</span>
        </div>
      </div>
    </div>
  )
}
