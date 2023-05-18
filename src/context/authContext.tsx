import { useRouter } from 'next/router';
import { auth } from '@/firebase/config';

import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onIdTokenChanged } from 'firebase/auth';

const AuthContext = createContext<any>({});
export const useAuth = () => useContext(AuthContext);

/* Setting children types for context provider */
interface ContextProviderProps {
  children: ReactNode
}

export const AuthContextProvider = ({ children}: ContextProviderProps) => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) =>  {
      if (user) {
        await user.getIdToken();
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        });

        /*const checkIfUserDataExists = async () => {
            try {
                const response = await fetch('/api/userCreation', { 
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ id: user.uid }) 
                });

                await response.json();
            } catch (error) {
                console.log('Error cehcking for player')
            }
        }
        checkIfUserDataExists();*/

        router.push('/game')
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, []);

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