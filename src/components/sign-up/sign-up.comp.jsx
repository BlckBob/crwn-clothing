import { useState } from 'react';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import CustomButton from '../custom-button/custom-button.comp';
import FormInput from '../form-input/form-input.comp';

// import { signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-up.styles.scss';

const SignUp = () => {
  const [state, setState] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setState({ displayName: '', email: '', password: '', confirmPassword: '' });
    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await createUserProfileDocument(user, { displayName });

      setState({ displayName: '', email: '', password: '', confirmPassword: '' });
    } catch (err) {
      console.error(err);
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

  const { displayName, email, password, confirmPassword } = state;
  return (
    <div className='sign-up'>
      <h2 className='title'>I do not have an account</h2>
      <span>Sign up with your email and password</span>

      <form className='sign-up-form' onSubmit={handleSubmit}>
        <FormInput
          type='text'
          name='displayName'
          value={displayName}
          handleChange={handleChange}
          label='Display Name'
          required
        />
        <FormInput
          type='email'
          name='email'
          value={email}
          handleChange={handleChange}
          label='Email'
          required
        />
        <FormInput
          type='password'
          name='password'
          value={password}
          handleChange={handleChange}
          label='Password'
          required
        />
        <FormInput
          type='password'
          name='confirmPassword'
          value={confirmPassword}
          handleChange={handleChange}
          label='Confirm Password'
          required
        />
        <CustomButton type='submit'>SIGN UP</CustomButton>
      </form>
    </div>
  );
};

export default SignUp;
