function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const taskList = document.getElementById("taskList");
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${taskText}</span>
            <button onclick="removeTask(this)">Delete</button>
        `;
        taskList.appendChild(li);

        taskInput.value = "";
        saveTasksToLocalStorage();
    }
}

function removeTask(button) {
    const li = button.parentElement;
    li.remove();
    saveTasksToLocalStorage();
}

function saveTasksToLocalStorage() {
    const tasks = [];
    const taskList = document.getElementById("taskList").querySelectorAll("li");
    
    taskList.forEach((li) => {
        tasks.push(li.querySelector("span").textContent);
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from local storage on page load
document.addEventListener("DOMContentLoaded", () => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    const taskList = document.getElementById("taskList");

    if (savedTasks) {
        savedTasks.forEach((taskText) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${taskText}</span>
                <button onclick="removeTask(this)">Delete</button>
            `;
            taskList.appendChild(li);
        });
    }
});