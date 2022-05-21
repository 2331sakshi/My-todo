//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//event listeners
document.addEventListener('DOMContentLoaded',getTodos); //if everything is loaded, get todos from storage
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener('click',filterTodo);


//functions
//create a todo element
function addTodo(event){
    //prevent form from submitting
    event.preventDefault();
    //todo Div
    const todoDiv=document.createElement("div");
    todoDiv.classList.add("todo");
    //create LI
    const newTodo = document.createElement('li');
    newTodo.innerText=todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //add todo into local storage
    saveLocalTodos(todoInput.value);
    //check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //check trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //append to list
    todoList.appendChild(todoDiv);

    //clear tod input value
    todoInput.value="";
}

function deleteCheck(e){
    console.log(e.target);
    const item= e.target;
    //delete todo
    if(item.classList[0]==='trash-btn'){
        const todo = item.parentElement;
       //animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend',function(){
            todo.remove();
        });
        
        
    }
    //checkmark
    if(item.classList[0]==='complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }

}

function filterTodo(e){
    const todos=todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display='flex';
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display='flex';
                }
                else{
                    todo.style.display='none';
                }
                break;
            case "incomplete":
                if(!todo.classList.contains('completed')){
                    todo.style.display='flex';
                }
                else{
                    todo.style.display='none';
                }
                break;               

        }
    });
}

//save in local storage (local host storage press f12 and go to storage<local storage<host server)
function saveLocalTodos(todo){
    //chchk if we already things in the storage
    let todos;
    if(localStorage.getItem('todos') === null) //no array present
    {
        todos=[];
    } 
    else{ //array already present, get the todos array from the local storage 
        todos=JSON.parse(localStorage.getItem('todos')); 
    }
    //add item in the array
    todos.push(todo);
    //set it back into the local storage
    localStorage.setItem('todos',JSON.stringify(todos));
}

//after refreshing on the screen
function getTodos(){
    console.log('hello');
    //chchk if we already things in the storage
    let todos;
    if(localStorage.getItem('todos') === null) {
         todos=[];
    }   //no array present
         
    else{ //array already present, get the todos array from the local storage 
        todos=JSON.parse(localStorage.getItem('todos')); 
    }
    
    //looping over each todo to display them one by one
    todos.forEach(function(todo) {
    //todo Div
    const todoDiv=document.createElement("div");
    todoDiv.classList.add("todo");
    //create LI
    const newTodo = document.createElement('li');
    newTodo.innerText=todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    
    //check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //check trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //append to list
    todoList.appendChild(todoDiv);

    });
}

function removeLocalTodos(todo){
    //chchk if we already todos in the storage
    let todos;
    if(localStorage.getItem('todos') === null) //no array present
    {
        todos=[];
    } else{ //array already present, get the todos array from the local storage 
        todos=JSON.parse(localStorage.getItem('todos')); 
    }
    console.log(todos);

    const todoItem = todo.children[0].innerText;
    console.log(todoItem);
    todos.splice (todos.indexOf(todoItem), 1); //removing one element from the position indexOf(todoItem)
    localStorage.setItem('todos',JSON.stringify(todos));
}