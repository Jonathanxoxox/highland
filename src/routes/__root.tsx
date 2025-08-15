import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanstackDevtools } from '@tanstack/react-devtools'
import { useGameStore } from '../lib/store'
import { useEffect } from 'react'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const initializeData = useGameStore((state) => state.initializeData)
  
  useEffect(() => {
    initializeData()
  }, [initializeData])

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
        <main className="container mx-auto px-4 py-6">
          <Outlet />
        </main>
      </div>
      <TanstackDevtools
        config={{
          position: 'bottom-left',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </>
  )
}
