import React, {Component} from 'react';
import Post from './Post';
import {loadPosts} from '../../models/post';

export default class PostsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
        this.bindEventHandlers();
    }

    bindEventHandlers() {
        this.onLoadSuccess = this.onLoadSuccess.bind(this);
    }

    onLoadSuccess(response) {
        // Display teams
        this.setState({posts: response})
    }

    componentDidMount() {
        // Request list of teams from the server
        loadPosts(this.onLoadSuccess);
    }

    render() {

        return (
            <div>
                <h1>Posts</h1>
                <div>
                    {this.state.posts.map((e, i) => {
                        return <Post key={i} title={e.title} id={e._id} content={e.content}/>
                    })}
                </div>
            </div>
        );
    }
}