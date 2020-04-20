//SELECTORS
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//EVENT LISTENER
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
//Functions
function addTodo(event) {
  //Prevent form from submitting
  event.preventDefault();

  /*WHAT IT LOOKS LIKE IN HTML 
    <div class = "todo
         <li class="todo-item"></li>
        <button class = "complete-btn" </button>
        <button class = "trash-btn" </button>
    </div>
    */
  //Creating Todo DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //CREATING LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  //ADDING A CLASS
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  //ADD TODO TO LOCAL STRORAGE
  saveLocalTodos(todoInput.value);
  //COMPLETED/CHECKED MARK BUTTON
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  //ADDING A CLASS
  completedButton.classList = "complete-btn";
  todoDiv.appendChild(completedButton);

  //TRASH BUTTON
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  //ADDING A CLASS
  trashButton.classList = "trash-btn";
  todoDiv.appendChild(trashButton);
  //APPEND TO LIST
  todoList.appendChild(todoDiv);
  //CLEAR TO DO INPUT VALUE
  todoInput.value = "";
}

//DELETE FUNCTION
function deleteCheck(e) {
  const item = e.target;
  //DELETE TODO
  if (item.classList[0] === "trash-btn") {
    //GO UP TO THE PARENT ELEMENT AND REMOVE
    const todo = item.parentElement;
    //ANIMATION
    todo.classList.add("fall");
    removeLocalTodos(todo);
    //WAIT TILL TRANSTION IS DONE
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //CHECK MARK
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

//SAVE LOCAL TO DO
function saveLocalTodos(todo) {
  //CHECK -- DO I HAVE THINGS IN THERE?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  //CHECK -- DO I HAVE THINGS IN THERE?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    //Creating Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //CREATING LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    //ADDING A CLASS
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //COMPLETED/CHECKED MARK BUTTON
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    //ADDING A CLASS
    completedButton.classList = "complete-btn";
    todoDiv.appendChild(completedButton);

    //TRASH BUTTON
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    //ADDING A CLASS
    trashButton.classList = "trash-btn";
    todoDiv.appendChild(trashButton);
    //APPEND TO LIST
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  //CHECK -- DO I HAVE THINGS IN THERE?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoInput), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
