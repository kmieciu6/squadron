import { useLanguage } from "./translations/LanguageContext";
import { getTranslation } from "./translations/LanguageUtils";

const OffshoreExpertise = () => {
    const { currentLanguage } = useLanguage();

    return (
        <section className="offshore_section page">
            <h1>
                {getTranslation("offshore_expertise", currentLanguage)}
            </h1>
        </section>
    );
}

export default OffshoreExpertise;