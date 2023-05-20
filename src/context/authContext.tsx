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
    const refreshUserCreds = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => refreshUserCreds()
  }, [])

  const signup =  (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
      const user = userCredential.user;

      try {
          const response = await fetch('/api/userCreation', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: user.uid }) 
          });

          await response.json();
          router.push('/login');
      } catch (error) {
          console.log('Error checking for player')
      }
    })
    .catch((error) => {
      console.error("Error signing up:", error);
    });
  }

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
      const user = userCredential.user;

      try {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        });

        router.push('/game');
      } catch (error) {
        console.log('Error while trying to login: ', error);
      }
    })
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