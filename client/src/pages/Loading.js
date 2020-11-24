import React from "react";
import Spinner from "../utils/BrokenCircle.gif";

const Loading = () => {
    return (
        <div>
            <img
                src={Spinner}
                alt={"Please Wait..."}
                style={{ margin: "auto", display: "block", marginTop: 100 }}
            />
        </div>
    );
};

export default Loading;
