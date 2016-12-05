import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Post extends Component {
    render() {
        return(
            <div className="post">
                    <span className="title">{this.props.title}</span>
                    <p>{this.props.content}</p>
                <Link to={"/posts/" + this.props.id} className="post-box"><button className="btn btn-default">Details</button></Link>
            </div>
        )
    }
}