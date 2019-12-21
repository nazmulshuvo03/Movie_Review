import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { deleteReview } from '../../store/actions/reviewAction';

class DeleteUpdate extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			reviewId: props.reviewId,
			review: props.review
		};
	}

	onDeleteClick = (e) => {
		e.preventDefault();
		this.props.deleteReview(this.state.reviewId);
	};

	render() {
		//console.log(this.props);
		const { uid, authorId } = this.props;

		if (authorId === uid) {
			return (
				<div>
					<button className="waves-effect waves-teal btn-flat delete_button" onClick={this.onDeleteClick}>
						<i className="material-icons right delete_icon">delete</i>
					</button>
					<Link to={'/edit/' + this.state.reviewId} className="waves-effect waves-teal btn-flat edit_button">
						<i className="material-icons right edit_icon">edit</i>
					</Link>
				</div>
			);
		} else return null;
	}
}

const mapStateToProps = (state) => {
	//console.log('From state: ', state);
	return {
		uid: state.firebase.auth.uid
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		deleteReview: (reviewId) => dispatch(deleteReview(reviewId))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteUpdate);
