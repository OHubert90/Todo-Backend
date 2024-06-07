import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

interface Todo {
    id: string;
    title: string;
    completed: boolean;
}

const App: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState<string>('');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await axios.get<Todo[]>('http://localhost:8080/api/todos');
            setTodos(response.data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    const addTodo = async () => {
        if (newTodo.trim()) {
            try {
                const response = await axios.post<Todo>('http://localhost:8080/api/todos', { title: newTodo, completed: false });
                setTodos([...todos, response.data]);
                setNewTodo('');
            } catch (error) {
                console.error('Error adding todo:', error);
            }
        }
    };

    const toggleTodoCompletion = async (id: string) => {
        try {
            const todo = todos.find(t => t.id === id);
            if (todo) {
                const response = await axios.put<Todo>(`http://localhost:8080/api/todos/${id}`, {
                    ...todo,
                    completed: !todo.completed
                });
                setTodos(todos.map(t => (t.id === id ? response.data : t)));
            }
        } catch (error) {
            console.error('Error toggling todo:', error);
        }
    };

    const deleteTodo = async (id: string) => {
        try {
            await axios.delete(`http://localhost:8080/api/todos/${id}`);
            setTodos(todos.filter(t => t.id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    return (
        <div className="App">
            <h1>Todo App</h1>
            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new todo"
            />
            <button onClick={addTodo}>Add Todo</button>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
            <span
                style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                onClick={() => toggleTodoCompletion(todo.id)}
            >
              {todo.title}
            </span>
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
