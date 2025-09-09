import React, {useEffect, useState} from 'react';
import axios from "axios";

const Todo = () => {
    const [todo,  setTodo] = useState("");
    const [todos, setTodos] = useState([]);


   async function addTodo() {
        if(todo !== ''){
            setTodo ('');
            try{
                const response = await axios.post("https://boominati-way.onrender.com/todos", {todo})
                fetchTodos()
                return response.data;
            }catch(e){
                console.log(e.message)
            }
        }
    }
    const fetchTodos = async () => {
        try{
            const response = await axios.get("https://boominati-way.onrender.com/todos");
            const data = await response.data;
            setTodos(data);
            return response.data;
        }catch(e){
            console.log(e.message)
        }

    }
    useEffect(() => {
        fetchTodos();
    },[])

    return (
        <div>
          <h1>Todo List</h1>
            <div>
                <input
                    value={todo}
                    onChange={(e)=>setTodo(e.target.value)}
                    type="text"/>

                <button onClick={addTodo}>Add</button>
            </div>
            <ul>
                {
                    todos.map((e, index)=>{
                        return (
                            <li key={index}>
                                {e.todo}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
};

export default Todo;