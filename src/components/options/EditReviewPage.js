import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

import ImageUpload from "../layout/ImageUpload";

import { updateReview } from "../../store/actions/reviewAction";

class EditReviewPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: "",
			content: "",
			posterImage: null,
			posterUrl: ""
		};
	}

	componentDidUpdate = props => {
		if (!this.state.name) {
			this.setState((state, props) => ({
				name: state.name + props.review.name,
				content: state.content + props.review.content,
				posterUrl:
					state.posterUrl +
					(props.review.posterUrl ||
						"https://via.placeholder.com/120x80")
			}));
		}
	};

	// static getDerivedStateFromProps(props, state) {
	// 	if (!state.name) {
	// 		return {
	// 			name: props.review.name,
	// 			content: props.review.content
	// 		};
	// 	}
	// }

	handleChange = e => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};

	handleImageUpload = (posterImage, progress, posterUrl) => {
		this.setState({
			posterImage,
			progress,
			posterUrl
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		//console.log(this.props);
		this.props.updateReview(
			{
				name: this.state.name,
				content: this.state.content,
				posterUrl: this.state.posterUrl
			},
			this.props.id
		);
		this.props.history.push("/");
		//window.location.href = '/';
	};

	render() {
		//console.log(this.props);
		const { review } = this.props;
		if (review) {
			return (
				<div className="container center">
					<h3>Edit Your Review Here</h3>
					<div className="row">
						<div className="col s6">
							<form onSubmit={this.handleSubmit}>
								<div className="input-field">
									<input
										type="text"
										id="name"
										onChange={this.handleChange}
										value={this.state.name || ""}
									/>
								</div>

								<div className="input-field">
									<textarea
										className="materialize-textarea"
										type="text"
										id="content"
										onChange={this.handleChange}
										value={this.state.content || ""}
									/>
								</div>
								<div className="input-field">
									<button
										type="submit"
										name="action"
										className="btn waves-effect waves-light z-depth-3 buttons_color"
									>
										Save
										<i className="material-icons right">
											save
										</i>
									</button>
								</div>
							</form>
						</div>
						<div className="col s4 offset-s2">
							<ImageUpload
								changeParentState={this.handleImageUpload}
								posterUrl={this.state.posterUrl}
							/>
						</div>
					</div>
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
	const review = reviews ? reviews[id] : "";
	return {
		id: id,
		review: review
	};
};

const mapDispatchToProps = dispatch => {
	return {
		updateReview: (review, reviewId) =>
			dispatch(updateReview(review, reviewId))
	};
};

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect([
		{
			collection: "reviews"
		}
	])
)(EditReviewPage);
