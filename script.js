document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("task");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("task-list");

   
    loadTasks();

   
    addTaskButton.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            addTask(taskText);
            saveTasks();
            taskInput.value = "";
        }
    });

   
    function addTask(text) {
        const li = document.createElement("li");
        li.innerHTML = `
            <input type="checkbox">
            <span class="task-text">${text}</span>
            <button class="delete">❌</button>
        `;
        taskList.appendChild(li);

        li.querySelector(".delete").addEventListener("click", function () {
            li.remove();
            saveTasks();
        });

      
        li.querySelector("input").addEventListener("change", saveTasks);
    }

   
    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll("li").forEach(li => {
            tasks.push({
                text: li.querySelector(".task-text").textContent,
                completed: li.querySelector("input").checked
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        savedTasks.forEach(task => {
            addTask(task.text);
            taskList.lastChild.querySelector("input").checked = task.completed;
        });
    }
});
