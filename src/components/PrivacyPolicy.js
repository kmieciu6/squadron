import { useLanguage } from './translations/LanguageContext';
import { getTranslation } from "./translations/LanguageUtils";

const PrivacyPolicy = () => {
    const { currentLanguage } = useLanguage();

    return (
        <div>
            <h1>{getTranslation('privacy_policy', currentLanguage)}</h1>
        </div>
    )
}

export default PrivacyPolicy;