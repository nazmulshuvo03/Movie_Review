import React, { Component } from "react";
import { storage } from "../../config/fbConfig";
import shortid from "shortid";
import M from "materialize-css";
import LinearProgress from "@material-ui/core/LinearProgress";

export default class ImageUpload extends Component {
	state = {
		image: null,
		progress: 0,
		url: "https://via.placeholder.com/300x200"
	};

	hadleImageChange = e => {
		const image = e.target.files[0];
		if (image) {
			this.setState({
				image
			});
		}
	};

	handleUpload = e => {
		e.preventDefault();
		const { image } = this.state;
		if (image) {
			const name = shortid.generate() + "_" + image.name;
			const uploadTask = storage.ref(`images/${name}`).put(image);
			uploadTask.on(
				"state_changed",
				snapshot => {
					// progress function
					const progress = Math.round(
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100
					);
					this.setState({
						progress
					});
				},
				error => {
					// error function
					console.log(error);
				},
				() => {
					//complete function
					//storage.ref('images').child(image.name).getDownloadURL().then((url) => {
					uploadTask.snapshot.ref.getDownloadURL().then(url => {
						this.setState({
							url
						});
						this.props.changeParentState(
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
				outDuration: 1000
			});
		}
	};

	render() {
		//console.log(this.props);
		return (
			<div>
				<div>
					<img
						className="upload_image_preview"
						src={this.props.posterUrl}
						alt="Poster Here"
					/>
				</div>
				<LinearProgress
					className="progress_bar"
					variant="determinate"
					value={this.state.progress}
					color="secondary"
				/>
				<div className="input-field">
					<div className="file-field input-field">
						<div>
							<span className="select_image_button btn waves-effect waves-light red accent-4 z-depth-3">
								select
							</span>
							<input
								type="file"
								id="image"
								onChange={this.hadleImageChange}
							/>
						</div>

						<div className="file-path-wrapper">
							<input
								className="file-path validate z-depth-3"
								placeholder="No Image Selected"
								type="text"
							/>
						</div>
					</div>
					<button
						className="btn waves-effect waves-light red accent-4 z-depth-3"
						onClick={this.handleUpload}
					>
						Upload
						<i className="material-icons right">file_upload</i>
					</button>
				</div>
			</div>
		);
	}
}
