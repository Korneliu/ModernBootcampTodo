// Fetch existing todos from localStorage
const getSavedTodos = function() {
  const todosJSON = localStorage.getItem('todos')
  if (todosJSON !== null) {
    return JSON.parse(todosJSON)
  } else {
  return []
  }
}

//Save todos to localStorage
const saveTodos = function(todos) {
  localStorage.setItem('todos', JSON.stringify(todos))
}

//render application todos based on filters
const renderTodos = function (todos, filters) {
  const filteredTodos = todos.filter(function (todo) {
    const searchTextMach = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed
    return searchTextMach && hideCompletedMatch
  })
  const incompleteTodos = filteredTodos.filter(function (todo) {
    return !todo.completed
  })

  document.querySelector('#todos').innerHTML = ''
  document.querySelector('#todos').appendChild(generateSummaryDOM(incompleteTodos))

  filteredTodos.forEach(function (todo) {
    document.querySelector('#todos').appendChild(generateTodoDOM(todo))
  })
}
//get the DOM elements for an individual note
const generateTodoDOM = function (todo) {
  const todoEl = document.createElement('div')

  //Setup checkbox
  const checkbox = document.createElement('input')
  checkbox.setAttribute('type', 'checkbox')
  todoEl.appendChild(checkbox)

  //Setup the todo text
  const textEl = document.createElement('span')
  textEl.textContent = todo.text

  //Setup the remove button
  const button = document.createElement('button')
  button.textContent = 'Remove'
  
  todoEl.appendChild(textEl)
  todoEl.appendChild(button)

  return todoEl
}

//Get the DOM elements for list summary
const generateSummaryDOM = function(incompleteTodos) {
  const summary = document.createElement('h2')
  summary.textContent = `You have ${incompleteTodos.length} todos left`
  return summary
}