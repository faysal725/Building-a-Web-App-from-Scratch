const input = document.querySelector("#taskInput");
const button = document.querySelector("#addButton");
const list = document.querySelector("#taskList");

const savedTasks = localStorage.getItem("tasks");
const tasks = savedTasks ? JSON.parse(savedTasks) : [];
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function renderTasks() {
    list.innerHTML = "";

    for (const task of tasks) {
        const item = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        if (task.completed) {
            item.classList.add("completed");
        }

        checkbox.addEventListener("change", function () {
            task.completed = checkbox.checked;
            saveTasks();
            renderTasks();
        });

        const title = document.createElement("span");
        title.textContent = task.title;

        item.appendChild(checkbox);
        item.appendChild(title);

        list.appendChild(item);
    }
}






button.addEventListener("click", function () {
    const title = input.value.trim();

    if (title === "") {
        return;
    }

    const newTask = {
        id: crypto.randomUUID(),
        title: title,
        completed: false
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks();

    input.value = "";
})

renderTasks();

