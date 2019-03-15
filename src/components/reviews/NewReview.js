import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createReview } from '../../store/actions/reviewAction';

class NewReview extends Component {
	state = {
		name: '',
		content: ''
	};

	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		//console.log(this.props);
		this.props.createReview(this.state);
		this.props.history.push('/');
	};
	render() {
		return (
			<div className="container">
				<h3>Post Your Review Here</h3>
				<form onSubmit={this.handleSubmit}>
					<div className="input-field">
						<label htmlFor="name">Movie Name</label>
						<input type="text" id="name" onChange={this.handleChange} />
					</div>
					<div className="input-field">
						<label htmlFor="content">Review</label>
						<input type="text" id="content" onChange={this.handleChange} />
					</div>
					<div className="input-field">
						<button className="btn">Post</button>
					</div>
				</form>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		createReview: (review) => dispatch(createReview(review))
	};
};

export default connect(null, mapDispatchToProps)(NewReview);
