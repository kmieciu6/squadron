import { Link } from 'react-router-dom';
import { useLanguage } from './translations/LanguageContext';
import { getTranslation } from "./translations/LanguageUtils";
import img_page_not_found from "../assets/page not found.jpg";

const NotFoundPage = () => {
    const { currentLanguage } = useLanguage();

    return (
        <div className='not_found_page'>
            <h1>{getTranslation('Error 404', currentLanguage)}</h1>
            <p>
                {getTranslation('not_found_page', currentLanguage)}
            </p>
            <Link to='/'><button>{getTranslation('main_page', currentLanguage)}</button></Link>
            <img src={img_page_not_found} alt='not found'/>
        </div>
    )
}

export default NotFoundPage;