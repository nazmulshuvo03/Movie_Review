import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import { updateReview } from '../../store/actions/reviewAction';

class EditReviewPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			content: '',
			id: this.props.id
		};
	}

	async componentWillReceiveProps() {
		if (this.props.review) {
			this.setState({
				name: this.props.review.name,
				content: this.props.review.content
			});
		}
		console.log(this.state);
	}

	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		//console.log(this.props);

		this.props.history.push('/');
	};

	render() {
		console.log(this.state);
		const { review } = this.props;
		if (review) {
			return (
				<div className="container red-text text-accent-4 center">
					<h3>Edit Your Review Here</h3>
					<form onSubmit={this.handleSubmit}>
						<div className="input-field">
							<input type="text" id="name" onChange={this.handleChange} placeholder={review.name} />
						</div>
						<div className="input-field">
							<input type="text" id="content" onChange={this.handleChange} placeholder={review.content} />
						</div>
						<div className="input-field">
							<button
								type="submit"
								name="action"
								className="btn waves-effect waves-light red accent-4 z-depth-3"
							>
								Post<i className="material-icons right">send</i>
							</button>
						</div>
					</form>
				</div>
			);
		} else {
			return (
				<div className="container center">
					<p>Loading ....</p>
				</div>
			);
		}
	}
}

const mapStateToProps = (state, ownprops) => {
	const id = ownprops.match.params.id;
	const reviews = state.firestore.data.reviews;
	const review = reviews ? reviews[id] : '';
	return {
		id: id,
		review: review
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateReview: (review, reviewId) => dispatch(updateReview(review, reviewId))
	};
};

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect([
		{
			collection: 'reviews'
		}
	])
)(EditReviewPage);
