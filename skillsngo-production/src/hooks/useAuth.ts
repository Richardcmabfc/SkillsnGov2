import { useState, useEffect, createContext, useContext } from 'react'
import { User as SupabaseUser, Session } from '@supabase/supabase-js'
import { supabase, getCurrentUser, signIn, signOut, getProfile } from '../lib/supabase'
import { User } from '../types'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  clearError: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) throw error
        
        setSession(session)
        
        if (session?.user) {
          const profile = await getProfile(session.user.id)
          setUser(profile)
        }
      } catch (err) {
        console.error('Error getting session:', err)
        setError(err instanceof Error ? err.message : 'Une erreur est survenue')
      } finally {
        setLoading(false)
      }
    }

    getSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session)
        setSession(session)
        
        if (session?.user) {
          try {
            const profile = await getProfile(session.user.id)
            setUser(profile)
          } catch (err) {
            console.error('Error getting profile:', err)
            setError(err instanceof Error ? err.message : 'Erreur lors du chargement du profil')
          }
        } else {
          setUser(null)
        }
        
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      setError(null)
      await signIn(email, password)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de connexion')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      setLoading(true)
      setError(null)
      await signOut()
      setUser(null)
      setSession(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de déconnexion')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const clearError = () => {
    setError(null)
  }

  return {
    user,
    session,
    loading,
    error,
    login,
    logout,
    clearError
  }
}

export { AuthContext }