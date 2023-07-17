import React, { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../store/AuthContext';


const AuthForm = () => {
const emailInputRef = useRef<HTMLInputElement>(null);
const passwordInputRef = useRef<HTMLInputElement>(null);
const navigate = useNavigate();
const [isLoading, setIsLoading] = useState(false);
const authCtx = useContext(AuthContext);

const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    
    const enteredEmail = emailInputRef.current!.value;
    const enteredPassword = passwordInputRef.current!.value;

    setIsLoading(true);
    try {
    await authCtx.login(enteredEmail, enteredPassword);
    setIsLoading(false);

    if (authCtx.isSuccess) {
        navigate("/", { replace: true });
    }
    } catch (error) {
    setIsLoading(false);
    }
}

return (
    <section>
    <h1>Login</h1>
    <form onSubmit={submitHandler}>
        <div>
        <label htmlFor='email'>Your email</label>
        <input type='email' id='email' required ref={emailInputRef}/>
        </div>
        <div>
        <label htmlFor="password">Your password</label>
        <input type='password' id='password' required ref={passwordInputRef}/>
        </div>
        <div>
        <button type='submit'>Login</button>
        {isLoading && <p>Loading...</p>}
        </div>
    </form>
    </section>
);
}

export default AuthForm;
