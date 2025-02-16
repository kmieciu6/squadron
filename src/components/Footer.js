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
            <div>
                <h4>
                    <a href="tel:+48xxxxxxxxx">
                        <FontAwesomeIcon icon={faPhone} className="icon" />
                        <p>
                            +48 xxx xxx xxx
                        </p>
                    </a>
                </h4>
                <h4>  
                    <a href="mailto:yourmail@domain.com">
                        <FontAwesomeIcon icon={faEnvelope} className="icon" />
                        <p>
                            yourmail@domain.com
                        </p>
                    </a>
                </h4>
            </div>
            <img src={facebook} alt="logo facebook" className="fb"/>
            <img src={linkedIn} alt="logo linkedIn" className="in"/>
        </div>
    )
};

export default Footer;