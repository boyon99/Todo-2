import { createTodo, readTodos, updateTodo, deleteTodo } from './request.js'



const inputEl = document.querySelector('.create input')
const btnEl = document.querySelector('.create button')
const todoConatinerEl = document.querySelector('.todo-container')

// input 
let inputText = ''
inputEl.addEventListener('input', () => {
  inputText = inputEl.value
})
inputEl.addEventListener('keydown', event => {
  if (event.key === 'Enter' && !event.isComposing) {
    btnEl.click()
  }
})
btnEl.addEventListener('click', async () => {
  await createTodo(inputText)
  const todos = await readTodos()
  renderTodos(todos)
  inputEl.value = ''
})

  // render
  ; (async () => {
    const todos = await readTodos()
    renderTodos(todos)
  })()

// create-todo
function renderTodos(todos) {
  const liEls = todos.map(todo => {
    const divEl = document.createElement('div')
    const inputUpdateEl = document.createElement('input')
    inputUpdateEl.type = "text"
    inputUpdateEl.value = todo.title
    inputUpdateEl.focus()
    // input-todo
    let inputText = inputUpdateEl.value
    inputUpdateEl.addEventListener('input', async () => {
      inputText = inputUpdateEl.value
    })

    todo.title = inputText

    // update-todo
    const btnUpdateEl = document.createElement('button')
    btnUpdateEl.textContent = '수정'
    btnUpdateEl.addEventListener('click', async () => {
      todo.title = inputText
      await updateTodo(todo)
      const todos = await readTodos()
      renderTodos(todos)
    })

    // delete-todo
    const btnDeleteEl = document.createElement('button')
    btnDeleteEl.textContent = '삭제'
    btnDeleteEl.addEventListener('click', async () => {
      await deleteTodo(todo)
      const todos = await readTodos()
      renderTodos(todos)
    })
    divEl.append(inputUpdateEl, btnUpdateEl, btnDeleteEl)

    return divEl
  })
  todoConatinerEl.innerHTML = ''
  todoConatinerEl.append(...liEls)
}





// Simple list
Sortable.create(simpleList, { /* options */ });

// List with handle
Sortable.create(listWithHandle, {
  handle: '.glyphicon-move',
  animation: 150
});


