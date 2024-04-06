const apiURL = 'https://jsonplaceholder.typicode.com/todos';

function getTodos() {
         fetch(apiURL+'?_limit=10')
         .then((resp)=>resp.json())
         .then((data)=>{
         data.forEach(todo => {
          todosTODOM(todo);
        });
    });
    
}

function todosTODOM(todo) {
            const todos_ul = document.querySelector('.todos-ul');
            const li = document.createElement('li');
            li.innerHTML=todo.title;
            li.classList.add('li_todo');
            li.classList.add(todo.id);
            todos_ul.appendChild(li);
          
            if (todo.completed) {
                li.classList.add('li_comp');
            }
            // console.log(todo);
};
getTodos();

function createTodos(e){
    e.preventDefault();

    const newTodos = {
        title :e.target.firstElementChild.value,
        completed:false
    }

    fetch(apiURL,{
        method:'POST',
        body:JSON.stringify(newTodos),
        headers:{
            'Content-Type':'application/json',
        }
    }).then((resp) => resp.json()).then((data)=>{
        todosTODOM(data);

    })
        
    
    

}

document.querySelector('.todos-form').addEventListener('submit',createTodos)
document.querySelector('.todos-ul').addEventListener('click',toggleComp);
document.querySelector('.todos-ul').addEventListener('dblclick',delete_todo);



function toggleComp(e) {

    if (e.target.classList.contains('li_todo')) {
        e.target.classList.toggle('li_comp')

        
        updateTodo(e.target.classList[1],e.target.classList.contains('li_comp'));

    }

    
    
}

const updateTodo = (id,completed) =>{
        
fetch(`${apiURL}/${id}`,{
    method:'PUT',
    body:JSON.stringify({completed}),
    headers:{
        'Content-Type':'application/json'
    }
})
// .then((resp)=>resp.json()).then((data)=>{
// console.log(data);
// })
    }


    function delete_todo(e) {
        console.log(e.target.textContent);
        if (e.target.classList.contains('li_todo')) {
            console.log(e.target.classList[1]);
           delete_todo_DOM(e.target.classList[1]);
           e.target.remove();

        }
    }

    function delete_todo_DOM(id) {
        fetch(`${apiURL}/${id}`,{
            method:'DELETE',
    
        }).then((resp)=>resp.json()).then((data)=>console.log(data))
        // e.target.remove()
    }

