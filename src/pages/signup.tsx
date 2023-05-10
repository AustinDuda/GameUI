import React, { useState } from 'react'
import { useAuth } from '../context/authContext';
import styled from 'styled-components';

const LoginWrapper = styled.div`
  width: 100vw;
  display: flex;
  height: 100vh;
  position: relative;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center bottom;
  background-image: url('./images/login-bg.png');

  &:before {
    content: '';
    opacity: 0.55;
    width: 100vw;
    height: 100vh;
    position: absolute;
    background: #1a2035;
  }
`;

const Form = styled.form`
  display: flex;
  padding: 3.2rem;
  position: relative;
  align-items: center;
  border-radius: 0.6rem;
  background: #1a2035;
  flex-direction: column;
  box-shadow: 0.6rem 0.6rem 1.2rem rgba(0, 0, 0, 0.1);

  input {
    border: none;
    min-width: 24rem;
    background: none;
    padding: 0.4rem 0;
    margin-bottom: 2rem;
    border-bottom: 0.1rem solid #8b92a9;

    &:-webkit-autofill {
      -webkit-text-fill-color: white !important;
      -webkit-box-shadow: 0 0 0 1000px #1a2035 inset !important;
    }
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const ActiveButton = styled.button`
    color: white;
    border-radius: 0.4rem;
    padding: 0.4rem 1.2rem;
    font-family: RobotoBold;
    background: linear-gradient(60deg, #288c6c, #4ea752);
`;

const Signup = () => {
  const { user, signup } = useAuth()
  console.log(user)
  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const handleSignup = async (e: any) => {
    e.preventDefault()

    try {
      await signup(data.email, data.password)
    } catch (err) {
      console.log(err)
    }

    console.log(data)
  }

  return (
    <LoginWrapper>
      
      <Form onSubmit={handleSignup}>
        <h1>Signup</h1>
        <FormGroup>
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
          />
        </FormGroup>

        <FormGroup>
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
          />
        </FormGroup>
        <ActiveButton type="submit">
          Login
        </ActiveButton>
      </Form>
    </LoginWrapper>
  )
}

export default Signup