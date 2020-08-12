import React from "react";
import moment from "moment";

const Notifications = (props) => {
    //console.log(props);
    const { notifications } = props;
    return (
        <div
            className="z-depth-2"
            style={{ border: "3px solid #eee", padding: "0.5rem" }}
        >
            <div style={{ textAlign: "center" }}>
                <span
                    style={{
                        fontFamily: "'Open Sans', sans-serif;",
                        fontWeight: "400",
                        fontSize: "2rem",
                    }}
                >
                    Notifications
                </span>
            </div>
            <ul className="">
                {notifications &&
                    notifications.map((item) => {
                        return (
                            <div className="collection z-depth-1" key={item.id}>
                                <li className="collection-item">
                                    <span className="">{item.user}</span>
                                    <span> {item.content}</span>
                                    <span className="">
                                        {" " +
                                            moment(
                                                item.time.toDate()
                                            ).fromNow()}
                                    </span>
                                </li>
                            </div>
                        );
                    })}
            </ul>
        </div>
    );
};

export default Notifications;
