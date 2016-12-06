import * as requester from './requester';
import observer from './observer';


function saveSession(userInfo) {
    let userAuth = userInfo._kmd.authtoken;
    sessionStorage.setItem('authToken', userAuth);
    let userId = userInfo._id;
    sessionStorage.setItem('userId', userId);
    let username = userInfo.username;
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('teamId', userInfo.teamId);

    observer.onSessionUpdate();
}

// user/login
function login(username, password, callback) {
    let userData = {
        username,
        password
    };

    requester.post('user', 'login', userData, 'basic')
        .then(loginSuccess);

    function loginSuccess(userInfo) {
        saveSession(userInfo);
        callback(true);
    }
}

// user/register
function register(username, password, fullName, email, phone, callback) {
    let userData = {
        username,
        password
    };

    requester.post('user', '', userData, 'basic')
        .then(registerSuccessUsers);

    function registerSuccessUsers(userInfo) {
        saveSession(userInfo);
        let user_id = userInfo._id;
        let authorData = {
            user_id,
            fullName,
            email,
            phone
        };

        requester.post('appdata', 'authors', authorData, 'kinvey')
            .then(registerSuccess);

        function registerSuccess(userInfo) {
            observer.showSuccess('Successful registration.');
            callback(true);
        }
    }
}

// user/logout
function logout(callback) {
    requester.post('user', '_logout', null, 'kinvey')
        .then(logoutSuccess);


    function logoutSuccess(response) {
        sessionStorage.clear();
        observer.onSessionUpdate();
        callback(true);
    }
}

function joinTeam(teamId, callback) {
    let userData = {
        username: sessionStorage.getItem('username'),
        teamId: teamId
    };
    requester.update('user', sessionStorage.getItem('userId'), userData, 'kinvey')
        .then((response) => {
            saveSession(response);
            observer.onSessionUpdate();
            callback(true);
        });
}

function leaveTeam(callback) {
    let userData = {
        username: sessionStorage.getItem('username'),
        teamId: ''
    };
    requester.update('user', sessionStorage.getItem('userId'), userData, 'kinvey')
        .then((response) => {
            saveSession(response);
            observer.onSessionUpdate();
            callback(true);
        });
}

export {login, register, logout, joinTeam, leaveTeam};