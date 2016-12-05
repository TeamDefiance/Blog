// eslint-disable-next-line
import {get, post, update} from './requester';
import {joinTeam} from './user';

function loadTeams(callback) {
    // Request teams from db
    get('appdata', 'teams', 'kinvey')
        .then(callback);
}

function loadPostDetails(postId, onTeamSuccess) {
    get('appdata', 'posts/' + postId, 'kinvey')
        .then(onTeamSuccess);
}

function loadUsersDetails(teamId, onUsersSuccess) {
    get('user', `?query={"teamId": "${teamId}"}`, 'kinvey')
        .then(onUsersSuccess);
}

function edit(teamId, name, description, callback) {
    let teamData = {
        title: name,
        content: description
    };
    update('appdata', 'posts/' + teamId, teamData, 'kinvey')
        .then(callback(true));
}

function create(name, description, callback) {
    let teamData = {
        name: name,
        comment: description
    };
    post('appdata', 'teams', teamData, 'kinvey')
        .then((response) => {
            joinTeam(response._id, callback);
        });
}

export {loadTeams, loadPostDetails, loadUsersDetails, edit, create};