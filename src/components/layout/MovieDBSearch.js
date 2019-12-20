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
		//console.log(movieRows);
		return (
			<div className="searchbar container">
				<input
					type="text"
					placeholder="Search Movies From MovieDB..."
					className="input-field search"
					onChange={this.searchChangeHandler}
				/>
				<ul>
					{movieRows &&
						movieRows.map((movie) => {
							return (
								<li key={movie.id}>
									<table>
										<tbody>
											<tr>
												<td className="search_image_box">
													<img
														className="search_image"
														src={
															movie.poster_path ? (
																'http://image.tmdb.org/t/p/w185' + movie.poster_path
															) : null
														}
														alt="poster"
													/>
												</td>
												<td className="search_title">{movie.title}</td>
											</tr>
										</tbody>
									</table>
								</li>
							);
						})}
				</ul>
			</div>
		);
	}
}
