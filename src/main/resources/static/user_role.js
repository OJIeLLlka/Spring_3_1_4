const userInfo = document.getElementById('RoleUserInfo')
const url = 'http://localhost:8080/api/users'
let outUser = "";



//TOP INFO
fetch(`${url}/principal`).then(
    res=> {
        res.json().then(
            data => {

                $('#topEmail').text(data.email);
                $('#topRoles').text(data.roles.map((role) => role.name === "ROLE_USER" ? "USER" : "ADMIN"));
            })
    })

// User info
fetch(`${url}/principal`).then(
    res=> {
        res.json().then(
            data => {
                outUser += `
                        <tr>
                            <td>${data.id}</td>
                            <td>${data.name}</td>
                            <td>${data.age}</td>
                            <td>${data.email}</td>
                            <td>${data.roles.map((role) => role.name === "ROLE_USER" ? "USER" : "ADMIN")}</td>                            
                        </tr>    
                        `;
                userInfo.innerHTML = outUser;
            })
    });