const $ = element => document.querySelector(element) || undefined;
const $all = element => document.querySelectorAll(element) || [];
const create = element => document.createElement(element);

let todos = JSON.parse(localStorage.getItem("todos")); // empty todos by default

// if nothing in local storage, show this
if(todos === null) {
    todos = [];
    localStorage.setItem("todos", JSON.stringify(todos));
    $(".todo-items").innerHTML = `<p class="empty">No todos yet. <p/>`;
} else {
    todos.forEach(item => updateUI(item));
}

const input = $(".todo-input");

input.addEventListener("keyup", e => {
    if(e.key === 'Enter') {
        // upadate locale storage with value
        updateListStore(e.target.value);
        // $(".empty").style.display = "none";
        // upadte ui
        updateUI(e.target.value);

        // reset input field
        e.target.value = "";
        e.target.focus();
    }
})

const todoCheckboxes = $all(".check");

todoCheckboxes.forEach(element => {
    element.addEventListener("click", (e) => {
        // TODO: change this to work for delete buttons
        // or when todo is swiped out of the page.
        deleteTodo(element.parentElement);
    })
})

function deleteTodo(todo) {
    const todoContent = todo.querySelector("p").textContent;

    // const allTodos = JSON.parse(localStorage.getItem("todos"));
    // find the value in local storage
    // console.log(todos);
    const index = todos.indexOf(todoContent)

    todos = todos.filter(el => el !== todoContent);

    localStorage.setItem("todos", JSON.stringify(todos));

    setTimeout((el) => {
        el.style.display = "none";
        if(todos.length === 0) {
            $(".todo-items").innerHTML = `<p class="empty">No todos yet. <p/>`;
        }
    }, 300, todo);
}

// update the todos in local storage
function updateListStore(value) {

    // get todos from local storage as json
    todos = JSON.parse(localStorage.getItem("todos"));

    // add the new value to the todo
    todos.push(value);
    // store it back to the local store
    localStorage.setItem("todos", JSON.stringify(todos));
}

// update the UI by showing the newly added todo item
function updateUI(item) {
    const li = create('li');
    li.classList.add("todo-item");

    li.innerHTML = `
    <input type="checkbox" class="check">
    <p>${item}</p>`;

    const isEmpty = JSON.parse(localStorage.getItem("todos")).length === 0;
    if(isEmpty) {
        $(".todo-items").innerHTML = "";
        try {
            $(".empty").display = "none";
        } catch {
            
        }
    }

    $(".todo-items").appendChild(li);
    const check = li.querySelector(".check");

    check.addEventListener("click", (e) => {
        deleteTodo(check.parentElement);
    });
}
