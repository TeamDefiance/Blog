import {get, post, update, deleteItem} from './requester';

function loadPosts(callback) {
    // Request teams from db
    get('appdata', 'posts', 'kinvey')
        .then(callback);
}

function create(title, content, callback) {
    let postData = {
        title: title,
        content: content
    };
    post('appdata', 'posts', postData, 'kinvey')
        .then(callback);
}

function loadPostDetails(postId, onTeamSuccess) {
    get('appdata', 'posts/' + postId, 'kinvey')
        .then(onTeamSuccess);
}

function deletePost(postId, callback) {
    deleteItem('appdata', 'posts', postId, 'kinvey')
        .then(callback);

}

function edit(teamId, name, description, callback) {
    let teamData = {
        title: name,
        content: description
    };
    update('appdata', 'posts/' + teamId, teamData, 'kinvey')
        .then(callback(true));
}

export {loadPosts, create, loadPostDetails, deletePost, edit}
