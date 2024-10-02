let tasks = []

const task = {
    id: 0,
    title: "",
    description: "",
    priority: "",
    status: "To do"
}

const newTaskTitleInput = document.getElementById("task_title")
newTaskTitleInput.addEventListener("input", (e) => {
    task.title = e.currentTarget.value
})

const newTaskDescriptionInput = document.getElementById("task_description")
newTaskDescriptionInput.addEventListener("input", (e) => {
    task.description = e.currentTarget.value
})

const newTaskPriorityInput = document.getElementById("task_priority")
newTaskPriorityInput.addEventListener("input", (e) => {
    task.priority = e.currentTarget.value
})

function resetTaskForm () {
    task.title = ""
    task.description = ""
    task.priority = ""
    newTaskTitleInput.value = ""
    newTaskDescriptionInput.value = ""
    newTaskPriorityInput.value = ""
}

function addTask (task) {
    const tasksContainer = document.getElementById("tasksContainer")
    const newTask = document.createElement("div")
    const taskId = `task${Math.floor(Math.random()*10000)}`
    const newTaskTitle = document.createElement("span")
    const newTaskDescription = document.createElement("span")
    const newTaskPriority = document.createElement("span")
    const newTaskStatus = document.createElement("p")

    const newTaskTitleContent = document.createTextNode(task.title)
    const newTaskDescriptionContent = document.createTextNode(task.description)
    const newTaskPriorityContent = document.createTextNode(task.priority)
    const newTaskStatusContent = document.createTextNode(task.status)

    const startTaskButton = document.createElement("button")
    const completeTaskButton = document.createElement("button")
    const deleteTaskButton = document.createElement("button")

    startTaskButton.textContent = "Start"
    completeTaskButton.textContent = "Complete"
    deleteTaskButton.textContent = "Delete"

    completeTaskButton.addEventListener("click", (e) => {
        const task_id = e.target.parentNode.attributes.task_id.value
        let currentTask = tasks.filter((task) => task.id == task_id)[0]
        completeTask(currentTask).then((task) => {
            const taskElement = document.querySelector(`[task_id="${task.id}"]`);
            const statusTaskElement = taskElement.querySelector("p")
            statusTaskElement.innerHTML = task.status
            statusTaskElement.classList.add("completed")
        }).catch((e) => {
            console.log(e)
        })
    })

    newTaskTitle.appendChild(newTaskTitleContent)
    newTaskDescription.appendChild(newTaskDescriptionContent)
    newTaskPriority.appendChild(newTaskPriorityContent)
    newTaskStatus.appendChild(newTaskStatusContent)

    newTask.setAttribute("task_id", taskId)
    newTask.appendChild(newTaskTitle)
    newTask.appendChild(newTaskDescription)
    newTask.appendChild(newTaskPriority)
    newTask.appendChild(newTaskStatus)
    newTask.appendChild(startTaskButton)
    newTask.appendChild(completeTaskButton)
    newTask.appendChild(deleteTaskButton)

    tasksContainer.appendChild(newTask)
    
    tasks = [...tasks, {
        id: taskId,
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status
    }]

    resetTaskForm()
}

const newTaskButton = document.getElementById("newTaskButton")

newTaskButton.addEventListener("click", () => {
    addTask(task)
})

function completeTask (task) {
    return new Promise ((resolve, reject) => {
        task.status = "completed"

        if (!("Notification" in window)) {
            alert("This browser does not support desktop notification");
          } else if (Notification.permission === "granted") {
            const notification = new Notification(`Well done for finishing ${task.title}`);
          } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then((permission) => {
              if (permission === "granted") {
                const notification = new Notification(`Well done for finishing ${task.title}`);
              }
            });
        }

        resolve(task)
        reject('error occured')
    })
}

