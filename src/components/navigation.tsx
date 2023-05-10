import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/authContext'

const Navbar = () => {
  const { user, logout } = useAuth()
  const router = useRouter()

  return (
    <div>
      <div>

            {user ? (
              <div>
                <span
                  onClick={() => {
                    logout()
                    router.push('/login')
                  }}
                >
                  Logout
                </span>
              </div>
            ) : (
              <>
                <Link href="/signup" passHref>
                  <span>Signup</span>
                </Link>
                <Link href="/login" passHref>
                  <span>Login</span>
                </Link>
              </>
            )}

      </div>
    </div>
  )
}

export default Navbar