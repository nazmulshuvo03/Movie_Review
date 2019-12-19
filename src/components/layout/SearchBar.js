import React, { Component } from 'react';
import axios from 'axios';

export default class SearchBar extends Component {
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
		//console.log(movieRows);
		return (
			<div>
				<input
					type="text"
					placeholder="Search Movies Here..."
					className="search"
					onChange={this.searchChangeHandler}
				/>
				{movieRows &&
					movieRows.map((movie) => {
						return (
							<div key={movie.id}>
								<table>
									<tbody>
										<tr>
											<td>
												<img
													src={
														movie.poster_path ? (
															'http://image.tmdb.org/t/p/w185' + movie.poster_path
														) : null
													}
													alt="poster"
												/>
											</td>
											<td>
												<h3>{movie.title}</h3>
												<p>{movie.overview}</p>
												<input type="button" name="button" value="View" />
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						);
					})}
			</div>
		);
	}
}
