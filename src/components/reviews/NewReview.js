import React, { Component } from 'react';

class NewReview extends Component {
	render() {
		return (
			<div className="container">
				<h3>Post Your Review Here</h3>
				<form>
					<div className="input-field">
						<label htmlFor="title">Title</label>
						<input type="text" id="title" />
					</div>
					<div className="input-field">
						<label htmlFor="content">Content</label>
						<input type="text" id="content" />
					</div>
					<div className="input-field">
						<button className="btn">Post</button>
					</div>
				</form>
			</div>
		);
	}
}

export default NewReview;
