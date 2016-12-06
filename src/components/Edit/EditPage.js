import React, {Component} from 'react';
import EditForm from './EditForm';
import {loadPostDetails, edit} from '../../models/post';

export default class EditPage extends Component {
    constructor(props) {
        super(props);
        this.state = {title: '', content: '', submitDisabled: true};
        this.bindEventHandlers();
    }

    componentDidMount() {
        // Populate form
        loadPostDetails(this.props.params.postId, this.onLoadSuccess);
    }

    bindEventHandlers() {
        // Make sure event handlers have the correct context
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onSubmitResponse = this.onSubmitResponse.bind(this);
        this.onLoadSuccess = this.onLoadSuccess.bind(this);
    }

    onLoadSuccess(response) {
        this.setState({
            title: response.title,
            content: response.content,
            submitDisabled: false
        });
    }

    onChangeHandler(event) {
        event.preventDefault();
        let newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    }

    onSubmitHandler(event) {
        event.preventDefault();
        this.setState({submitDisabled: true});
        edit(this.props.params.postId, this.state.title, this.state.content, this.onSubmitResponse);
    }

    onSubmitResponse(response) {
        if (response === true) {
            // Navigate away from login page
            this.context.router.push('/posts');
        } else {
            // Something went wrong, let the user try again
            this.setState({submitDisabled: true});
        }
    }

    render() {
        return (
            <div>
                <h1>Edit Post</h1>
                <EditForm
                    title={this.state.title}
                    content={this.state.content}
                    submitDisabled={this.state.submitDisabled}
                    onChangeHandler={this.onChangeHandler}
                    onSubmitHandler={this.onSubmitHandler}
                />
            </div>
        );
    }
}

EditPage.contextTypes = {
    router: React.PropTypes.object
};