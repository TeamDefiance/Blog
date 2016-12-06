import {get, post, update, deleteItem} from './requester';

function addComment(postId, text, author, callback) {
    let commentData = {
        text: text,
        author: author,
        postId: postId
    };

    post('appdata', 'comments', commentData, 'kinvey')
        .then(callback);
}

export {addComment}