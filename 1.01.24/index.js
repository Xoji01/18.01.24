let form = document.forms.create
let cont = document.querySelector('.container')
const spaan = document.querySelector('.top')
const url = 'http://localhost:9000/users'

let todos = []
function fetching() {
    // fetch(url)
    // .then(res => res.json())
    // .then(res => {
    //     reload(res, cont)
    //     todos = res
    // })
    axios.get(url)
        .then(data => {
            todos = data.data
            reload(todos, cont)
        })
}
fetching()

form.onsubmit = (e) => {
    e.preventDefault();

    let fm = new FormData(form)

    let user = { fullName: fm.get('fullName') }

    if (user.fullName === "") return

    fetch(url, {
        method: "post",
        body: JSON.stringify(user)
    })
        .then(res => res.json())
        .then(res => {
            fetching()
        })
}


function reload(arr, place) {

    place.innerHTML = ""

    for (let item of arr) {
        let todo = document.createElement('div')
        let top_div = document.createElement('div')
        let title = document.createElement('span')
        let remove_btn = document.createElement('button')
        let time = document.createElement('span')

        todo.classList.add('todo')
        top_div.classList.add('top')
        title.classList.add('title')

        title.innerHTML = item.fullName
        remove_btn.innerHTML = "x"

        top_div.append(title, remove_btn)
        todo.append(top_div, time)
        place.append(todo)

        remove_btn.ondblclick = () => {
            function fetch() {
                axios.delete(url + "/" + item.id)
                    .then(res => {
                        if (res.status === 200 || res.status === 201) {
                            todo.remove()
                            todos = todos.filter(el => el.id !== item.id)
                        } else {
                            alert('no')
                        }

                    })
                    .finally(() => console.log('ok'))
                //             axios.delete(`${url}/1`).then((data) => {
                //                 console.log(data.data);
                //             }).catch((e)=> console.log(e)).finally(() => console.log('something done'));
                //         }
                // }}
            }
            fetch()
          }

//   const todoItem = document.querySelector('.todo-item');
  // title.addEventListener('dblclick', () => {
  //   const todoId = title.dataset.todoId;

  //   const userInput = prompt('Введите новое значение для todo:');

  //   if (userInput !== null) {
  //     axios.patch(`http://localhost:9000/users${todoId}`, { text: userInput })
  //       .then(response => {
  //         console.log('Todo успешно изменен в бэкенде:', response.data);
  //       })
  //       .catch(error => {
  //         console.error('Ошибка при изменении todo в бэкенде:', error);
  //       });
  //   }
  // });{
          title.ondblclick = () => {
            function fetch () {
            let newtext = prompt('change' + item.fullName)
            fetch(url + "/" + item.id, {
              method:"patch",
              body:JSON.stringify({fullName:newtext}),
              
              headers: {
                "Content-Type": "application/json", 
              }
            })
            .then(res => {
              if(res.status === 200 || res.status === 201) {
                title.textContent = newtext
                todos.find(el => el.id === item.id).fullName = newtext
              }
            })
          }
          


     fetch()     

    }}}