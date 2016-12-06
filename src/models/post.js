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

function loadPostDetails(postId, onPostSuccess) {
    get('appdata', 'posts/' + postId, 'kinvey')
        .then(onPostSuccess);
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

function loadUsersDetails(postId, onUsersSuccess) {
    get('user', `?query={"postId": "${postId}"}`, 'kinvey')
        .then(onUsersSuccess);
}

export {loadPosts, create, loadPostDetails, deletePost, edit, loadUsersDetails}
