const url = 'http://localhost:8080/api/users'
const usersTable = document.getElementById('data')
const userData = document.getElementById('userDataTable')
const addNewUserButton = document.getElementById('addNewUserBtn')
const home = document.getElementById('home-tab')
const userInfo = document.getElementById('roleUser')

//TOP INFO
fetch(`${url}/principal`).then(
    res=> {
        res.json().then(
            data => {

                    $('#topEmail').text(data.email);
                    $('#topRoles').text(data.roles.map((role) => role.name === "ROLE_USER" ? "USER" : "ADMIN"));
            })
    })


showTable()
//ТАБЛИЦА ЮЕЗРОВ
function showTable() {
    fetch("http://localhost:8080/api/users").then(
        res => {
            res.json().then(
                data => {
                    if (data.length > 0) {
                        let output = "";
                        data.forEach((user) => {
                            output += `
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.name}</td>
                            <td>${user.age}</td>
                            <td>${user.email}</td>
                            <td>${user.roles.map((role) => role.name === "ROLE_USER" ? "USER" : "ADMIN")}</td>
                            <td> <button type="button" id="editBtn" class="btn btn-primary eBtn" data-toggle="modal" data-id="${user.id}">Edit</button> </td>
                            <td> <button type="button" id="deleteBtn" class="btn btn-danger dBtn" data-toggle="modal" data-id="${user.id}">Delete</button> </td>
                        </tr>    
                        `;
                        })
                        usersTable.innerHTML = output;
                    }
                }
            )
        }
    )
    console.log('ETO SHOW TABLE FUNC')
}

//modals on delete & edit buttons
usersTable.addEventListener('click', (e) => {
    e.preventDefault();
    let editButtonIsPressed = e.target.id === 'editBtn';
    let deleteButtonIsPressed = e.target.id === 'deleteBtn';

    //EDIT
    if (editButtonIsPressed) {
        console.log('EDITTTT');
        let id = e.target.dataset.id;

        fetch(`${url}/${id}`, {
            method: 'GET',
        })
            .then(user => user.json())
            .then(user => {
                console.log(user);
                $('#editId').val(user.id);
                $('#editName').val(user.name);
                $('#editPassword').val(user.password);
                $('#editAge').val(user.age);
                $('#editEmail').val(user.email);
            })
        $('#editModal').modal();

    }

    const editSubmitPressed = document.getElementById('submitEdit');

    editSubmitPressed.addEventListener('click', async (e) => {
        console.log('opmmmm')

        let editedUser = {
            id: document.getElementById('editId').value,
            name: document.getElementById('editName').value,
            password: document.getElementById('editPassword').value,
            age: document.getElementById('editAge').value,
            email: document.getElementById('editEmail').value,
            roles: [document.getElementById('editRoles').value]
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


    //DELETE
    if (deleteButtonIsPressed) {
        console.log('delete');
        let id = e.target.dataset.id;

        fetch(`${url}/${id}`, {
            method: 'GET',
        })
            .then(user => user.json())
            .then(user => {
                console.log(user);
                $('#deleteId').val(user.id);
                $('#deleteName').val(user.name);
                $('#deleteAge').val(user.age);
                $('#deleteEmail').val(user.email);
                $('#deleteRoles').val(user.roles.map((role) => role.name === "ROLE_USER" ? "USER" : "ADMIN"));
            })
        $('#deleteModal').modal();
        const deleteSubmitPressed = document.getElementById('submitDelete');

        deleteSubmitPressed.addEventListener('click', async (e) => {
            console.log('del del del')
            await fetch(`${url}/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
            showTable()
        })
    }
})


//ADD NewUser
addNewUserButton.addEventListener('click', async (e) => {

    let newUser = {
        name: document.getElementById('newName').value,
        password: document.getElementById('newPassword').value,
        age: document.getElementById('newAge').value,
        email: document.getElementById('newEmail').value,
        roles: [document.getElementById('newRoles').value]
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

//left UserTab
// userInfo.addEventListener('click', (e) => {
//
//     let out = "";
//     fetch(`${url}/principal`, {
//         method: 'GET',
//     })
//         .then(principal => principal.json())
//         .then(principal => {
//         out += `
//                         <tr>
//                             <td>${principal.id}</td>
//                             <td>${principal.name}</td>
//                             <td>${principal.age}</td>
//                             <td>${principal.email}</td>
//                             <td>${principal.roles.map((role) => role.name === "ROLE_USER" ? "USER" : "ADMIN")}</td>
//                         </tr>
//                         `;
//             userData.innerHTML = out;
//     })
// })

function showPrincipal(idButton, idForm) {
    idButton.addEventListener('click', async (e) => {

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
                console.log('eto function')
                idForm.innerHTML = out;
            })
    })
}

showPrincipal(userInfo, userData)














