import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { createReview } from '../../store/actions/reviewAction';
import MovieDBSearch from '../layout/MovieDBSearch';
import ImageUpload from '../layout/ImageUpload';

class NewReview extends Component {
	state = {
		name: '',
		content: '',
		posterImage: null,
		posterUrl: 'https://via.placeholder.com/120x80',
		progress: 0
	};

	handleChange = (e) => {
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

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.createReview({
			name: this.state.name,
			content: this.state.content,
			posterUrl: this.state.posterUrl
		});
		console.log(this.state);
		this.props.history.push('/');
	};

	takeDataFromSearch = (movie) => (e) => {
		this.setState({
			name: movie.title,
			posterUrl: 'http://image.tmdb.org/t/p/w185' + movie.poster_path
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
				<div className="red-text text-accent-4 center">
					<div className="row">
						<div className="col s7">
							<h3 className="row">Post Your Review Here</h3>
							<form onSubmit={this.handleSubmit}>
								<div className="input-field">
									<label htmlFor="name">Movie Name</label>
									<input type="text" id="name" onChange={this.handleChange} value={this.state.name} />
								</div>
								<ImageUpload changeParentState={this.handleImageUpload} />
								<div className="input-field">
									<label htmlFor="content">Review</label>
									<input type="text" id="content" onChange={this.handleChange} />
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
						<div className="col s4 offset-s1">
							<MovieDBSearch takeDataFromSearch={this.takeDataFromSearch} />
						</div>
					</div>
				</div>
			);
		}
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		createReview: (review) => dispatch(createReview(review))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(NewReview);
