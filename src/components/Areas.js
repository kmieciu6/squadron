import { useLanguage } from "./translations/LanguageContext";
import { getTranslation } from "./translations/LanguageUtils";

const Areas = () => {
  const { currentLanguage } = useLanguage();

  return (
    <section className="areas-section page">
        <h1>
            {getTranslation("areas", currentLanguage)}
        </h1>
    </section>
  );
}

export default Areas;