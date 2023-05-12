import { useRouter } from 'next/router';
import { auth } from '@/firebase/config.js';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const AuthContext = createContext<any>({});
export const useAuth = () => useContext(AuthContext);

/* Setting children types for context provider */
interface AuthContextProviderProps {
  children: ReactNode
}

export const AuthContextProvider = ({ children}: AuthContextProviderProps) => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  console.log(user)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setUser(false); 
        return;
      }

      setUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      });

      router.push('/game');
      setLoading(false);
    })

    return () => unsubscribe()
  }, [])

  const signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = async () => {
    setUser(null)
    await signOut(auth)
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {loading ? null : children}
    </AuthContext.Provider>
  )
}