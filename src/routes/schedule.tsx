import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import { useGameStore } from '../lib/store'
import { Button } from '../components/ui/button'
import { ArrowLeft, Clock, MapPin, Users, LogOut } from 'lucide-react'

export const Route = createFileRoute('/schedule')({
  beforeLoad: ({ context }) => {
    // This will be handled by the component for now
  },
  component: Schedule,
})

function Schedule() {
  const { selectedClan, games, isAuthenticated, logout } = useGameStore()

  // Redirect if not authenticated
  if (!isAuthenticated || !selectedClan) {
    return (
      <div className="max-w-md mx-auto text-center space-y-6">
        <div className="text-red-600">
          <h2 className="text-xl font-semibold">Nicht angemeldet</h2>
          <p className="text-sm mt-2">Bitte melde dich erst bei deinem Clan an.</p>
        </div>
        <Link to="/">
          <Button className="w-full">
            Zum Start
          </Button>
        </Link>
      </div>
    )
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Link to="/clan">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-emerald-800">
              Zeitplan
            </h1>
            <p className="text-emerald-600">
              Clan {selectedClan.name}
            </p>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleLogout}
          className="text-red-600 border-red-200 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Abmelden
        </Button>
      </div>

      {/* Clan Banner */}
      <div className={`
        ${selectedClan.color}
        p-4 rounded-xl text-white shadow-lg mb-6
      `}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">
              Clan {selectedClan.name}
            </h2>
            <p className="text-white/90 text-sm">
              Bereit für die Highland Games!
            </p>
          </div>
          <div className="text-3xl">
            ⚔️
          </div>
        </div>
      </div>

      {/* Games Schedule */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-emerald-800 mb-4">
          Heutige Spiele
        </h3>
        
        {games.map((game) => (
          <Link
            key={game.slug}
            to="/game/$slug"
            params={{ slug: game.slug }}
          >
            <div className="
              bg-white p-6 rounded-xl shadow-md hover:shadow-lg 
              transition-all duration-200 transform hover:scale-[1.02]
              border border-emerald-100 hover:border-emerald-300
            ">
              <div className="flex justify-between items-start mb-3">
                <h4 className="text-lg font-semibold text-emerald-800">
                  {game.title}
                </h4>
                <div className="flex items-center text-sm text-emerald-600">
                  <Clock className="h-4 w-4 mr-1" />
                  {game.startTime} - {game.endTime}
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">
                {game.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {game.hasTimer && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    ⏱️ Timer
                  </span>
                )}
                {game.hasTextInput && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    📝 Eingabe
                  </span>
                )}
                {game.hasPhotoUpload && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    📸 Fotos
                  </span>
                )}
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Tippe um teilzunehmen
                </span>
                <div className="h-6 w-6 border-2 border-emerald-400 rounded-full flex items-center justify-center">
                  <div className="h-2 w-2 bg-emerald-400 rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Info */}
      <div className="mt-8 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
        <p className="text-sm text-emerald-700 text-center">
          🏆 <strong>Highland Games Info:</strong> Tippe auf ein Spiel um teilzunehmen. 
          Du kannst Ergebnisse eingeben, Fotos hochladen und Timer verwenden.
        </p>
      </div>
    </div>
  )
}
