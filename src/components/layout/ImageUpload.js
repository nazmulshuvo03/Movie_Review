import React, { Component } from 'react';
import { storage } from '../../config/fbConfig';
import shortid from 'shortid';

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
					<input type="file" id="image" onChange={this.hadleImageChange} />
					<progress value={this.state.progress} max="100" />
					<button onClick={this.handleUpload}>Upload</button>
				</div>
				<div>
					<img src={this.state.url} alt="Poster Here" height="120" wight="80" />
				</div>
			</div>
		);
	}
}
