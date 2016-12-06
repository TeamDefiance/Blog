import React, {Component} from 'react';

export default class AboutForm extends Component {
    render() {
        return (
            <div>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        className="form-control"
                        type="text"
                        name="name"
                        value={this.props.fullName}
                        disabled={this.props.submitDisabled}

                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        className="form-control"
                        type="text"
                        name="email"
                        value={this.props.email}
                        disabled={this.props.submitDisabled}

                    />
                </div>
                <div className="form-group">
                    <label>Phone:</label>
                    <input
                        className="form-control"
                        type="text"
                        name="phone"
                        value={this.props.phone}
                        disabled={this.props.submitDisabled}

                    />
                </div>

            </div>
        );
    }
}