import React, {Component} from 'react';
import {loadPostDetails} from '../../models/post';
import PostControls from './TeamControls';
import './Details.css';

export default class Details extends Component {
    constructor(props) {
        super(props);
        this.state ={
            title: '',
            content: '',
            canEdit: false
        };

        this.bindEventHandlers();
    }

    bindEventHandlers() {
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
            content: response.content
        };
        if (response._acl.creator === sessionStorage.getItem('userId')) {
            newState.canEdit = true;
        }
        this.setState(newState);
    }

    render() {

        return (
            <div className="details-box">
                <span className="titlebar">{this.state.title}</span>
                <p>{this.state.content}</p>
                <PostControls
                    postId={this.props.params.postId}
                    canEdit={this.state.canEdit}
                />
            </div>
        )
    }
}

Details.contextTypes = {
    router: React.PropTypes.object
};