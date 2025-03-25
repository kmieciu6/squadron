import { useLanguage } from "./translations/LanguageContext";
import { getTranslation } from "./translations/LanguageUtils";

const Soft = () => {
    const { currentLanguage } = useLanguage();

    return (
        <section className="soft_section page">
            <h1>
                {getTranslation("soft", currentLanguage)}
            </h1>
        </section>
    );
}

export default Soft;