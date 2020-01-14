import React, { Component } from "react";
import axios from "axios";

export default class MovieDBSearch extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movieRows: [],
			searchTerm: ""
		};
	}

	searchChangeHandler = event => {
		this.setState(
			{
				searchTerm: event.target.value
			},
			this.performSearch
		);
	};

	performSearch = () => {
		if (this.state.searchTerm === "") {
			this.setState({
				movieRows: []
			});
		} else {
			const urlString =
				"https://api.themoviedb.org/3/search/movie?api_key=65f79409283878f174a96aea0dc77a36&query=" +
				this.state.searchTerm;
			axios.get(urlString).then(res => {
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
				<div className="card">
					<div className="searchbar">
						<h5 className="headline">Review from MovieDb</h5>
						<form className="moviedb_search">
							<div className="input-field card-content search_area">
								<label
									htmlFor="search"
									className="search_label"
								>
									Search Movies Here...
									<i className="material-icons right">
										search
									</i>
								</label>
								<input
									type="text"
									className="input-field search"
									onChange={this.searchChangeHandler}
								/>
							</div>
						</form>

						<div className="">
							{movieRows.map(movie => {
								console.log(movie);
								return (
									<div
										className="card-content search_items"
										key={movie.id}
										onClick={this.props.takeDataFromSearch(
											movie
										)}
									>
										<ul className="collection z-depth-1">
											<li className="collection-item avatar single_search_item">
												<img
													src={
														movie.poster_path
															? "http://image.tmdb.org/t/p/w185" +
															  movie.poster_path
															: null
													}
													alt="poster"
													className="circle single_search_image"
												/>
												<span className="title single_search_title">
													{movie.title}
												</span>
												<p className="single_search_language">
													Language:{" "}
													{movie.original_language}
												</p>
											</li>
										</ul>
									</div>
								);
							})}
						</div>
					</div>
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
