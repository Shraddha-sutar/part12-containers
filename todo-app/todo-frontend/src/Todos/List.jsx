import React from 'react'

const TodoList = ({ todos = [], deleteTodo, completeTodo }) => {
  if (!Array.isArray(todos)) {
    return <div>No todos</div>
  }

  return (
    <>
      {todos.map(todo => {
        const doneInfo = (
          <>
            <span>This todo is done</span>
            <span>
              <button onClick={() => deleteTodo(todo)}>Delete</button>
            </span>
          </>
        )

        const notDoneInfo = (
          <>
            <span>This todo is not done</span>
            <span>
              <button onClick={() => deleteTodo(todo)}>Delete</button>
              <button onClick={() => completeTodo(todo)}>Set as done</button>
            </span>
          </>
        )

        return (
          <div
            key={todo._id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              maxWidth: '70%',
              margin: 'auto'
            }}
          >
            <span>{todo.text}</span>
            {todo.done ? doneInfo : notDoneInfo}
          </div>
        )
      }).reduce((acc, cur) => [...acc, <hr key={Math.random()} />, cur], [])}
    </>
  )
}

export default TodoList
