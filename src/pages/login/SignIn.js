import React, { useState } from 'react';
import './LoginStyles/login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../context/UserAuthContext';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, googleSignIn } = useUserAuth();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function signInUser(e) {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      await login(email, password);
      setIsLoading(false);
      navigate('/chatroom');
    } catch (err) {
      setIsLoading(false);
      setErrorMsg('The username or password you entered is invalid');
    }
  }

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();

    try {
      await googleSignIn();
      navigate('/chatroom');
    } catch (err) {
      setErrorMsg('An error has occured with google sign in');
    }
  };

  return (
    <>
      <div className='sign-in'>
        <div className='head-text'>Sign In</div>
        <span className='err-message'>{errorMsg}</span>
        <form onSubmit={signInUser}>
          <input
            type='text'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrorMsg('');
            }}
            placeholder='Enter email...'
          />
          <input
            type='password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrorMsg('');
            }}
            placeholder='Enter password...'
          />
          <button type='submit' disabled={!email || !password}>
            Sign In
          </button>
        </form>
        <button className='google-btn' onClick={handleGoogleSignIn}>
          Sign In with Google
        </button>
        <div className='switch-prompt'>
          Don't have an account?
          <Link to='/register'>Register Now</Link>
        </div>
      </div>
    </>
  );
};

export default SignIn;
