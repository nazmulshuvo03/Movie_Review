import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";

import DeletevEditReview from "../options/DeleteEditReview";
import ReviewDetails from "./ReviewDetails";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #fff",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(0, 3),
        borderRadius: "1rem",
        outline: "none",
    },
}));

const SingleReview = ({ review, reviewId }) => {
    //console.log(review.authorId);
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [selectedId, setSelectedId] = React.useState(null);

    const setModalOpen = (id) => {
        setSelectedId(id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div
            className="z-depth-2"
            style={{
                border: "3px solid #eee",
                height: "17rem",
                margin: "2rem",
            }}
        >
            <div className="row" style={{ width: "100%", height: "100%" }}>
                <div className="col s3">
                    <div
                        style={{
                            width: "100%",
                            height: "16.5rem",
                            borderRight: "3px solid #eee",
                        }}
                    >
                        {/* <Link to={"/review/" + reviewId}> */}
                        <img
                            style={{ width: "100%", height: "100%" }}
                            src={
                                review.posterUrl ||
                                "https://via.placeholder.com/180x150"
                            }
                            alt="Poster"
                            onClick={() => setModalOpen(reviewId)}
                        />
                        {/* </Link> */}
                    </div>
                </div>
                <div className="col s9">
                    <div style={{ padding: "0.5rem 0" }}>
                        <div
                            className="row"
                            style={{ margin: "0", height: "5rem" }}
                        >
                            <div
                                className="col s7"
                                style={{ padding: "0", overflow: "hidden" }}
                            >
                                {/* <Link
                                    style={{
                                        fontFamily: "'Playfair Display', serif",
                                        fontSize: "1.75rem",
                                        fontWeight: "500",
                                        color: "#212121",
                                    }}
                                    to={"/review/" + reviewId}
                                >
                                    {review.name}
                                </Link> */}
                                <button
                                    type="button"
                                    style={{
                                        fontFamily: "'Playfair Display', serif",
                                        fontSize: "1.75rem",
                                        fontWeight: "500",
                                        color: "#212121",
                                        border: "none",
                                        backgroundColor: "transparent",
                                    }}
                                    onClick={() => setModalOpen(reviewId)}
                                >
                                    {review.name}
                                </button>
                            </div>

                            <div className="col s5">
                                <p
                                    className="right"
                                    style={{
                                        margin: "5px",
                                        color: "#999",
                                    }}
                                >
                                    {moment(
                                        review.createdAt.toDate()
                                    ).calendar()}
                                </p>
                            </div>
                        </div>

                        <div style={{ height: "7rem" }}>
                            <p>
                                {review.content.substring(0, 200) + "... ..."}
                            </p>
                        </div>
                        <div
                            className="row"
                            style={{
                                margin: "0",
                                borderTop: "1px solid #ddd",
                                paddingTop: "0.5rem",
                            }}
                        >
                            <div className="col s6">
                                <span style={{ color: "#999" }}>
                                    Reviewed By{" "}
                                </span>
                                <span style={{ fontStyle: "italic" }}>
                                    {review.authorFirstName}{" "}
                                    {review.authorLastName}
                                </span>
                            </div>
                            <div className="col s6">
                                <DeletevEditReview
                                    authorId={review.authorId}
                                    reviewId={reviewId}
                                    review={review}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                className={classes.modal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open} className={classes.paper}>
                    <div>
                        <ReviewDetails
                            id={selectedId}
                            handleClose={handleClose}
                        />
                    </div>
                </Fade>
            </Modal>
        </div>
    );
};

export default SingleReview;
