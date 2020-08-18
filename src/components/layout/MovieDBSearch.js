import React, { Component } from "react";
import axios from "axios";
import Tooltip from "@material-ui/core/Tooltip";

export default class MovieDBSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movieRows: [],
            searchTerm: "",
        };
    }

    searchChangeHandler = (event) => {
        this.setState(
            {
                searchTerm: event.target.value,
            },
            this.performSearch
        );
    };

    performSearch = () => {
        if (this.state.searchTerm === "") {
            this.setState({
                movieRows: [],
            });
        } else {
            const urlString =
                "https://api.themoviedb.org/3/search/movie?api_key=65f79409283878f174a96aea0dc77a36&query=" +
                this.state.searchTerm;
            axios.get(urlString).then((res) => {
                this.setState({
                    movieRows: res.data.results,
                });
            });
        }
    };

    render() {
        const movieRows = this.state.movieRows;
        //console.log(this.state.movieRows);

        if (movieRows) {
            return (
                <div
                    className="z-depth-2"
                    style={{
                        border: "3px solid #eee",
                        padding: "1rem",
                        borderRadius: "1rem",
                        height: "610px",
                        overflow: "auto",
                    }}
                >
                    <div className="">
                        <div
                            style={{
                                fontFamily: "'Playfair Display', serif",
                                fontWeight: "600",
                                fontSize: "2rem",
                                color: "#3c2d73",
                            }}
                            className="center"
                        >
                            MovieDb Search
                        </div>
                        <form
                            className="moviedb_search"
                            style={{ padding: "0.5rem" }}
                        >
                            <div className="input-field">
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
                            {movieRows.map((movie) => {
                                console.log(movie);
                                return (
                                    <div
                                        className=""
                                        key={movie.id}
                                        onClick={this.props.takeDataFromSearch(
                                            movie
                                        )}
                                    >
                                        <ul className="">
                                            <li
                                                className="row z-depth-1"
                                                style={{
                                                    minHeight: "0",
                                                    margin: "0",
                                                    padding: "0",
                                                    height: "5rem",
                                                }}
                                            >
                                                <div
                                                    className="col s4"
                                                    style={{
                                                        margin: "0",
                                                        padding: "0",
                                                    }}
                                                >
                                                    <img
                                                        src={
                                                            movie.poster_path
                                                                ? "http://image.tmdb.org/t/p/w185" +
                                                                  movie.poster_path
                                                                : null
                                                        }
                                                        alt="poster"
                                                        style={{
                                                            height: "5rem",
                                                            width: "100%",
                                                        }}
                                                    />
                                                </div>
                                                <div
                                                    className="col s8"
                                                    style={{
                                                        margin: "0",
                                                        padding: "0 0 0 10px",
                                                    }}
                                                >
                                                    <Tooltip
                                                        title={movie.title}
                                                    >
                                                        <div
                                                            style={{
                                                                height:
                                                                    "3.5rem",
                                                                fontFamily:
                                                                    "'Playfair Display', serif",
                                                                fontSize:
                                                                    "1rem",
                                                                fontWeight:
                                                                    "300",
                                                                overflow:
                                                                    "hidden",
                                                            }}
                                                        >
                                                            {movie.title}
                                                        </div>
                                                    </Tooltip>
                                                    <div className="">
                                                        <span
                                                            style={{
                                                                color: "#999",
                                                            }}
                                                        >
                                                            Language:{" "}
                                                        </span>
                                                        <span
                                                            style={{
                                                                fontStyle:
                                                                    "italic",
                                                            }}
                                                        >
                                                            {
                                                                movie.original_language
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
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
