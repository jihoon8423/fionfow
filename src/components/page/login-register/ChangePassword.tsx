import React, { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../store/AuthContext';


const ChangePassword = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const exPasswordInputRef = useRef<HTMLInputElement>(null);
  const newPasswordInputRef = useRef<HTMLInputElement>(null);
  const newPasswordAgainInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    const enteredExPassword = exPasswordInputRef.current!.value;
    const enteredNewPassword = newPasswordInputRef.current!.value;
    const enteredNewPasswordAgain = newPasswordAgainInputRef.current!.value;

    if (enteredNewPassword !== enteredNewPasswordAgain) {
      setError('Passwords do not match. Please try again.');
      return;
    }

    console.log('change pw start!');
    try {
      await authCtx.changePassword(enteredExPassword, enteredNewPassword);
      if (authCtx.isSuccess) {
        alert('Password changed successfully. Please log in again.');
        authCtx.logout();
        navigate('/', { replace: true });
      }
    } catch (error) {
      setError('Failed to change password. Please try again later.');
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="ex-password">Old Password</label>
        <input type="password" id="ex-password" minLength={8} ref={exPasswordInputRef} />
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" minLength={8} ref={newPasswordInputRef} />
        <label htmlFor="new-password-again">New Password Again</label>
        <input type="password" id="new-password-again" minLength={8} ref={newPasswordAgainInputRef} />
      </div>
      <div>
        <button type="submit">Change Password</button>
        {error && <p>{error}</p>}
      </div>
    </form>
  );
};

export { ChangePassword };
