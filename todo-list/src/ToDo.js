import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';

function ToDo({ todo, toggleTask, removeTask, saveTask }) {
    const [edit, setEdit] = useState(null);
    const [userInput, setUserInput] = useState(todo.task);

    const handleChange = (e) => {
        setUserInput(e.currentTarget.value)
    }
    const editTask = (id) => {
        setEdit(true)
    }
    const saveTodo = (id, userInput) => {
        saveTask(id, userInput)
        setEdit(null)
    }
    return (
        <div key={todo.id} className="item-todo">
            <div 
                className={todo.complete ? "item-text strike" : "item-text"}
                >
                {
                    edit ?
                    <div>
                        <input 
                        type='text' 
                        value={userInput}
                        onChange={handleChange} 
                        className='input-edit' 
                        ></input>
                    </div>
                    :
                    <div onClick={() => toggleTask(todo.id)}>{todo.task}</div>
                }
            </div>
            <div>
                {
                    edit ?
                    <div>
                        <button 
                        className="item-edit" onClick={() => saveTodo(todo.id, userInput)}><FontAwesomeIcon icon={faFloppyDisk}></FontAwesomeIcon></button>
                    </div>
                    :
                    <div>
                        <button className="item-delete" onClick={() => removeTask(todo.id)}>
                        <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                        </button>
                        <button className="item-edit" onClick={() => editTask(todo.id)}>
                        <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
                        </button>
                    </div>
                }

            </div>
        </div>
    )
}

export default ToDo