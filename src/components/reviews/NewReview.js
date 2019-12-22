import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { createReview } from '../../store/actions/reviewAction';
import MovieDBSearch from '../layout/MovieDBSearch';

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

	takeDataFromSearch = (movie) => (e) => {
		this.setState({
			name: movie.title
		});
		//console.log(movie);
	};

	render() {
		const { auth } = this.props;
		console.log(this.state);

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
