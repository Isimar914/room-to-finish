console.log("JavaScript is connected!");
const taskNameInput = document.querySelector("#task-name");
const addtaskButton = document.querySelector(".task-form button");
const taskList = document.querySelector("#task-list");
const taskEstimateInput = document.querySelector("#task-estimate");
const taskPriorityInput = document.querySelector("#task-priority");
const taskDueDateInput = document.querySelector("#task-due");

addtaskButton.addEventListener("click", function () {
    const taskName = taskNameInput.value.trim();

    if (taskName === "") {
        return;
    }

    console.log(taskEstimateInput.value);

    const taskItem = document.createElement("li");

    const estimate = taskEstimateInput.value;
    let estimateText;

    if (estimate === "0.5") {
        estimateText = "30 minutes";
    } else if (estimate === "1") {
        estimateText = "1 hour";
    } else if (estimate === "") {
        estimateText = "Not sure yet";
    } else {
        estimateText = estimate + " hours";
    }

    const priority = taskPriorityInput.value;
    let priorityText;

    if (priority === "1") {
        priorityText = "Low";
    } else if (priority === "2") {
        priorityText = "Medium";
    }else if (priority === "3") {
        priorityText = "High";
    } else {
        priorityText = "No priority";
    }

    const due_date = taskDueDateInput.value;
    let date;

    if (due_date === "") {
        date = "No due date";
    } else {
        date = due_date;
    }

    const nameElement = document.createElement("span");
    nameElement.className = "task-name";
    nameElement.textContent = taskName;
    taskItem.appendChild(nameElement);

    const estimateElement = document.createElement("span");
    estimateElement.className = "task-estimate";
    estimateElement.textContent = estimateText;
    taskItem.appendChild(estimateElement);

    const priorityElement = document.createElement("span");
    priorityElement.className = "task-priority";
    priorityElement.textContent = priorityText;
    taskItem.appendChild(priorityElement);

    const dateElement = document.createElement("span");
    dateElement.className = "task-due";
    dateElement.textContent = date;
    taskItem.appendChild(dateElement);

    addDeleteButton(taskItem);
    taskList.appendChild(taskItem);
    saveTasks();

    taskNameInput.value = "";
});

function saveTasks() {

    let tasks = [];
    taskList.querySelectorAll("li").forEach(function(item) {
        const task = {
            name: item.querySelector(".task-name").textContent,
            estimate: item.querySelector(".task-estimate").textContent,
            priority: item.querySelector(".task-priority").textContent,
            dueDate: item.querySelector(".task-due").textContent
        };
        tasks.push(task);
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(function (task) {
    const taskItem = document.createElement("li");

    const nameElement = document.createElement("span");
    nameElement.className = "task-name";
    nameElement.textContent = task.name;
    taskItem.appendChild(nameElement);

    const estimateElement = document.createElement("span");
    estimateElement.className = "task-estimate";
    estimateElement.textContent = task.estimate;
    taskItem.appendChild(estimateElement);

    const priorityElement = document.createElement("span");
    priorityElement.className = "task-priority";
    priorityElement.textContent = task.priority;
    taskItem.appendChild(priorityElement);

    const dateElement = document.createElement("span");
    dateElement.className = "task-due";
    dateElement.textContent = task.dueDate;
    taskItem.appendChild(dateElement);

    addDeleteButton(taskItem);
    taskList.appendChild(taskItem);
    });
}

loadTasks();

function addDeleteButton(taskItem) {
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.className = "deleteTask";

    deleteButton.addEventListener("click", function(){
        taskItem.remove();
        saveTasks();
    });

    taskItem.appendChild(deleteButton);
}