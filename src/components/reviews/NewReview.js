import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import M from "materialize-css";
import { storage } from "../../config/fbConfig";
import shortid from "shortid";
import LinearProgress from "@material-ui/core/LinearProgress";

import { createReview } from "../../store/actions/reviewAction";
import MovieDBSearch from "../layout/MovieDBSearch";

class NewReview extends Component {
    state = {
        name: "",
        content: "",
        posterImage: null,
        posterUrl: "https://via.placeholder.com/300x200?text=Poster+Preview",
        image: null,
        progress: 0,
        url: "https://via.placeholder.com/300x200",
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        });
    };

    handleImageUpload = (posterImage, progress, posterUrl) => {
        this.setState({
            posterImage,
            progress,
            posterUrl,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.name) {
            this.props.createReview({
                name: this.state.name,
                content: this.state.content,
                posterUrl: this.state.posterUrl,
            });
            //console.log(this.state);
            this.props.history.push("/");
        } else {
            M.toast({
                html: "<span>Name Can Not Be Empty</span>",
                classes: "rounded",
                inDuration: 1000,
                outDuration: 1000,
            });
        }
    };

    takeDataFromSearch = (movie) => (e) => {
        this.setState({
            name: movie.title,
            posterUrl: "http://image.tmdb.org/t/p/w185" + movie.poster_path,
        });
        //console.log(movie);
    };

    hadleImageChange = (e) => {
        const image = e.target.files[0];
        if (image) {
            this.setState({
                image,
            });
        }
    };

    handleUpload = (e) => {
        e.preventDefault();
        const { image } = this.state;
        if (image) {
            const name = shortid.generate() + "_" + image.name;
            const uploadTask = storage.ref(`images/${name}`).put(image);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // progress function
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    this.setState({
                        progress,
                    });
                },
                (error) => {
                    // error function
                    console.log(error);
                },
                () => {
                    //complete function
                    //storage.ref('images').child(image.name).getDownloadURL().then((url) => {
                    uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                        this.setState({
                            url,
                        });
                        this.handleImageUpload(
                            this.state.image,
                            this.state.progress,
                            this.state.url
                        );
                    });
                }
            );
        } else {
            M.toast({
                html: "<span>No Image Selected</span>",
                classes: "rounded",
                inDuration: 1000,
                outDuration: 1000,
            });
        }
    };

    render() {
        const { auth } = this.props;
        //console.log(this.state);

        if (!auth.uid) {
            return <Redirect to="/signin" />;
        } else {
            return (
                <div style={{ width: "84rem", margin: "0 auto" }}>
                    <div className="center" style={{ marginBottom: "2rem" }}>
                        <span
                            style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: "3rem",
                                fontWeight: "600",
                                color: "#3c2d73",
                            }}
                        >
                            Post Your Review Here
                        </span>
                    </div>
                    <div className="row">
                        <div className="col s9" style={{ padding: "0" }}>
                            <div
                                style={{
                                    border: "3px solid #eee",
                                    padding: "0.5rem",
                                    margin: "1rem",
                                    borderRadius: "1rem",
                                    height: "610px",
                                    overflow: "auto",
                                }}
                                className="z-depth-2"
                            >
                                <form onSubmit={this.handleSubmit}>
                                    <div className="row" style={{ margin: 0 }}>
                                        <div
                                            className="col s6"
                                            style={{ paddingRight: "3rem" }}
                                        >
                                            <div
                                                className="input-field"
                                                style={{
                                                    marginBottom: "20px",
                                                }}
                                            >
                                                <label htmlFor="name">
                                                    Movie Title
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    onChange={this.handleChange}
                                                    value={this.state.name}
                                                    style={{ width: "100%" }}
                                                />
                                            </div>
                                            <div
                                                className="input-field row"
                                                style={{ margin: "0" }}
                                            >
                                                <div
                                                    className="col s10 file-field"
                                                    style={{ paddingLeft: "0" }}
                                                >
                                                    <input
                                                        type="file"
                                                        id="image"
                                                        accept="image/*"
                                                        onChange={
                                                            this
                                                                .hadleImageChange
                                                        }
                                                    />
                                                    <div
                                                        style={{
                                                            overflow: "hidden",
                                                        }}
                                                    >
                                                        <input
                                                            className="file-path validate z-depth-3"
                                                            placeholder="Click Here To Select Poster"
                                                            type="text"
                                                        />
                                                    </div>
                                                </div>
                                                <div
                                                    className="col s2"
                                                    style={{
                                                        marginTop: "15px",
                                                    }}
                                                >
                                                    <button
                                                        className="waves-effect waves-light hoverable z-depth-2"
                                                        style={{
                                                            borderRadius:
                                                                "100%",
                                                            border:
                                                                "1px solid #4d308c",
                                                            color: "#4d308c",
                                                            background:
                                                                "transparent",
                                                            padding: "3px 6px",
                                                        }}
                                                        onClick={
                                                            this.handleUpload
                                                        }
                                                    >
                                                        <i className="material-icons">
                                                            file_upload
                                                        </i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="col s6"
                                            style={{ paddingLeft: "3rem" }}
                                        >
                                            <div>
                                                {/* <ImageUpload
                                                    changeParentState={
                                                        this.handleImageUpload
                                                    }
                                                    posterUrl={
                                                        this.state.posterUrl
                                                    }
                                                /> */}
                                                <img
                                                    className="upload_image_preview z-depth-3"
                                                    src={this.state.posterUrl}
                                                    alt="Poster Here"
                                                />
                                                <LinearProgress
                                                    className="progress_bar z-depth-3"
                                                    variant="determinate"
                                                    value={this.state.progress}
                                                    color="primary"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            height: "17rem",
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontSize: "1rem",
                                                marginBottom: "10px",
                                                color: "#9e9e9e",
                                            }}
                                        >
                                            Write Your Review Here
                                        </div>
                                        <textarea
                                            type="text"
                                            id="content"
                                            onChange={this.handleChange}
                                            style={{
                                                height: "15rem",
                                                border: "2px solid #bfbfbf",
                                                padding: "0.5rem",
                                            }}
                                        />
                                    </div>
                                    <div className="input-field center">
                                        <button
                                            type="submit"
                                            name="action"
                                            className="btn waves-effect waves-light z-depth-3 buttons_color"
                                            style={{ padding: "0rem 3rem" }}
                                        >
                                            <span>
                                                Post
                                                <i className="material-icons right">
                                                    send
                                                </i>
                                            </span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div
                            className="col s3"
                            style={{
                                padding: "1rem",
                            }}
                        >
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

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createReview: (review) => dispatch(createReview(review)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewReview);
