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

    console.log(todo)

    // div
    const divEl = document.createElement('div')
    divEl.classList.add("todolist", "list-group-item")

    // checkbox
    const checkboxEl = document.createElement('input')
    checkboxEl.type = "checkbox"
    checkboxEl.checked = todo.done ? true : false;

    // text
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

    // update-btn
    const btnUpdateEl = document.createElement('button')
    btnUpdateEl.textContent = '수정'
    btnUpdateEl.classList.add("btn--update")
    btnUpdateEl.style.opacity = "0"

    // update-todo
    btnUpdateEl.addEventListener('click', async () => {
      todo.done = checkboxEl.checked ? true : false;
      
      todo.title = inputText
      console.log(todo)
      await updateTodo(todo)
      const todos = await readTodos()
      renderTodos(todos)
    })

    divEl.addEventListener('mouseover', () => {
      gsap.to(btnUpdateEl, 2, {
        opacity: 1,
        x: -20
      })
    })

    divEl.addEventListener('mouseout', () => {
      gsap.to(btnUpdateEl, 2, {
        opacity: 0
      })
    })

    // delete-todo
    const btnDeleteEl = document.createElement('button')
    btnDeleteEl.textContent = '삭제'
    btnDeleteEl.classList.add("btn--delete")
    btnDeleteEl.addEventListener('click', async () => {
      await deleteTodo(todo)
      const todos = await readTodos()
      renderTodos(todos)
    })

    divEl.append(checkboxEl, inputUpdateEl, btnUpdateEl, btnDeleteEl)

    return divEl
  })
  todoConatinerEl.innerHTML = ''
  todoConatinerEl.append(...liEls)
}


// select done
const selectEl = document.querySelector("#done")
console.log(selectEl.value)

selectEl.addEventListener("change", ()=>{
  if(selectEl.value==="done"){

  }
})


// Simple list
Sortable.create(simpleList, { /* options */ });

