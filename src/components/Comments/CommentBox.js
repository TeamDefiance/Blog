import React, {Component} from 'react';

export default class CommentBox extends Component {
    render(){
        return <form onSubmit={this.props.onCommentSubmitHandler}>
            <div className="form-group">
                <label>Comment text:</label>
                <textarea name="text"
                          value={this.props.text}
                          onChange={this.props.onChangeHandler}
                            rows="6"></textarea>
                </div>
            <input className="btn btn-default" type="submit" value="Submit comment"/>
            </form>
    }
}