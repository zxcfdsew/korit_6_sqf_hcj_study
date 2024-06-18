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
    userTableBody.innerHTML = userList.map(({id, username, name, password}, index) => {
        return `
            <tr>
                <th><input type="checkbox" onchange="handleUserCheck(event)" value="${id}"></th>
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
            if(inputMode === 1) {
                userList = [ ...userList, { ...user, id: getNewId() } ];
            }

            if(inputMode === 2) {
                let findIndex = -1;
                for(let i = 0; i < userList.length; i++) {
                    if(userList[i].id === user.id) {
                        findIndex = i;
                        break;
                    }
                }
                if(findIndex === -1) {
                    alert("사용자 정보 수정 중 오류 발생. 관리자에게 문의하세요.");
                    return;
                }
                userList[findIndex] = user;
            }

            saveUserList();
            renderTable();
            clearInputValue();

            nameInput.focus();
        }
    }
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
    const checkBoxList = document.querySelectorAll("input[type='checkbox']");
    for(let checkBox of checkBoxList) {
        if(checkBox === e.target) {
            continue;
        }
        checkBox.checked = false;
    }

    if(e.target.checked) {
        inputMode = 2;
        const [ findUser ] = userList.filter(user => user.id === parseInt(e.target.value));
        setInputValue(findUser);
        user = {
            ...findUser
        }
        return;
    }

    clearInputValue();
}

function setInputValue(user) {
    const nameInput = document.querySelector(".name-input");
    const usernameInput = document.querySelector(".username-input");
    const passwordInput = document.querySelector(".password-input");

    nameInput.value = user.name;
    usernameInput.value = user.username;
    passwordInput.value = user.password;
}

function clearInputValue() {
    const nameInput = document.querySelector(".name-input");
    const usernameInput = document.querySelector(".username-input");
    const passwordInput = document.querySelector(".password-input");
    nameInput.value = emptyUser.name;
    usernameInput.value = emptyUser.username;
    passwordInput.value = emptyUser.password;

    inputMode = 1;
    user = {
        ...emptyUser
    }
}

// function handleUserCheck(e) {
//     const checkboxs = document.querySelectorAll("input[type='checkbox']");
//     let user = "";
//     for (let i = 0; i < checkboxs.length; i++) {
//         if (e.target !== checkboxs[i]) {
//            checkboxs[i].checked = false;
//         } else {
//             user = userList.filter(({id}) => parseInt(checkboxs[i].value) === id)[0];
//         }
//     }

//     const nameInput = document.querySelector(".name-input");
//     const usernameInput = document.querySelector(".username-input");
//     const passwordInput = document.querySelector(".password-input");

//     nameInput.value = user.name;
//     usernameInput.value = user.name;
//     passwordInput.value = user.password;

//     console.log(user);
// }