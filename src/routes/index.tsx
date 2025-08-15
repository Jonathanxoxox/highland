import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '../components/ui/button'
import { Play } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Logo/Header */}
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-emerald-800 mb-2">
            🏴󠁧󠁢󠁳󠁣󠁴󠁿
          </h1>
          <h1 className="text-4xl font-bold text-emerald-800 leading-tight">
            Bonsai Highland Games
          </h1>
          <p className="text-lg text-emerald-600">
            Willkommen zu den traditionellen Highland Games
          </p>
        </div>

        {/* Start Button */}
        <div className="pt-8">
          <Link to="/clan">
            <Button 
              size="lg" 
              className="w-full h-16 text-xl font-semibold bg-emerald-600 hover:bg-emerald-700 shadow-lg"
            >
              <Play className="mr-3 h-6 w-6" />
              Los geht's
            </Button>
          </Link>
        </div>

        {/* Description */}
        <div className="pt-4 text-sm text-emerald-700">
          <p>
            Wähle deinen Clan und nimm an den traditionellen schottischen 
            Highland Games teil. Messe dich in verschiedenen Disziplinen 
            und beweise deine Stärke!
          </p>
        </div>
      </div>
    </div>
  )
}
