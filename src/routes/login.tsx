import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { useGameStore } from '../lib/store'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { ArrowLeft, LogIn, AlertCircle } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/login')({
  component: Login,
})

function Login() {
  const { selectedClan, login } = useGameStore()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Redirect if no clan selected
  if (!selectedClan) {
    return (
      <div className="max-w-md mx-auto text-center space-y-6">
        <div className="text-red-600">
          <AlertCircle className="h-12 w-12 mx-auto mb-4" />
          <h2 className="text-xl font-semibold">Kein Clan ausgewählt</h2>
          <p className="text-sm mt-2">Bitte wähle zuerst einen Clan aus.</p>
        </div>
        <Link to="/clan">
          <Button className="w-full">
            Clan auswählen
          </Button>
        </Link>
      </div>
    )
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 800))

    const success = login(selectedClan.id, password)
    
    if (success) {
      router.navigate({ to: '/schedule' })
    } else {
      setError('Falsches Passwort. Versuche es erneut.')
    }
    
    setIsLoading(false)
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <Link to="/clan">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-emerald-800">
            Clan Login
          </h1>
        </div>
      </div>

      {/* Clan Info */}
      <div className={`
        ${selectedClan.color}
        p-6 rounded-xl text-white text-center shadow-lg
      `}>
        <h2 className="text-2xl font-bold mb-2">
          Clan {selectedClan.name}
        </h2>
        <p className="text-white/90">
          Gib das Clan-Passwort ein um fortzufahren
        </p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="password">Passwort</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Clan-Passwort eingeben"
            className="h-12 text-lg"
            required
          />
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm flex items-center">
              <AlertCircle className="h-4 w-4 mr-2" />
              {error}
            </p>
          </div>
        )}

        <Button 
          type="submit" 
          className="w-full h-12 text-lg font-semibold bg-emerald-600 hover:bg-emerald-700"
          disabled={isLoading || !password.trim()}
        >
          {isLoading ? (
            <>
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-3" />
              Anmelden...
            </>
          ) : (
            <>
              <LogIn className="mr-3 h-5 w-5" />
              Anmelden
            </>
          )}
        </Button>
      </form>

      {/* Help */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-700 text-center">
          💡 <strong>Demo-Hinweis:</strong> Die Passwörter sind highland1, highland2, 
          highland3, highland4, highland5, highland6 (entsprechend der Clan-Reihenfolge).
        </p>
      </div>
    </div>
  )
}
