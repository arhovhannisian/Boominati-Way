import React, {useEffect, useState,} from 'react';

const Contact = () => {
    const [number, setNumber] = useState(0);
    const [todos, setTodos] = useState([])
    const [text, setText] = useState('')
    const [error, setError] = useState('')
    const  [loading, setLoading] = useState(false);
    function handlePlus() {
       if (number < 5) {
           setNumber(number + 1)
       }else {
           setNumber(number + 10)
       }
    }
    function handleMinus() {
       if (number !== 0) {
           setNumber(number - 1)
       }
    }
    function handleAddTodo() {
        setError('')
      if (text !== '') {
            const newTodo = {
                id: Math.random(),
                title: text
            }

          setTodos([...todos, newTodo])

          setText('')
      }else {
          setError("Input is required")
      }
    }
    useEffect(()=>{
        async function fetchTodos (){
            try {
                setLoading(true);
                const response = await fetch("https://jsonplaceholder.typicode.com/todos")
                const data = await response.json()
               setTodos(data)
            }catch (e) {
                console.log(e.message)
            }finally {
                setLoading(false);
            }
        }
        fetchTodos()
    }, [])
    useEffect(() => {
        localStorage.setItem ("todos", JSON.stringify(todos))
        console.log(todos)
    }, [todos])

    return (
        <div>
            <div className="m-8">
                <button onClick={handleMinus}>
                    -
                </button>
                <span className="m-8">
                {number}
            </span>

                <button onClick={handlePlus }>
                    +
                </button>
            </div>
            <div className="flex flex-col gap-3 w-[200px]">
                <input type="text"
                       onChange={(e)=>{
                           setText(e.target.value)
                           // console.log(text)
                       }}
                       value={text} />
                <span>{error}</span>
                <button onClick={handleAddTodo}>Add</button>


                {loading ?
                    <div className="loader"></div>
                    :
                    <ul>
                        {todos.map((todo, index)=>{
                            return <li key={index}>
                                {todo.title}
                            </li>
                        })}
                    </ul>
                }


            </div>
    </div>

    );
};

export default Contact;