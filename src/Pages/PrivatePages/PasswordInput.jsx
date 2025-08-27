import React from 'react';
import Input from "../../Components/UI/Input.jsx";
import {useForm} from "react-hook-form";

const PasswordInput = ({password, setPassword}) => {
        const IsRule1Valid = password.length >= 5;
        const IsRule2Valid = /\d/.test(password);
        const IsRule3Valid = /[A-Z]/.test(password);
        const IsRule4Valid = /[^a-zA-Z0-9]/.test(password);
        const digitiMatches = (password.match(/\d/g) || []).map(Number).reduce((a, b) => a + b, 0);
        const IsRule5Valid = digitiMatches >= 25
        const months = [
            'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'
        ]

        const {
                register,
                handleSubmit,
                formState: { errors },
        } = useForm();

        function fn (){
                console.log('okkk')
        }

        const lowerPassword = password.toLowerCase();
        const IsRule6Valid = months.some(month => lowerPassword.includes(month))
        const lettersOnly = (password.match(/[a-zA-Z]+/g) || []).join('');
        const IsRule7Valid =  /^[IVXLCDM]+$/i.test(lettersOnly);
    return (
        <form onSubmit={handleSubmit(fn)} className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-sm ">
            <label className="block" htmlFor="aa">
            <span className="text-gray-600 dark:text-gray-400 " > Please choose a password</span>
            <Input type="text" id='aa'
            value={password}
                   name={password}
                   validation={IsRule7Valid}
                   error={errors}
                   register={register}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 gap-4"

            />
            </label>
            <div
                className={
                    IsRule1Valid
                        ? 'bg-green-100 text-green-800 p-3 rounded-md font-medium'
                        : 'bg-red-100 text-red-800 p-3 rounded-md font-medium'
                }
            >
                {IsRule1Valid
                    ? '✅ Rule 1: Password is at least 5 characters long.'
                    : '❌ Rule 1: Password must be at least 5 characters long.'}
            </div>
            {IsRule1Valid && (
            <div
            className={
                IsRule2Valid
                ? 'bg-green-100 text-green-800 p-3 rounded-mb  font-medium'
                : 'bg-red-100 text-red-800 p-3 rounded-md font-medium'
                }
            >
                {IsRule2Valid
                    ? '✅ Rule 2: Password contains at least one number.'
                    : '❌ Rule 2: Password must contain at least one number.'
                }

            </div>
                )}
            { IsRule2Valid && (
            <div
            className={
                IsRule3Valid
                    ? 'bg-green-100 text-green-800 p-3 rounded-md font-medium'
                    : 'bg-red-100 text-red-800 p-3 rounded-md font-medium'

            }>

                {
                    IsRule3Valid
                        ? '✅ Rule 3: Your password must include an uppercase letter.'
                        : '❌ Rule 3: Password must contain at least one uppercase letter.'

                      }
            </div>

            )}
                {IsRule3Valid && (
                    <div className={
                            IsRule4Valid
                                ? 'bg-green-100 text-green-800 p-3 rounded-md font-medium'
                                : 'bg-red-100 text-red-800 p-3 rounded-md font-medium'
                    }>
                            {
                            IsRule4Valid
                            ? '✅ Rule 4: Your password must include an uppercase letter.'
                            : '❌ Rule 4: Password must contain at least one uppercase letter.'
                            }
                    </div>
                            )}
            {IsRule4Valid && (
                <div className={
                    IsRule5Valid
                    ? 'bg-green-100 text-green-800 p-3 rounded-md font-medium'
                        : 'bg-red-100 text-red-800 p-3 rounded-md font-medium'
                }>
                    {
                    IsRule5Valid
                        ?'✅ Rule 5: The digits in your password must upp to 25.'
                        : '❌ Rule 5: The digits in your password must upp to 25.'
                    }

                </div>
            )}
            {IsRule5Valid && (
                <div className={
                    IsRule6Valid
                        ? 'bg-green-100 text-green-800 p-3 rounded-md font-medium'
                        : 'bg-red-100 text-red-800 p-3 rounded-md font-medium'
                     }>
                    {
                    IsRule6Valid

                    ? '✅ Rule 6: Your password must include a month of the year'
                    : '❌ Rule 6:  Your password must include a month of the year'
                    }

                </div>

            )}
            {
                IsRule6Valid && (
                    <div
                        className={
                        IsRule7Valid
                            ? 'bg-green-100 text-green-800 p-3 rounded-md font-medium'
                            : 'bg-red-100 text-red-800 p-3 rounded-md font-medium'
                        }
                    >
                        {
                            IsRule7Valid
                                ? '✅ Rule 7: Only Roman letters allowed.'
                                : '❌ Rule 7: Only Roman letters allowed.'
                            }
                    </div>
                )
            }

        </form>
    )
}

export default PasswordInput;