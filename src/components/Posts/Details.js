import React, {Component} from 'react';
import {loadPostDetails} from '../../models/post';
import PostControls from './PostControls';
import './Details.css';
import CommentBox from '../Comments/CommentBox';
import {addComment} from '../../models/comment';

export default class Details extends Component {
    constructor(props) {
        super(props);
        this.state ={
            text: '',
            title: '',
            content: '',
            author: '',
            canEdit: false
        };
        sessionStorage.setItem("canEdit",false);
        this.bindEventHandlers();
    }

    bindEventHandlers() {
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onCommentSubmitHandler = this.onCommentSubmitHandler.bind(this);
        this.onLoadSuccess = this.onLoadSuccess.bind(this);
        this.statusChange = this.statusChange.bind(this);
    }

    statusChange(response) {
        this.context.router.push('/');
    }

    componentDidMount() {
        loadPostDetails(this.props.params.postId, this.onLoadSuccess);
    }

    onLoadSuccess(response) {
        let newState = {
            title: response.title,
            content: response.content,
            author: response._acl.creator
        };
        if (response._acl.creator === sessionStorage.getItem('userId')) {
            newState.canEdit = true;

        }
        this.setState(newState);
    }

    onChangeHandler(event) {
        event.preventDefault();
        let newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    }

    onCommentSubmitHandler(event) {
        event.preventDefault();
        addComment(this.props.params.postId, this.state.text, sessionStorage.getItem('username'), () => this.context.router.push('/posts/' + this.props.params.postId));
        this.setState({text: ''});
    }


    render() {

        return (
            <div className="details-box">
                <span className="titlebar">{this.state.title}</span>
                <p>{this.state.content}</p>
                <PostControls
                    postId={this.props.params.postId}
                    canEdit={this.state.canEdit}
                    author={this.state.author}
                />
                <CommentBox
                    text={this.state.text}
                    onChangeHandler={this.onChangeHandler}
                    onCommentSubmitHandler={this.onCommentSubmitHandler}
                />
            </div>
        )
    }
}

Details.contextTypes = {
    router: React.PropTypes.object
};