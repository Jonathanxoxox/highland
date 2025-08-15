import { createFileRoute, Link } from '@tanstack/react-router'
import { useGameStore } from '../lib/store'
import { Button } from '../components/ui/button'
import { ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/clan')({
  component: ClanSelection,
})

function ClanSelection() {
  const { clans, selectClan } = useGameStore()

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <Link to="/">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-emerald-800">
            Wähle deinen Clan
          </h1>
          <p className="text-emerald-600">
            Schließe dich einem der 6 traditionellen schottischen Clans an
          </p>
        </div>
      </div>

      {/* Clan Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {clans.map((clan) => (
          <Link
            key={clan.id}
            to="/login"
            onClick={() => selectClan(clan)}
          >
            <div className={`
              ${clan.color} 
              p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 
              transform hover:scale-105 border-2 border-white/20
              min-h-[120px] flex flex-col justify-center items-center
              text-white relative overflow-hidden
            `}>
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
              </div>
              
              {/* Clan Content */}
              <div className="relative z-10 text-center">
                <h2 className="text-2xl font-bold mb-2">
                  Clan {clan.name}
                </h2>
                <p className="text-white/90 text-sm">
                  Tippe um beizutreten
                </p>
              </div>
              
              {/* Highland Pattern */}
              <div className="absolute top-2 right-2 text-2xl opacity-50">
                ⚔️
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Info */}
      <div className="mt-8 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
        <p className="text-sm text-emerald-700 text-center">
          💡 <strong>Tipp:</strong> Jeder Clan hat ein eigenes Passwort für den Login. 
          Frage deinen Clan-Anführer nach den Zugangsdaten.
        </p>
      </div>
    </div>
  )
}
