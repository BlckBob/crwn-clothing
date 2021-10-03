import { useState } from 'react';

import CustomButton from '../custom-button/custom-button.comp';
import FormInput from '../form-input/form-input.comp';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

const SignIn = () => {
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setState({ email: '', password: '' });

    const { email, password } = state;
    try {
      await auth.signInWithEmailAndPassword(email, password);
      setState({ email: '', password: '' });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (evt) => {
    const { value, name } = evt.target;
    setState({
      ...state,
      [name]: value,
    });
    /* const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    }); */
  };

  return (
    <div className='sign-in'>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          type='email'
          name='email'
          value={state.email}
          handleChange={handleChange}
          label='email'
          required
        />
        <FormInput
          type='password'
          name='password'
          value={state.password}
          handleChange={handleChange}
          label='password'
          required
        />
        <div className='buttons'>
          <CustomButton type='submit'> Sign in </CustomButton>
          <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
            {' '}
            Sign in with Google{' '}
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
