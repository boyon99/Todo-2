import { createTodo, readTodos, updateTodo, deleteTodo } from './request.js'



const inputEl = document.querySelector('.create .input')
const btnEl = document.querySelector('.create button')
const starEl = document.querySelector('.create .star')
const todoConatinerEl = document.querySelector('.todo-container')
const loadingEl = document.querySelector('.loading')

// input 
let inputText = ''
inputEl.addEventListener('input', () => {
  inputText = inputEl.value
})

// click
inputEl.addEventListener('keydown', event => {
  if (event.key === 'Enter' && !event.isComposing) {
    btnEl.click()
  }
})
btnEl.addEventListener('click', async () => {
  await createTodo(inputText)
  const isStarEl = starEl.checked
  const todos = await readTodos()
  renderTodos(todos, isStarEl)
  inputEl.value = ''
})

  // render
  ; (async () => {
    const todos = await readTodos()
    // loading 
    setTimeout(() => {
      loadingEl.style.display = "none"
      renderTodos(todos)
    }, 500)
  })()


// create-todo
function renderTodos(todos, isStarEl) {
  const liEls = todos.map(todo => {

    console.log(todo)
    // div
    const divEl = document.createElement('div')
    divEl.classList.add("todolist", "list-group-item")

    if(isStarEl){
      divEl.classList.add("important")
    }

    // checkbox
    const checkboxEl = document.createElement('input')
    checkboxEl.type = "checkbox"
    checkboxEl.checked = todo.done ? true : false;

    // text
    const inputUpdateEl = document.createElement('input')
    inputUpdateEl.type = "text"
    inputUpdateEl.value = todo.title
    inputUpdateEl.focus()

    // create date
    const createDate = document.createElement('p')
    let date = /....-..-../ig.exec(todo.createdAt)
    let time = /..:../ig.exec(todo.createdAt)
    createDate.innerText = `생성일 : ${date} ${time}`

    // update date
    const updateDate = document.createElement('p')
    let date2 = /....-..-../ig.exec(todo.updatedAt)
    let time2 = /..:../ig.exec(todo.updatedAt)
    updateDate.innerText = `수정일 : ${date2} ${time2}`


    // input-todo
    let inputText = inputUpdateEl.value
    inputUpdateEl.addEventListener('input', async () => {
      inputText = inputUpdateEl.value
    })

    todo.title = inputText

    // update-btn
    const btnUpdateEl = document.createElement('button')
    btnUpdateEl.textContent = '저장'
    btnUpdateEl.classList.add("btn--update")
    btnUpdateEl.style.opacity = "0"

    // update-todo
    btnUpdateEl.addEventListener('click', async () => {
      todo.done = checkboxEl.checked ? true : false;
      todo.title = inputText
      console.log(todo)
      await updateTodo(todo)
      const todos = await readTodos()
      loadingEl.style.display = "block"

      setTimeout(() => {
        loadingEl.style.display = "none"
        renderTodos(todos)
      }, 500)
    })

    // animation
    divEl.addEventListener('mouseover', () => {
      gsap.to(btnUpdateEl, 2, {
        opacity: 1,
        x: -20
      })
    })
    // animation
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
      // loading
      loadingEl.style.display = "block"
      setTimeout(() => {
        loadingEl.style.display = "none"
        renderTodos(todos)
      }, 500)
    })

    divEl.append(checkboxEl, inputUpdateEl, btnUpdateEl, btnDeleteEl, createDate, updateDate)

    return divEl
  })
  todoConatinerEl.innerHTML = ''
  todoConatinerEl.append(...liEls)
}


// select done
const filterDiv = document.querySelector('.filter')
const selectEl = document.querySelector("#done")
const allDeleteBtn = document.createElement('button')

// all delete
allDeleteBtn.textContent = '모두삭제'
allDeleteBtn.style.display = 'none'
filterDiv.append(allDeleteBtn)

allDeleteBtn.addEventListener('click',async ()=>{
  const todos = await readTodos()
  const todo = todos.filter(i => i.done)
  for(let i = 0; i < todo.length; i++){
    await deleteTodo(todo[i])
  }
  // loading
  loadingEl.style.display = "block"
  setTimeout(async () => {
    loadingEl.style.display = "none"
    const todos = await readTodos()
    renderTodos(todos)
  }, 500)
})

// filter function
selectEl.addEventListener("change", async () => {
  todoConatinerEl.innerHTML = ''

  if (selectEl.value === "done") {
    const todos = await readTodos()
    // loading
    loadingEl.style.display = "block"
    setTimeout(() => {
      loadingEl.style.display = "none"
      renderTodos(todos.filter(i => i.done))
    }, 300)
    allDeleteBtn.style.display = 'block'
  } else if (selectEl.value === "not-done") {
    const todos = await readTodos()
    // loading
    loadingEl.style.display = "block"
    setTimeout(() => {
      loadingEl.style.display = "none"
      renderTodos(todos.filter(i => !i.done))
    }, 300)
  } else {
    const todos = await readTodos()
    // loading
    loadingEl.style.display = "block"
    setTimeout(() => {
      loadingEl.style.display = "none"
      renderTodos(todos)
    }, 300)
  }
})


// Simple list
Sortable.create(simpleList, { /* options */ });

