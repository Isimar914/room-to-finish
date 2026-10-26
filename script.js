console.log("JavaScript is connected!");
const taskNameInput = document.querySelector("#task-name");
const addtaskButton = document.querySelector(".task-form button");
const taskList = document.querySelector("#task-list");

addtaskButton.addEventListener("click", function () {
    const taskName = taskNameInput.value.trim();

    if (taskName === "") {
        return;
    }

    const taskItem = document.createElement("li");
    taskItem.textContent = taskName;
    taskList.appendChild(taskItem);

    taskNameInput.value = "";
})