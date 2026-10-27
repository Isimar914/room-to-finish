console.log("JavaScript is connected!");
const taskNameInput = document.querySelector("#task-name");
const addtaskButton = document.querySelector(".task-form button");
const taskList = document.querySelector("#task-list");
const taskEstimateInput = document.querySelector("#task-estimate");

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

    taskItem.textContent = taskName + " - " + estimateText;

    addDeleteButton(taskItem);
    taskList.appendChild(taskItem);
    saveTasks();

    taskNameInput.value = "";
})

function saveTasks() {

    let tasks = [];
    taskList.querySelectorAll("li").forEach(function(item) {
        tasks.push(item.textContent.replace("Delete", "").trim());
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(function (taskName) {
    const taskItem = document.createElement("li");
    taskItem.textContent = taskName;
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