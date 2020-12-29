// selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const todoDeadline = document.querySelector('.todo-deadline');

// event listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);

// functions
// ADD new todo
function addTodo(e) {
    e.preventDefault();
    // check if input value non empty or spaces and create todo elements
    if(todoInput.value.trim() !== '') {
        // create div for todo
        const singleTodo = document.createElement('div');
        singleTodo.classList.add('todo');
        // create li element
        const newTodo = document.createElement('li');
        newTodo.innerText = todoInput.value;
        newTodo.classList.add('single-todo');
        singleTodo.appendChild(newTodo);
        // save to session storage
        saveSession(todoInput.value);
        // completed button
        const doneButton = document.createElement('button');
        doneButton.innerHTML = `<i class="fas fa-check"></i>`;
        doneButton.classList.add('done-btn');
        singleTodo.appendChild(doneButton);
        // delete button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = `<i class="fas fa-window-close"></i>`;
        deleteButton.classList.add('delete-btn');
        singleTodo.appendChild(deleteButton);
        // append todo to list
        todoList.appendChild(singleTodo);
    } else {
        alert('What Do You Want to Do?');
    }
    // clear input value
    todoInput.value = "";
}
// DELETE OR MARK COMPLETED
function deleteCheck(event){
    const item = event.target;
    
    if(item.classList[0] === 'delete-btn') {
        const todo = item.parentElement;
        
        // remove from session storage
        deleteSession(todo);
        todo.remove();
    }
    if(item.classList[0] === 'done-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
        todoList.appendChild(todo);
    }
}
// SAVE TO SESSION STORAGE
function saveSession(todo) {
    // check session storage for existing todos
    let todos;
    if(sessionStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(sessionStorage.getItem('todos'));
    }
    todos.push(todo);
    sessionStorage.setItem('todos', JSON.stringify(todos));
}
// RETRIEVE DATA FROM SESSION STORAGE
function getTodos() {
    let todos;
    if(sessionStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(sessionStorage.getItem('todos'));
    }
    todos.forEach(function(todo) {
        const singleTodo = document.createElement('div');
        singleTodo.classList.add('todo');
        
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('single-todo');
        singleTodo.appendChild(newTodo);
        
        const doneButton = document.createElement('button');
        doneButton.innerHTML = `<i class="fas fa-check"></i>`;
        doneButton.classList.add('done-btn');
        singleTodo.appendChild(doneButton);

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = `<i class="fas fa-window-close"></i>`;
        deleteButton.classList.add('delete-btn');
        singleTodo.appendChild(deleteButton);
        
        todoList.appendChild(singleTodo);
    });
}

// DELETE FROM SESSION STORAGE
function deleteSession(todo) {
    let todos;
    if(sessionStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(sessionStorage.getItem('todos'));
    }
    const indexTodo = todo.children[0].innerText;
    todos.splice(todos.indexOf(indexTodo), 1);
    sessionStorage.setItem('todos', JSON.stringify(todos));
}