import React, {useState} from 'react';
import PasswordInput from './/PasswordInput'

const Game = () => {
    const [password, setPassword] = useState('');

    return (
        <div
        className="min-h-screen flex justify-center items-center flex-col bg-gray-100 rounded-2xl ">
            <h1>The Password Game :)</h1>
            <PasswordInput password={password}  setPassword={setPassword} />


        </div>
    );
};

export default Game;