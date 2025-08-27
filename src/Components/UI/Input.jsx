import React from 'react';

const Input = ({name, register, error, validation, ...props }) => {
    return (
        <div>
            <input
                {...props}
                {...register(name, validation)}
                className="bg-green-800 text-white rounded-2xl p-1"
                type="text"/>
            {error && <p className="text-red-600">{error}</p>}
        </div>
    );
};

export default Input;