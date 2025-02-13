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
                <h4>{getTranslation('phone_number', currentLanguage)} +48 xxx xxx xxx</h4>
                <h4>Mail: mail@mail.com</h4>
            </div>
            <img src={facebook} alt="logo facebook" className="fb"/>
            <img src={linkedIn} alt="logo linkedIn" className="in"/>
        </div>
    )
};

export default Footer;