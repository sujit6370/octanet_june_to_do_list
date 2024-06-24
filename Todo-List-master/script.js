
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
  
    
    if (taskInput.value.trim() === '') {
      alert('Please enter a task!');
      return;
    }
  

    const newTask = document.createElement('li');
    newTask.innerHTML = `
      <input type="checkbox">
      <span>${taskInput.value}</span>
      <input type="date" value="">
      <button onclick="editTask(this)">Edit</button>
      <button onclick="deleteTask(this)">Delete</button>
    `;
  
    
    taskList.appendChild(newTask);
  
    
    saveTasks();
  
    
    taskInput.value = '';
  }
  
  
  function editTask(button) {
    const taskText = button.parentElement.querySelector('span');
    const newText = prompt('Edit task:', taskText.innerText);
  
   
    if (newText !== null) {
      taskText.innerText = newText;
  
     
      saveTasks();
    }
  }
  
 
  function deleteTask(button) {
    const task = button.parentElement;
    const taskList = task.parentElement;
  
    
    taskList.removeChild(task);
  
    
    saveTasks();
  }
  
  
  function saveTasks() {
    const taskList = document.getElementById('taskList');
    const tasks = [];
  
   
    taskList.querySelectorAll('li').forEach(task => {
      const taskText = task.querySelector('span').innerText;
      const isCompleted = task.querySelector('input[type="checkbox"]').checked;
      const dueDate = task.querySelector('input[type="date"]').value;
  
      tasks.push({ text: taskText, completed: isCompleted, dueDate: dueDate });
    });
  
   
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  

  function loadTasks() {
    const taskList = document.getElementById('taskList');
  
    
    const storedTasks = localStorage.getItem('tasks');
  
    
    if (storedTasks) {
      const tasks = JSON.parse(storedTasks);
  
      tasks.forEach(task => {
        const newTask = document.createElement('li');
        newTask.innerHTML = `
          <input type="checkbox" ${task.completed ? 'checked' : ''}>
          <span>${task.text}</span>
          <input type="date" value="${task.dueDate || ''}">
          <button onclick="editTask(this)">Edit</button>
          <button onclick="deleteTask(this)">Delete</button>
        `;
  
        
        taskList.appendChild(newTask);
      });
    }
  }
  
 
  loadTasks();
  