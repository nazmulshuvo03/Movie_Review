import React, { Component } from 'react';
import { storage } from '../../config/fbConfig';
import shortid from 'shortid';
import LinearProgress from '@material-ui/core/LinearProgress';

export default class ImageUpload extends Component {
	state = {
		image: null,
		progress: 0,
		url: 'https://via.placeholder.com/120x80'
	};

	hadleImageChange = (e) => {
		const image = e.target.files[0];
		if (image) {
			this.setState({
				image
			});
		}
	};

	handleUpload = (e) => {
		e.preventDefault();
		const { image } = this.state;
		const name = shortid.generate() + '_' + image.name;
		const uploadTask = storage.ref(`images/${name}`).put(image);
		uploadTask.on(
			'state_changed',
			(snapshot) => {
				// progress function
				const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100);
				this.setState({
					progress
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
						url
					});
					this.props.changeParentState(this.state.image, this.state.progress, this.state.url);
				});
			}
		);
	};

	render() {
		//console.log(this.props);
		return (
			<div>
				<div className="input-field">
					<div class="file-field input-field">
						<div>
							<img src={this.props.posterUrl} alt="Poster Here" height="80" width="120" />
						</div>
						<LinearProgress variant="determinate" value={this.state.progress} color="secondary" />
						<div class="btn waves-effect waves-light red accent-4 z-depth-3">
							<span>
								Select<i className="material-icons right">insert_photo</i>
							</span>
							<input type="file" id="image" onChange={this.hadleImageChange} />
						</div>
						<div class="file-path-wrapper">
							<input class="file-path validate z-depth-3" type="text" />
						</div>
					</div>
					<button className="btn waves-effect waves-light red accent-4 z-depth-3" onClick={this.handleUpload}>
						Upload<i className="material-icons right">file_upload</i>
					</button>
				</div>
			</div>
		);
	}
}
