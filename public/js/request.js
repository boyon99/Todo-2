const headers = {
  'Content-Type': 'application/json',
  apikey: process.env.apikey,
  username: 'KDT4_LeeEoJin'
}

export async function createTodo(title, order) {
  try {
    const res = await fetch('https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        title : title,
        order : order
      })
    })
    const json = await res.json()
    console.log(json)
  } catch (error) {
  }
}

export async function readTodos() {
  try {
    const res = await fetch('https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos', {
      method: 'GET',
      headers
    })
    const json = await res.json()
    return json
  } catch (error) {
    throw error
  }
}

export async function updateTodo(todo) {
  await fetch(`https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${todo.id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      title: `${todo.title}`,
      done: todo.done
    })
  })
}


export async function deleteTodo(todo) {
  await fetch(`https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${todo.id}`, {
    method: 'DELETE',
    headers
  })
}