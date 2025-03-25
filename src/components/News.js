import { useLanguage } from "./translations/LanguageContext";
import { getTranslation } from "./translations/LanguageUtils";

const News = () => {
    const { currentLanguage } = useLanguage();

    return (
    <section className="news_section page">
        <h1>
            {getTranslation("news", currentLanguage)}
        </h1>
    </section>
    )
}

export default News;