import {get, post, update} from './requester';

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

export {loadPosts, create, loadPostDetails}
