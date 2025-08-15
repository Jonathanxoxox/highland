import { createFileRoute, Link, useParams } from '@tanstack/react-router'
import { useGameStore } from '../lib/store'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Textarea } from '../components/ui/textarea'
import { ArrowLeft, Play, Pause, RotateCcw, Camera, Save, CheckCircle } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

export const Route = createFileRoute('/game/$slug')({
  component: GamePage,
})

function GamePage() {
  const { slug } = useParams({ from: '/game/$slug' })
  const { selectedClan, games, gameResults, addGameResult, updateGameResult, isAuthenticated } = useGameStore()
  
  // Timer state
  const [timerValue, setTimerValue] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const timerRef = useRef<NodeJS.Timeout>()
  
  // Form state
  const [textInput, setTextInput] = useState('')
  const [photos, setPhotos] = useState<string[]>([])
  const [isSaved, setIsSaved] = useState(false)
  
  // Find game
  const game = games.find(g => g.slug === slug)
  
  // Find existing result
  const existingResult = gameResults.find(
    r => r.gameSlug === slug && r.clanId === selectedClan?.id
  )

  // Redirect if not authenticated
  if (!isAuthenticated || !selectedClan) {
    return (
      <div className="max-w-md mx-auto text-center space-y-6">
        <div className="text-red-600">
          <h2 className="text-xl font-semibold">Nicht angemeldet</h2>
          <p className="text-sm mt-2">Bitte melde dich erst bei deinem Clan an.</p>
        </div>
        <Link to="/">
          <Button className="w-full">Zum Start</Button>
        </Link>
      </div>
    )
  }

  // Game not found
  if (!game) {
    return (
      <div className="max-w-md mx-auto text-center space-y-6">
        <div className="text-red-600">
          <h2 className="text-xl font-semibold">Spiel nicht gefunden</h2>
          <p className="text-sm mt-2">Das angeforderte Spiel existiert nicht.</p>
        </div>
        <Link to="/schedule">
          <Button className="w-full">Zum Zeitplan</Button>
        </Link>
      </div>
    )
  }

  // Load existing data
  useEffect(() => {
    if (existingResult) {
      setTextInput(existingResult.textInput || '')
      setPhotos(existingResult.photos || [])
      setTimerValue(existingResult.timerValue || 0)
    }
  }, [existingResult])

  // Timer logic
  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setTimerValue(prev => prev + 1)
      }, 1000)
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isTimerRunning])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning)
  }

  const resetTimer = () => {
    setIsTimerRunning(false)
    setTimerValue(0)
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader()
        reader.onload = (event) => {
          const result = event.target?.result as string
          setPhotos(prev => [...prev, result])
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index))
  }

  const saveResult = () => {
    const result = {
      gameSlug: slug,
      clanId: selectedClan.id,
      textInput: textInput || undefined,
      photos: photos.length > 0 ? photos : undefined,
      timerValue: game.hasTimer ? timerValue : undefined,
      timestamp: Date.now()
    }

    if (existingResult) {
      updateGameResult(slug, result)
    } else {
      addGameResult(result)
    }

    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2000)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <Link to="/schedule">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-emerald-800">
            {game.title}
          </h1>
          <p className="text-emerald-600">
            Clan {selectedClan.name} • {game.startTime} - {game.endTime}
          </p>
        </div>
      </div>

      {/* Game Info */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-emerald-100">
        <h3 className="text-lg font-semibold text-emerald-800 mb-2">
          Spiel-Information
        </h3>
        <p className="text-gray-600 mb-4">
          {game.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {game.hasTimer && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              ⏱️ Timer verfügbar
            </span>
          )}
          {game.hasTextInput && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              📝 Text-Eingabe
            </span>
          )}
          {game.hasPhotoUpload && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              📸 Foto-Upload
            </span>
          )}
        </div>
      </div>

      {/* Timer Section */}
      {game.hasTimer && (
        <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">
            ⏱️ Timer
          </h3>
          <div className="text-center space-y-4">
            <div className="text-6xl font-mono font-bold text-blue-600">
              {formatTime(timerValue)}
            </div>
            <div className="flex justify-center space-x-4">
              <Button
                onClick={toggleTimer}
                className={`${isTimerRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
              >
                {isTimerRunning ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Stopp
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Start
                  </>
                )}
              </Button>
              <Button
                onClick={resetTimer}
                variant="outline"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Text Input Section */}
      {game.hasTextInput && (
        <div className="bg-white p-6 rounded-xl shadow-md border border-green-100">
          <h3 className="text-lg font-semibold text-green-800 mb-4">
            📝 Ergebnis eingeben
          </h3>
          <div className="space-y-2">
            <Label htmlFor="gameInput">
              Notizen, Ergebnis oder Beobachtungen
            </Label>
            <Textarea
              id="gameInput"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="z.B. Weite: 15,5m, Besonderheiten: perfekter Wurf"
              className="min-h-[100px]"
            />
          </div>
        </div>
      )}

      {/* Photo Upload Section */}
      {game.hasPhotoUpload && (
        <div className="bg-white p-6 rounded-xl shadow-md border border-purple-100">
          <h3 className="text-lg font-semibold text-purple-800 mb-4">
            📸 Fotos hochladen
          </h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="photoUpload" className="cursor-pointer">
                <div className="border-2 border-dashed border-purple-200 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                  <Camera className="h-8 w-8 mx-auto mb-2 text-purple-400" />
                  <p className="text-purple-600">Fotos auswählen</p>
                  <p className="text-sm text-gray-500">Tippe hier oder wähle Dateien</p>
                </div>
              </Label>
              <Input
                id="photoUpload"
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </div>

            {/* Photo Preview */}
            {photos.length > 0 && (
              <div className="grid grid-cols-2 gap-3">
                {photos.map((photo, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={photo}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      onClick={() => removePhoto(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Save Button */}
      <div className="sticky bottom-6">
        <Button
          onClick={saveResult}
          className={`w-full h-12 text-lg font-semibold transition-all duration-200 ${
            isSaved 
              ? 'bg-green-500 hover:bg-green-600' 
              : 'bg-emerald-600 hover:bg-emerald-700'
          }`}
        >
          {isSaved ? (
            <>
              <CheckCircle className="mr-3 h-5 w-5" />
              Gespeichert!
            </>
          ) : (
            <>
              <Save className="mr-3 h-5 w-5" />
              Ergebnis speichern
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
