import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import { updateReview } from '../../store/actions/reviewAction';

class EditReviewPage extends Component {
	constructor(props) {
		super(props);

		// this.state = {
		// 	name: props.review.name,
		// 	content: props.review.content
		// };

		this.state = {
			name: '',
			content: ''
		};
	}

	componentDidUpdate = (props) => {
		if (this.state.name === props.review.name) {
			console.log(props.review);
		}
		// this.setState((state, props) => ({
		// 	name: state.name + props.review.name,
		// 	content: state.content + 'content'
		// }));
		// console.log(this.state, this.props.review);
	};

	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		//console.log(this.props);
		this.props.updateReview(this.state, this.props.id);
		this.props.history.push('/');
	};

	render() {
		//console.log(this.state, this.props.review);
		const { review } = this.props;
		if (review) {
			return (
				<div className="container red-text text-accent-4 center">
					<h3>Edit Your Review Here</h3>
					<form onSubmit={this.handleSubmit}>
						<div className="input-field">
							<input type="text" id="name" onChange={this.handleChange} value={this.state.name || ''} />
						</div>
						<div className="input-field">
							<input
								type="text"
								id="content"
								onChange={this.handleChange}
								value={this.state.content || ''}
							/>
						</div>
						<div className="input-field">
							<button
								type="submit"
								name="action"
								className="btn waves-effect waves-light red accent-4 z-depth-3"
							>
								Save<i className="material-icons right">save</i>
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
