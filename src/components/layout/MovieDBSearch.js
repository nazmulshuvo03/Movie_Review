import React, { Component } from 'react';
import axios from 'axios';

export default class MovieDBSearch extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movieRows: [],
			searchTerm: ''
		};
	}

	searchChangeHandler = (event) => {
		this.setState(
			{
				searchTerm: event.target.value
			},
			this.performSearch
		);
	};

	performSearch = () => {
		if (this.state.searchTerm === '') {
			this.setState({
				movieRows: []
			});
		} else {
			const urlString =
				'https://api.themoviedb.org/3/search/movie?api_key=65f79409283878f174a96aea0dc77a36&query=' +
				this.state.searchTerm;
			axios.get(urlString).then((res) => {
				this.setState({
					movieRows: res.data.results
				});
			});
		}
	};

	render() {
		const movieRows = this.state.movieRows;
		//console.log(this.state.movieRows);

		if (movieRows) {
			return (
				<div className="searchbar">
					<h5>Review from MovieDb</h5>
					<form className="card z-depth-2">
						<div className="input-field card-content">
							<label htmlFor="search" className="search_label">
								MovieDB Search...<i className="material-icons right">search</i>
							</label>
							<input type="text" className="input-field search" onChange={this.searchChangeHandler} />
						</div>
					</form>

					<ul>
						{movieRows.map((movie) => {
							console.log(movie);
							return (
								<li key={movie.id} onClick={this.props.takeDataFromSearch(movie)}>
									<ul className="collection z-depth-1">
										<li className="collection-item avatar">
											<img
												src={
													movie.poster_path ? (
														'http://image.tmdb.org/t/p/w185' + movie.poster_path
													) : null
												}
												alt="poster"
												className="circle"
											/>
											<span className="title">{movie.title}</span>
											<p>Language: {movie.original_language}</p>
										</li>
									</ul>
								</li>
							);
						})}
					</ul>
				</div>
			);
		} else {
			return (
				<div className="searchbar container">
					<h5>Review from MovieDb</h5>
					<input
						type="text"
						placeholder="Search Movies From MovieDB..."
						className="input-field search"
						onChange={this.searchChangeHandler}
					/>
					<p>Loading... ... </p>
				</div>
			);
		}
	}
}
