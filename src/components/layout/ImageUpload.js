import React, { Component } from 'react';

export default class ImageUpload extends Component {
	render() {
		return (
			<div>
				<div className="input-field">
					<input type="file" id="posterImage" onChange={this.props.hadleImageChange} />
					<progress value={this.props.progress} max="100" />
					<button onClick={this.props.handleUpload}>Upload</button>
				</div>
				<div>
					<img src={this.props.posterUrl} alt="Poster Here" height="120" wight="80" />
				</div>
			</div>
		);
	}
}
