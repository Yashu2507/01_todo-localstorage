document.addEventListener("DOMContentLoaded",()=>{
const todoInput = document.getElementById("todo-input");
const addTaskButton = document.getElementById("add-task-btn");
const todoList = document.getElementById("todo-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks.forEach(task=>renderTask(task));


addTaskButton.addEventListener("click",() => {

  const taskText = todoInput.value.trim();
  if(taskText === "") return;

  const newTask = {
    id: Date.now(),
    task: taskText,
    completed: false
  }

  tasks.push(newTask);
  saveTasks();
  renderTask(newTask);
  todoInput.value = "";//To clear the Input.
  console.log(tasks);
  
});

function renderTask(task){
   const li = document.createElement('li');
   li.setAttribute('data-id', task.id);

   if(task.completed) li.classList.add("completed");

   li.innerHTML = `
   <span>${task.task}</span>
   <button>Delete</button>
   `;

   li.addEventListener('click',(e)=>{
    if(e.target.tagName == 'BUTTON') return;
    task.completed = !task.completed;
    li.classList.toggle("completed");
    saveTasks();
   });

   li.querySelector('button').addEventListener('click',e=>{
      e.stopPropagation();//Stop bubbling to li. or prevent toggle from firing.Sp it prevents getting effected by li since button is inside the li.
      
      tasks = tasks.filter(t => t.id!== task.id);
      li.remove();
      saveTasks();
   });

    todoList.appendChild(li);
   
}

function saveTasks(){
  localStorage.setItem("tasks",JSON.stringify(tasks));
}
});