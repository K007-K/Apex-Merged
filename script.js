// Form Validation
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  formMessage.textContent = '';
  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();
  if (!name || !email || !message) {
    formMessage.textContent = 'All fields are required.';
    return;
  }
  if (!validateEmail(email)) {
    formMessage.textContent = 'Please enter a valid email address.';
    return;
  }
  formMessage.style.color = '#388e3c';
  formMessage.textContent = 'Form submitted successfully!';
  contactForm.reset();
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Dynamic To-Do List
const todoInput = document.getElementById('todoInput');
const addTodoBtn = document.getElementById('addTodoBtn');
const todoList = document.getElementById('todoList');

addTodoBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') addTodo();
});

function addTodo() {
  const task = todoInput.value.trim();
  if (!task) return;
  const li = document.createElement('li');
  li.textContent = task;
  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove';
  removeBtn.className = 'remove-btn';
  removeBtn.onclick = function() {
    todoList.removeChild(li);
  };
  li.appendChild(removeBtn);
  todoList.appendChild(li);
  todoInput.value = '';
} 