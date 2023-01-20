import { createTodo, readTodos, updateTodo, deleteTodo } from './request.js'



const inputEl = document.querySelector('.create input')
const btnEl = document.querySelector('.create button')
const listEl = document.querySelector('.list')

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
})

;(async () => {
  const todos = await readTodos()
  renderTodos(todos)
})()

function renderTodos(todos) {
  const liEls = todos.map(todo => {
    const liEl = document.createElement('li')
    liEl.innerHTML = /* html */ `
      <span>${todo.title}</span>
    `
    liEl.addEventListener('click', async () => {
      await updateTodo(todo)
      const todos = await readTodos()
      renderTodos(todos)
    })

    const btnEl = document.createElement('button')
    btnEl.textContent = '삭제'
    btnEl.addEventListener('click', async () => {
      await deleteTodo(todo)
      const todos = await readTodos()
      renderTodos(todos)
    })
    liEl.append(btnEl)
    
    return liEl
  })
  listEl.innerHTML = ''
  listEl.append(...liEls)
}



// Simple list
Sortable.create(simpleList, { /* options */ });

// List with handle
Sortable.create(listWithHandle, {
  handle: '.glyphicon-move',
  animation: 150
});


