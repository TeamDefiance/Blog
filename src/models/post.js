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

function edit(postId, name, description, callback) {
    let teamData = {
        title: name,
        content: description
    };
    update('appdata', 'posts/' + postId, teamData, 'kinvey')
        .then(callback(true));
}

function loadAuthorsDetails(userId, onAuthorsSuccess) {
    get('appdata', `authors?query={"user_id":"${userId}"}`, 'kinvey')
        .then(onAuthorsSuccess);
}

export {loadPosts, create, loadPostDetails, deletePost, edit, loadAuthorsDetails}
