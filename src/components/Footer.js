import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import facebook from "../assets/logo_facebook.png";
import linkedIn from "../assets/logo_linkedIn.png";
import { useLanguage } from './translations/LanguageContext';
import { getTranslation } from "./translations/LanguageUtils";

const Footer = () => {
    const { currentLanguage } = useLanguage();

    return (
        <div className="footer">
            <h1>Logo</h1>
            <div className="contact_info">
                <a href="tel:+48xxxxxxxxx">
                    <FontAwesomeIcon icon={faPhone} className="icon" />
                    <h5>
                        +48 xxx xxx xxx
                    </h5>
                </a>
                <a href="mailto:yourmail@domain.com">
                    <FontAwesomeIcon icon={faEnvelope} className="icon" />
                    <h5>
                        yourmail@domain.com
                    </h5>
                </a>
            </div>
            <div className="social">
                <a href="https://www.facebook.com/">
                    <img src={facebook} alt="logo facebook" className="fb"/>
                </a>
                <a href="https://www.linkedin.com/">
                    <img src={linkedIn} alt="logo linkedIn" className="in"/>
                </a>
            </div>
        </div>
    )
};

export default Footer;