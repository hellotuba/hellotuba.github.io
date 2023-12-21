var data = {
    save: (key, value) => {
        return localStorage.setItem(key, value)
    },
    get: (key) => {
        if(localStorage.getItem(key) == "null" || !localStorage.getItem(key)){
            return null
        }
        return localStorage.getItem(key) || null
    }
}
let i = 0
let _data = JSON.parse(data.get("data") || JSON.stringify({
    todos: [{}]
}))

function deleteTodo(id) {
    _data.todos = _data.todos.filter(e => e.id !== id)
    data.save("data",JSON.stringify(_data))
    document.getElementById("box-id-"+id).remove()
}

function addTodo(text="Null",save=true,_i=i) {
    if(_i==i) _i++
    i++
    if(text=="Null") {
        if(!document.getElementById("todo-text").value) {
            return
        }
        text = document.getElementById("todo-text").value
        document.getElementById("todo-text").value = ""
    }
    document.getElementById("todos").innerHTML += 
        `
        <div class="todo-template" id='box-id-${_i}' onclick='deleteTodo("${_i}")'><div class="todo-box">${text}</div></div>
        `
    if(save) {
        _data.todos.push({
            id:_i.toString(),
            text
        })
        data.save("data",JSON.stringify(_data))
    }


}

function reloadTodos() {
    _data.todos.forEach(e => {
        addTodo(e.text,false, e.id)
    })

}

window.onload = () => {
    reloadTodos()
}


