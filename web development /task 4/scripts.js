// Select elements
const todoForm = document.getElementById("todo-form");
const taskList = document.getElementById("task-list");

// Task array to store tasks
let tasks = [];

// Add Task Function
todoForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const datetime = document.getElementById("datetime").value;

    const task = {
        id: Date.now(),
        title,
        description,
        datetime,
        completed: false,
    };

    tasks.push(task);
    displayTasks();

    todoForm.reset(); // Reset the form after adding
});

// Display Tasks Function
function displayTasks() {
    taskList.innerHTML = ""; // Clear current list

    tasks.forEach((task) => {
        const li = document.createElement("li");
        li.className = "task";

        const taskInfo = document.createElement("div");
        taskInfo.className = "task-info";

        const taskTitle = document.createElement("h3");
        taskTitle.textContent = task.title;

        const taskDescription = document.createElement("p");
        taskDescription.textContent = task.description || "No Description";

        const taskDateTime = document.createElement("p");
        taskDateTime.textContent = new Date(task.datetime).toLocaleString();

        taskInfo.append(taskTitle, taskDescription, taskDateTime);

        // Create action buttons
        const actions = document.createElement("div");
        actions.className = "actions";

        const completeBtn = document.createElement("button");
        completeBtn.className = "complete-btn";
        completeBtn.textContent = task.completed ? "Undo" : "Complete";
        completeBtn.addEventListener("click", function () {
            toggleComplete(task.id);
        });

        const editBtn = document.createElement("button");
        editBtn.className = "edit-btn";
        editBtn.textContent = "Edit";
        editBtn.addEventListener("click", function () {
            editTask(task.id);
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", function () {
            deleteTask(task.id);
        });

        actions.append(completeBtn, editBtn, deleteBtn);
        li.append(taskInfo, actions);

        if (task.completed) {
            li.classList.add("completed");
        }

        taskList.appendChild(li);
    });
}

// Toggle Complete Function
function toggleComplete(id) {
    tasks = tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    displayTasks();
}

// Edit Task Function
function editTask(id) {
    const task = tasks.find((task) => task.id === id);
    document.getElementById("title").value = task.title;
    document.getElementById("description").value = task.description;
    document.getElementById("datetime").value = task.datetime;

    deleteTask(id); // Remove the task to avoid duplicates while editing
}

// Delete Task Function
function deleteTask(id) {
    tasks = tasks.filter((task) => task.id !== id);
    displayTasks();
}
