import React, { useState, useEffect } from 'react';
import Input from '../components/Input';
import ButtonWithProgress from './components/ButtonWithProgress';
import { useApiProgress } from '../mutual/ApiProgress';
import { useDispatch } from 'react-redux';


const LoginPage1 = props => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    setError(undefined);
  }, [username, password]);

  const onClickLogin = async event => {
    event.preventDefault();
    const creds = {
      username,
      password
    };

    const { history } = props;
    const { push } = history;

    setError(undefined);
    try {
      
      push('/');
    } catch (apiError) {
      setError(apiError.response.data.message);
    }
  };

 

  const pendingApiCall = useApiProgress('post', '/api/1.0/auth');

  const buttonEnabled = username && password;

  return (
    <div className="container">
      <form>
        <h1 className="text-center">Login</h1>
        <Input label='Username' onChange={event => setUsername(event.target.value)} />
        <Input label='Password' type="password" onChange={event => setPassword(event.target.value)} />
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="text-center">
          <ButtonWithProgress onClick={onClickLogin} disabled={!buttonEnabled || pendingApiCall} pendingApiCall={pendingApiCall} text='Login' />
        </div>
      </form>
    </div>
  );
};

export default LoginPage1;