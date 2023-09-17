const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-form input")
const todoList = document.querySelector("#todo-list");

const TODOS_KEY = "todos";

let toDosArr = [];

function saveToDos(){
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDosArr));
}

function deleteToDo(event){
    const li = event.target.parentElement;
    const span = li.querySelector("span");

    span.style.textDecoration = "line-through #FF5757";
    
    setTimeout(function(){
        li.remove();
        console.log("li.id는", li.id)
        toDosArr = toDosArr.filter(toDo => toDo.id !== parseInt(li.id));

        saveToDos(); 

    }, 1000);
}

function paintToDo(newToDo){
  
    const li = document.createElement("li");
    li.id = newToDo.id;
    const span = document.createElement("span");
    const deleteIcon = document.createElement("i")
    deleteIcon.classList.add("fas");
    deleteIcon.classList.add("fa-times-circle");
    deleteIcon.addEventListener("click", deleteToDo);

    
    li.appendChild(deleteIcon);
    li.appendChild(span);
    span.innerText = newToDo.text;
    todoList.appendChild(li);
}

function handleToDoSubmit(event){
    event.preventDefault();
    const newToDo = todoInput.value;
    
    console.log(todoInput.value);
    todoInput.value = "";
    
    const newToDoObj ={
        text: newToDo,
        id: Date.now()
    }
    toDosArr.push(newToDoObj);
    paintToDo(newToDoObj);
    saveToDos();
}

todoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);
if(savedToDos !== null){
    const parsedToDos = JSON.parse(savedToDos);
    toDosArr = parsedToDos;
    parsedToDos.forEach(paintToDo);
}
