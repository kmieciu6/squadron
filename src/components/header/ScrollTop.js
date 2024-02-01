import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUp} from "@fortawesome/free-solid-svg-icons";

const ScrollTop = () => {
    const [visible, setVisible] = useState(false);

    // Show Button After Scrolling Down More than 500px
    const toggleVisible = () => {
        setVisible(
            document.body.scrollTop > 200 || document.documentElement.scrollTop > 200
        );
    };

    useEffect(() => {
        // Listen for Scrolling Event
        window.addEventListener("scroll", toggleVisible, false);
        return () => {
            window.removeEventListener("scroll", toggleVisible, false);
        };
    }, []);

    // Get Back Top when Clicked
    const handleScroll = () => {
        window.scrollTo({
            top: 0
        });
    };

    return (
        <button
        id="back-to-top"
        className={visible ? "back-to-top-visible" : null}
        onClick={handleScroll}
        title="Go To Top">
            <FontAwesomeIcon icon={faArrowUp} className='arrow'/>
        </button>
    );
};

export default ScrollTop;