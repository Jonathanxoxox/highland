import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import localforage from 'localforage'

// Configure localforage for IndexedDB
localforage.config({
  driver: localforage.INDEXEDDB,
  name: 'bonsai-highland-games',
  version: 1.0,
  storeName: 'highland_games_store',
  description: 'Highland Games app data storage'
})

export interface Clan {
  id: string
  name: string
  password: string
  color: string
}

export interface Game {
  slug: string
  title: string
  description: string
  startTime: string
  endTime: string
  hasTimer: boolean
  hasTextInput: boolean
  hasPhotoUpload: boolean
  clanId?: string
}

export interface GameResult {
  gameSlug: string
  clanId: string
  textInput?: string
  photos?: string[]
  timestamp: number
  timerValue?: number
}

interface GameStore {
  // Current user state
  selectedClan: Clan | null
  isAuthenticated: boolean
  
  // Game data
  clans: Clan[]
  games: Game[]
  gameResults: GameResult[]
  
  // Actions
  selectClan: (clan: Clan) => void
  login: (clanId: string, password: string) => boolean
  logout: () => void
  addGameResult: (result: GameResult) => void
  updateGameResult: (gameSlug: string, updates: Partial<GameResult>) => void
  
  // Initialization
  initializeData: () => void
}

const defaultClans: Clan[] = [
  { id: 'macleod', name: 'MacLeod', password: 'highland1', color: 'bg-red-500' },
  { id: 'campbell', name: 'Campbell', password: 'highland2', color: 'bg-blue-500' },
  { id: 'fraser', name: 'Fraser', password: 'highland3', color: 'bg-green-500' },
  { id: 'sinclair', name: 'Sinclair', password: 'highland4', color: 'bg-purple-500' },
  { id: 'mackenzie', name: 'MacKenzie', password: 'highland5', color: 'bg-orange-500' },
  { id: 'gordon', name: 'Gordon', password: 'highland6', color: 'bg-yellow-500' },
]

const defaultGames: Game[] = [
  {
    slug: 'caber-toss',
    title: 'Caber Toss',
    description: 'Werfen des Baumstamms',
    startTime: '09:00',
    endTime: '10:30',
    hasTimer: false,
    hasTextInput: true,
    hasPhotoUpload: true
  },
  {
    slug: 'hammer-throw',
    title: 'Hammer Throw',
    description: 'Hammerwurf',
    startTime: '10:45',
    endTime: '12:15',
    hasTimer: false,
    hasTextInput: true,
    hasPhotoUpload: true
  },
  {
    slug: 'stone-put',
    title: 'Stone Put',
    description: 'Steinstoßen',
    startTime: '13:00',
    endTime: '14:30',
    hasTimer: false,
    hasTextInput: true,
    hasPhotoUpload: true
  },
  {
    slug: 'weight-throw',
    title: 'Weight Throw',
    description: 'Gewichtswurf',
    startTime: '14:45',
    endTime: '16:15',
    hasTimer: false,
    hasTextInput: true,
    hasPhotoUpload: true
  },
  {
    slug: 'hill-race',
    title: 'Hill Race',
    description: 'Berglauf',
    startTime: '16:30',
    endTime: '17:30',
    hasTimer: true,
    hasTextInput: false,
    hasPhotoUpload: true
  },
  {
    slug: 'tug-of-war',
    title: 'Tug of War',
    description: 'Tauziehen',
    startTime: '17:45',
    endTime: '18:30',
    hasTimer: false,
    hasTextInput: true,
    hasPhotoUpload: true
  }
]

// Custom storage implementation for localforage
const storage = {
  getItem: async (name: string): Promise<string | null> => {
    const value = await localforage.getItem<string>(name)
    return value || null
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await localforage.setItem(name, value)
  },
  removeItem: async (name: string): Promise<void> => {
    await localforage.removeItem(name)
  },
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      // Initial state
      selectedClan: null,
      isAuthenticated: false,
      clans: [],
      games: [],
      gameResults: [],

      // Actions
      selectClan: (clan: Clan) => {
        set({ selectedClan: clan })
      },

      login: (clanId: string, password: string) => {
        const clan = get().clans.find(c => c.id === clanId && c.password === password)
        if (clan) {
          set({ 
            selectedClan: clan, 
            isAuthenticated: true 
          })
          return true
        }
        return false
      },

      logout: () => {
        set({ 
          selectedClan: null, 
          isAuthenticated: false 
        })
      },

      addGameResult: (result: GameResult) => {
        set(state => ({
          gameResults: [...state.gameResults, result]
        }))
      },

      updateGameResult: (gameSlug: string, updates: Partial<GameResult>) => {
        set(state => ({
          gameResults: state.gameResults.map(result =>
            result.gameSlug === gameSlug && result.clanId === state.selectedClan?.id
              ? { ...result, ...updates }
              : result
          )
        }))
      },

      initializeData: () => {
        const state = get()
        if (state.clans.length === 0) {
          set({ 
            clans: defaultClans,
            games: defaultGames 
          })
        }
      }
    }),
    {
      name: 'highland-games-storage',
      storage,
      partialize: (state) => ({
        clans: state.clans,
        games: state.games,
        gameResults: state.gameResults,
        selectedClan: state.selectedClan,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
