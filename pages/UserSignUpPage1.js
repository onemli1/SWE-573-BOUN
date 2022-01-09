import React, { useState } from 'react';
import Input from '../components/Input';

import ButtonWithProgress from '../components/ButtonWithProgress';
import { useApiProgress } from '../shared/ApiProgress';
import { useDispatch } from 'react-redux';
import { signupHandler } from '../redux/authActions';

const UserSignupPage1 = (props) => {
  const [form, setForm] = useState({
    username: null,
    firstname: null,
    lastname: null,
    password: null,
    passwordRepeat: null,
  });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const onChange = (event) => {
    const { name, value } = event.target;

    setErrors((previousErrors) => ({ ...previousErrors, [name]: undefined }));
    setForm((previousForm) => ({ ...previousForm, [name]: value }));
  };

  const onClickSignup = async (event) => {
    event.preventDefault();

    const { history } = props;
    const { push } = history;

    const { username, firstname, lastname, password } = form;

    const body = {
      username,
      firstname,
      lastname,
      password,
      passwordRepeat
    };

    try {
      
      push('/');
    } catch (error) {
      if (error.response.data.validationErrors) {
        setErrors(error.response.data.validationErrors);
      }
    }
  };


   
  const pendingApiCallSignup = useApiProgress('post', '/api/1.0/users');
  const pendingApiCallLogin = useApiProgress('post', '/api/1.0/auth');

  const pendingApiCall = pendingApiCallSignup || pendingApiCallLogin;

  let passwordRepeatError;
  if (form.password !== form.passwordRepeat) {
    passwordRepeatError = ('Password mismatch');
  }

  return (
    <div className="container">
      <form>
        <h1 className="text-center">{('Sign Up')}</h1>
        <Input name="username" label='Username' error={usernameError} onChange={onChange} />
        <Input name="firstname" label='First Name' error={firstnameNameError} onChange={onChange} />
        <Input name="lastname" label='Last Name' error={lastnameNameError} onChange={onChange} />
        <Input name="password" label='Password' error={passwordError} onChange={onChange} type="password" />
        <Input name="passwordRepeat" label='Password Repeat' error={passwordRepeatError} onChange={onChange} type="password" />
        <div className="text-center">
          <ButtonWithProgress
            onClick={onClickSignup}
            disabled={pendingApiCall || passwordRepeatError !== undefined}
            pendingApiCall={pendingApiCall}
            text={('Sign Up')}
          />
        </div>
      </form>
    </div>
  );
};

export default UserSignupPage1;