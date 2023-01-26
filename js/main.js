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
  const isStarEl = starEl.checked?"1":"0"
  await createTodo(inputText, isStarEl)
  const todos = await readTodos()
  renderTodos(todos)
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

    // important
    if (todo.order === 1) {
      inputUpdateEl.classList.add("important")
    }

    // create date
    const createDate = document.createElement('p')
    createDate.classList.add("date__create")
    let date = /....-..-../ig.exec(todo.createdAt)
    let time = /..:../ig.exec(todo.createdAt)
    createDate.innerText = `생성일 : ${date} ${time}`

    // update date
    const updateDate = document.createElement('p')
    updateDate.classList.add("date__update")
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
    btnUpdateEl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
    width="24" height="24"
    viewBox="0,0,256,256"
    style="fill:#000000;">
    <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(8,8)"><path d="M16,3c-7.16797,0 -13,5.83203 -13,13c0,7.16797 5.83203,13 13,13c7.16797,0 13,-5.83203 13,-13c0,-7.16797 -5.83203,-13 -13,-13zM16,5c6.08594,0 11,4.91406 11,11c0,6.08594 -4.91406,11 -11,11c-6.08594,0 -11,-4.91406 -11,-11c0,-6.08594 4.91406,-11 11,-11zM22.28125,11.28125l-7.28125,7.28125l-4.28125,-4.28125l-1.4375,1.4375l5,5l0.71875,0.6875l0.71875,-0.6875l8,-8z"></path></g></g>
    </svg>`
    btnUpdateEl.classList.add("btn--update")

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
        x: 20
      })
    })
    // animation
    divEl.addEventListener('mouseleave', () => {
      gsap.to(btnUpdateEl, 4, {
        opacity: 0,
        x: -20
      })
    })

    // delete-todo
    const btnDeleteEl = document.createElement('button')
    btnDeleteEl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
    width="24" height="24"
    viewBox="0,0,256,256"
    style="fill:#000000;">
    <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(8,8)"><path d="M15,4c-0.52344,0 -1.05859,0.18359 -1.4375,0.5625c-0.37891,0.37891 -0.5625,0.91406 -0.5625,1.4375v1h-6v2h1v16c0,1.64453 1.35547,3 3,3h12c1.64453,0 3,-1.35547 3,-3v-16h1v-2h-6v-1c0,-0.52344 -0.18359,-1.05859 -0.5625,-1.4375c-0.37891,-0.37891 -0.91406,-0.5625 -1.4375,-0.5625zM15,6h4v1h-4zM10,9h14v16c0,0.55469 -0.44531,1 -1,1h-12c-0.55469,0 -1,-0.44531 -1,-1zM12,12v11h2v-11zM16,12v11h2v-11zM20,12v11h2v-11z"></path></g></g>
    </svg>`
    
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
allDeleteBtn.classList.add("btn__all-delete")
filterDiv.append(allDeleteBtn)

allDeleteBtn.addEventListener('click', async () => {
  const todos = await readTodos()
  const todo = todos.filter(i => i.done)
  for (let i = 0; i < todo.length; i++) {
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
    allDeleteBtn.style.display = 'none'
    // loading
    loadingEl.style.display = "block"
    setTimeout(() => {
      loadingEl.style.display = "none"
      renderTodos(todos.filter(i => !i.done))
    }, 300)
  } else {
    const todos = await readTodos()
    allDeleteBtn.style.display = 'none'
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

