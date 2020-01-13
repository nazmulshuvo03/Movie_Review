import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import M from "materialize-css";

import { createReview } from "../../store/actions/reviewAction";
import MovieDBSearch from "../layout/MovieDBSearch";
import ImageUpload from "../layout/ImageUpload";

class NewReview extends Component {
	state = {
		name: "",
		content: "",
		posterImage: null,
		posterUrl: "https://via.placeholder.com/300x200"
	};

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
		if (this.state.name) {
			this.props.createReview({
				name: this.state.name,
				content: this.state.content,
				posterUrl: this.state.posterUrl
			});
			//console.log(this.state);
			this.props.history.push("/");
		} else {
			M.toast({
				html: "<span>Name Can Not Be Empty</span>",
				classes: "rounded",
				inDuration: 1000,
				outDuration: 1000
			});
		}
	};

	takeDataFromSearch = movie => e => {
		this.setState({
			name: movie.title,
			posterUrl: "http://image.tmdb.org/t/p/w185" + movie.poster_path
		});
		//console.log(movie);
	};

	render() {
		const { auth } = this.props;
		//console.log(this.state);

		if (!auth.uid) {
			return <Redirect to="/signin" />;
		} else {
			return (
				<div className="center">
					<div className="row">
						<div className="col s6 offset-s1">
							<h3 className="row">Post Your Review Here</h3>
							<div className="row">
								<div className="col s6">
									<form onSubmit={this.handleSubmit}>
										<div className="input-field">
											<label htmlFor="name">
												Movie Name
											</label>
											<input
												type="text"
												id="name"
												onChange={this.handleChange}
												value={this.state.name}
											/>
										</div>

										<div className="input-field">
											<label htmlFor="content">
												Review
											</label>
											<textarea
												className="materialize-textarea"
												type="text"
												id="content"
												onChange={this.handleChange}
											/>
										</div>
										<div className="input-field">
											<button
												type="submit"
												name="action"
												className="btn waves-effect waves-light z-depth-3"
											>
												Post
												<i className="material-icons right">
													send
												</i>
											</button>
										</div>
									</form>
								</div>
								<div className="col s4 offset-s2">
									<ImageUpload
										changeParentState={
											this.handleImageUpload
										}
										posterUrl={this.state.posterUrl}
									/>
								</div>
							</div>
						</div>
						<div className="col s3 offset-s1">
							<MovieDBSearch
								takeDataFromSearch={this.takeDataFromSearch}
							/>
						</div>
					</div>
				</div>
			);
		}
	}
}

const mapStateToProps = state => {
	return {
		auth: state.firebase.auth
	};
};

const mapDispatchToProps = dispatch => {
	return {
		createReview: review => dispatch(createReview(review))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(NewReview);
