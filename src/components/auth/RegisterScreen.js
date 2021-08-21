import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import validator from 'validator';

export const RegisterScreen = () => {

  const [formValues, handleInputChange, reset] = useForm({
    name: 'Luis',
    email: 'Luis@gmail',
    password: '123',
    password2: '123'
  });

  const {name, email, password, password2} = formValues;

  const handleRegister = (e) => {
    e.preventDefault();

    if( isFormValid() ){
      console.log('correcto');
    }

  };

  const isFormValid = () => {

    if(name.trim().length === 0){
      console.log('name is required');
      return false;
    } else if (!validator.isEmail( email )) {
      console.log('email is not email');
      return false
    } else if (password !== password2 || password.length < 5) {
      console.log('Jummm, wron password');
      return false
    }

    return true;
  };

  return (
    <>
      <h3 className="auth__title">Register</h3>
        <form onSubmit = {handleRegister}>

          <div className="auth__aler-error">
            Hi
          </div>

          <input
            className="auth__input"
            type="text"
            placeholder="Name"
            autoComplete="off" 
            name="name"
            value = {name}
            onChange = { handleInputChange }
          />
          <input
            className="auth__input"
            type="text"
            placeholder="Email"
            name="email"
            value= {email}
            onChange = { handleInputChange }
          />
          <input
            className="auth__input"
            type="password"
            placeholder="Password"
            name="password"
            value= {password}
            onChange = { handleInputChange }
          />
          <input
            className="auth__input"
            type="password"
            placeholder="Confirm password"
            name="password2"
            value={password2}
            onChange = { handleInputChange }
          />
          <button
            className="btn btn-primary btn-block mb-5"
            type="submit"
          >
            Registered
          </button>

          <Link
            to="/auth/login"
            className="link"
          >
            Already registered?
          </Link>
        </form>
    </>
  )
}
