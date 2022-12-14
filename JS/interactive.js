let btnCreateTask = document.querySelector(".btn-create-task")
let repositoryTasks = document.querySelector(".repository-tasks")
let input = document.querySelector("#text")
let inputSearch = document.querySelector("#search")

let list

const getItems = () => JSON.parse(localStorage.getItem("listTasks")) ?? []
const setItems = () => localStorage.setItem("listTasks", JSON.stringify(list))

inputSearch.addEventListener("keyup", () => filterTasks())

const filterTasks = () => {
    let filter = inputSearch.value.toUpperCase().trim()
    let allTasks = repositoryTasks.querySelectorAll(".task")
    for (let i = 0; i < allTasks.length; i++){
        let content = allTasks[i].querySelector("p")
        content.innerHTML.toUpperCase().indexOf(filter) !== -1 ? allTasks[i].style.display = "" : allTasks[i].style.display = "none"
    }
}

btnCreateTask.addEventListener("click", () => {
    list.push({text: input.value, check: ""})
    input.value = ""
    input.focus()
    saveTasks()
    loadTasks()
})

const insertTask = (task, index) => {
    let div = document.createElement('div')
    div.className = ("task " + task.check).trim()
    div.innerHTML = `
                    <p>${task.text}</p>
                    <div class='buttons-task'>
                        <button class='btn-task checked' onclick='checkTask(${index})'><i class="fa-sharp fa-solid fa-check"></i></button>
                        <button class='btn-task delete' onclick='deleteTask(${index})'><i class="fa-sharp fa-solid fa-trash"></i></button>
                    </div>`
    repositoryTasks.appendChild(div)
}

function checkTask(index){
    let task = document.querySelectorAll(".task")
    task[index].className === "task" ? list[index].check = "active" : list[index].check = ""
    task[index].classList.toggle("active")
    saveTasks()
}

function deleteTask(index){
    list.splice(index, 1)
    saveTasks()
    loadTasks()
}

const saveTasks = () => setItems()

const loadTasks = () => {
    list = getItems()
    repositoryTasks.innerHTML = ""
    list.forEach((task, index) => insertTask(task, index))
}

loadTasks()