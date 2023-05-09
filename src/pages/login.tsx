import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useAuth } from '../context/authContext'

const Login = () => {
  const router = useRouter()
  const { user, login } = useAuth()
  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const handleLogin = async (e: any) => {
    e.preventDefault()

    console.log(user)
    try {
      await login(data.email, data.password)
      router.push('/game')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div
      style={{
        width: '40%',
        margin: 'auto',
      }}
    >
      <h1 className="text-center my-3 ">Login</h1>
      <form onSubmit={handleLogin}>
        <div id="formBasicEmail">
          <label>Email address</label>
          <input
            onChange={(e: any) =>
              setData({
                ...data,
                email: e.target.value,
              })
            }
            value={data.email}
            required
            type="email"
            placeholder="Enter email"
          />
        </div>

        <div className="mb-3" id="formBasicPassword">
          <label>Password</label>
          <input
            onChange={(e: any) =>
              setData({
                ...data,
                password: e.target.value,
              })
            }
            value={data.password}
            required
            type="password"
            placeholder="Password"
          />
        </div>
        <button type="submit">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login