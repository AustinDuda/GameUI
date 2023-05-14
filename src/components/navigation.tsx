import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/authContext'
import styled from 'styled-components';

const NavWrapper = styled.div`
  left: 0;
  z-index: 99;
  width: 100vw;
  position: fixed;
  text-align: right;
  background: #1a2035;
  padding: 0.8rem 2.4rem;
  box-shadow: 0.4rem 0.4rem 0.8rem rgba(0, 0, 0, 0.15);
`;

const NavLink = styled(Link)`
  cursor: pointer;
  padding: 0 1.2rem;

  &:hover {
    color: white;
  }
`;

const Navbar = () => {
  const { user, logout } = useAuth()
  const router = useRouter()

  return (
    <NavWrapper>
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
              <NavLink href="/signup" passHref>
                <span>Signup</span>
              </NavLink>
              <NavLink href="/login" passHref>
                <span>Login</span>
              </NavLink>
            </>
          )}
      </div>
    </NavWrapper>
  )
}

export default Navbar