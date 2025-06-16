// Get DOM elements
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');

// Load todos from localStorage
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Function to save todos to localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Function to create todo item element
function createTodoElement(todo) {
    const li = document.createElement('li');
    li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    li.dataset.id = todo.id;
    
    li.innerHTML = `
        <input type="checkbox" ${todo.completed ? 'checked' : ''} onchange="toggleTodo(${todo.id})">
        <span class="todo-text">${todo.text}</span>
        <div class="todo-actions">
            <button onclick="editTodo(${todo.id})" class="btn-icon">
                <i class="fas fa-edit"></i>
            </button>
            <button onclick="deleteTodo(${todo.id})" class="btn-icon">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    
    return li;
}

// Function to render todos
function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach(todo => {
        todoList.appendChild(createTodoElement(todo));
    });
}

// Function to add new todo
function addTodo() {
    const text = todoInput.value.trim();
    if (text) {
        const todo = {
            id: Date.now(),
            text: text,
            completed: false
        };
        
        todos.push(todo);
        saveTodos();
        renderTodos();
        todoInput.value = '';
    }
}

// Function to toggle todo completion
function toggleTodo(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });
    
    saveTodos();
    renderTodos();
}

// Function to edit todo
function editTodo(id) {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        const newText = prompt('Edit task:', todo.text);
        if (newText !== null) {
            todos = todos.map(todo => {
                if (todo.id === id) {
                    return { ...todo, text: newText.trim() };
                }
                return todo;
            });
            
            saveTodos();
            renderTodos();
        }
    }
}

// Function to delete todo
function deleteTodo(id) {
    if (confirm('Are you sure you want to delete this task?')) {
        todos = todos.filter(todo => todo.id !== id);
        saveTodos();
        renderTodos();
    }
}

// Add event listener for Enter key
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// Initialize todos on page load
document.addEventListener('DOMContentLoaded', () => {
    renderTodos();
}); 