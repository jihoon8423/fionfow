import React, { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../store/AuthContext';


// await 추가

const ChangeUsername = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const nicknameInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    const enteredNickname = nicknameInputRef.current!.value;
    console.log('change nickname start!');
    try {
      await authCtx.changeNickname(enteredNickname);
      if (authCtx.isSuccess) {
        alert('변경 되었습니다.');
        await authCtx.getUser();
        navigate('/', { replace: true });
      }
    } catch (error) {
      // Handle error state or display error message
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="username">New Nickname</label>
        <input type="text" id="username" minLength={3} required ref={nicknameInputRef} />
      </div>
      <div>
        <button type="submit">Change Username</button>
      </div>
    </form>
  );
};

export { ChangeUsername };
