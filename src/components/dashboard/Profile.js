import React from "react";

const Profile = (props) => {
    console.log(props);
    return (
        <div>
            <div
                style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "2.5rem",
                    fontWeight: "600",
                    textAlign: "center",
                    margin: "2rem 0",
                }}
                className="common_color"
            >
                Details
            </div>
            <div
                style={{
                    width: "30rem",
                    padding: "1rem 2rem",
                    margin: "0 auto",
                    border: "3px solid #ddd",
                    borderRadius: "1rem",
                }}
                className="z-depth-3"
            >
                <form>
                    <div className="input-field" style={{ margin: "2rem 0" }}>
                        <input
                            id="first_name"
                            type="text"
                            className="validate"
                            value={props && props.profile.firstName}
                        />
                        <label className="active" for="first_name">
                            First Name
                        </label>
                    </div>
                    <div className="input-field" style={{ margin: "2rem 0" }}>
                        <input
                            id="last_name"
                            type="text"
                            className="validate"
                            value={props && props.profile.lastName}
                        />
                        <label className="active" for="last_name">
                            Last Name
                        </label>
                    </div>
                    <div className="input-field" style={{ margin: "2rem 0" }}>
                        <input
                            id="email"
                            type="text"
                            className="validate"
                            value={props && props.profile.email}
                        />
                        <label className="active" for="email">
                            Last Name
                        </label>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;
