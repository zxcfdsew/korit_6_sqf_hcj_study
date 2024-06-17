// inputMode = 1 > 추가
// inputMode = 2 > 수정
let inputMode = 1;

const initTable = localStorage.getItem("userList");

let userList = !initTable ? [] : JSON.parse(initTable);

renderTable();

// 일관성과 초기값을 지정하기 편하게 하기 위해 사용
let emptyUser = {
    id: 0,
    name: "",
    username: "",
    password: ""
};

let user = {
    ...emptyUser
}

function renderTable() {
    const userTableBody = document.querySelector(".user-table-body");
    console.log(userList);
    userTableBody.innerHTML = userList.map(({id, username, name, password}, index) => {
        return `
            <tr>
                <th><input type="checkbox" onchange="handleUserCheck(event)"></th>
                <td>${index + 1}</td>
                <td>${id}</td>
                <td>${name}</td>
                <td>${username}</td>
                <td>${password}</td>
                <th><button onclick="deleteUser(event)" value="${id}">삭제</button></th>
            </tr>
        `;
    }).join("");  // list형태로 되어 있어서 ,를 없애기 위해 join함수를 사용
}

function handleUserInputKeyDown(e) {
    user = {
        ...user,
        [e.target.name]: e.target.value
    }

    console.log(user);

    if(e.keyCode === 13) {
        const nameInput = document.querySelector(".name-input");
        const usernameInput = document.querySelector(".username-input");
        const passwordInput = document.querySelector(".password-input");

        if(e.target.name === "name") {
            usernameInput.focus();
        }

        if(e.target.name === "username") {
            passwordInput.focus();
        }

        if(e.target.name === "password") {
            userList = [ ...userList, { ...user, id: getNewId() } ];
            renderTable();
            nameInput.value = emptyUser.name;
            usernameInput.value = emptyUser.username;
            passwordInput.value = emptyUser.password;
            saveUserList();
            nameInput.focus();
        }
    }
    console.log(e.target.name);
}

function saveUserList() {
    localStorage.setItem("userList", JSON.stringify(userList));
}

function deleteUser(e) {
    userList = userList.filter(({id}) => id !== parseInt(e.target.value));  // index타입은 Number, e.target.value는 String
    saveUserList();
    renderTable();
}

function getNewId() {
    const userIds = userList.map(user => user.id);
    const maxUserId = userIds.length === 0 ? 20240000 : Math.max.apply(null, userIds);
    return maxUserId + 1;
}

function handleUserCheck(e) {
    console.log(e.target.checked);
}