import React, { useState } from 'react';
import './LoginStyles/login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../context/UserAuthContext';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const { signUp } = useUserAuth();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const registerUser = async (e) => {
    e.preventDefault();
    console.log(password.split(''));

    if (password !== confirmPass) {
      setErrorMsg('*Passwords do not match!');
      return;
    }

    if (password.split('').length < 6) {
      setErrorMsg('*Passwords must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      await signUp(email, password);
      setIsLoading(false);
      navigate('/chatroom');
    } catch (err) {
      setIsLoading(false);
      setErrorMsg('The username or password you entered is invalid');
    }
  };

  return (
    <>
      <div className='register'>
        <div className='head-text'>Create Your New Account</div>
        <span className='err-message'>{errorMsg}</span>
        <form onSubmit={registerUser}>
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
          <input
            type='password'
            value={confirmPass}
            onChange={(e) => {
              setConfirmPass(e.target.value);
              setErrorMsg('');
            }}
            placeholder='Confirm password...'
          />
          <button type='submit' disabled={!email || !password || !confirmPass}>
            Register
          </button>
        </form>
        <div className='switch-prompt'>
          Already have an account? <Link to='/'>Sign In</Link>
        </div>
      </div>
    </>
  );
};

export default Register;
