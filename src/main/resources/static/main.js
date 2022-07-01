const url = 'http://localhost:8080/api/users'
const usersTable = document.querySelector('.data')
const userData = document.getElementById('userDataTable')
const addNewUserButton = document.getElementById('addNewUserBtn')
const home = document.getElementById('home-tab')
const userInfo = document.getElementById('roleUser')
const editRoles = document.getElementById('editRoles')
const newRoles = document.getElementById('newRoles')


//TOP INFO
fetch(`${url}/principal`).then(
    res=> {
        res.json().then(
            data => {

                    $('#topEmail').text(data.email);
                    $('#topRoles').text(data.roles.map((role) => role.name === "ROLE_USER" ? "USER" : "ADMIN"));
            })
    })


//ТАБЛИЦА ЮЕЗРОВ
function showTable() {
    fetch("http://localhost:8080/api/users").then(
        res => {
            res.json().then(
                data => {
                    if (data.length > 0) {
                        let output = '';
                        data.forEach((user) => {
                            output += `
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.name}</td>
                            <td>${user.age}</td>
                            <td>${user.email}</td>
                            <td>${user.roles.map((role) => role.name === "ROLE_USER" ? "USER" : "ADMIN")}</td>
                            <td> <button type="button" onclick="showEditUser(${user.id})" id="editBtn" class="btn btn-primary eBtn" data-toggle="modal"  data-target="#editModal">Edit</button> </td>
                            <td> <button type="button" onclick="showDeleteUser(${user.id})" id="deleteBtn" class="btn btn-danger dBtn" data-toggle="modal" data-target="#deleteModal">Delete</button> </td>
                        </tr>    
                        `;
                        })
                        usersTable.innerHTML = output;
                    }
                }
            )
        }
    )
    console.log('show table func')
}

showTable()

//show edit
function showEditUser(id) {
    console.log('NEW EDIT')

    fetch(`${url}/${id}`, {
        method: 'GET',
    })
        .then(user => user.json())
        .then(user => {
            $('#editId').val(user.id);
            $('#editName').val(user.name);
            $('#editPassword').val(user.password);
            $('#editAge').val(user.age);
            $('#editEmail').val(user.email);
        })
}

//edit
const editSubmitPressed = document.getElementById('submitEdit');          //кнопка в модалке
editSubmitPressed.addEventListener('click', async (e) => {
    e.preventDefault()
    console.log('edit')

    let editedUser = {
        id: document.getElementById('editId').value,
        name: document.getElementById('editName').value,
        password: document.getElementById('editPassword').value,
        age: document.getElementById('editAge').value,
        email: document.getElementById('editEmail').value,
        roles: Array.from(editRoles.selectedOptions)
            .map(option => option.value)
    };

    await fetch(`${url}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(editedUser)
    });
    showTable();
})

// show delete
let currentUserId;
async function showDeleteUser(id) {
    currentUserId = id

    fetch(`${url}/${currentUserId}`, {
        method: 'GET',
    })
        .then(user => user.json())
        .then(user => {
            $('#deleteId').val(user.id);
            $('#deleteName').val(user.name);
            $('#deleteAge').val(user.age);
            $('#deleteEmail').val(user.email);
            $('#deleteRoles').val(user.roles.map((role) => role.name === "ROLE_USER" ? "USER" : "ADMIN"));
        })
}

//delete
const deleteSubmitPressed = document.getElementById('submitDelete'); //кнопка в модалке
deleteSubmitPressed.addEventListener('click', (e) => {
    e.preventDefault()

    console.log("deleteSubmit")
    fetch(`${url}/${currentUserId}`, {
        method: 'DELETE'
    }).then(() => {
        showTable()
    })
})

//ADD NewUser
addNewUserButton.addEventListener('click', async (e) => {

    let newUser = {
        name: document.getElementById('newName').value,
        password: document.getElementById('newPassword').value,
        age: document.getElementById('newAge').value,
        email: document.getElementById('newEmail').value,
        roles: Array.from(newRoles.selectedOptions)
            .map(option => option.value)
    };

    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(newUser)
    });
    showTable()
    home.click();
})


function showPrincipal(idButton, idForm) {
    idButton.addEventListener('click', (e) => {
        e.preventDefault()
        let out = "";
        fetch(`${url}/principal`, {
            method: 'GET',
        })
            .then(principal => principal.json())
            .then(principal => {
                out += `
                        <tr>
                            <td>${principal.id}</td>
                            <td>${principal.name}</td>
                            <td>${principal.age}</td>
                            <td>${principal.email}</td>
                            <td>${principal.roles.map((role) => role.name === "ROLE_USER" ? "USER" : "ADMIN")}</td>                            
                        </tr>    
                        `;
                console.log('eto show user-principal function')
                idForm.innerHTML = out;
            })
    })
}

showPrincipal(userInfo, userData)














