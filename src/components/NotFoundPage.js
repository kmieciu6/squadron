import { useLanguage } from './translations/LanguageContext';
import { getTranslation } from "./translations/LanguageUtils";

const NotFoundPage = () => {
    const { currentLanguage } = useLanguage();

    return (
        <div>
            <h1>{getTranslation('Error 404', currentLanguage)}</h1>
            <p>
                Cillum eiusmod deserunt minim laboris eiusmod. Aliqua adipisicing exercitation do proident cupidatat aute dolor esse proident
                officia sint quis nisi proident. Laborum velit sit minim et irure non. Cupidatat minim duis incididunt minim sunt exercitation
                consequat ea duis cillum velit. Ex culpa amet consectetur nulla exercitation cupidatat qui tempor enim ipsum deserunt qui est deserunt.
            </p>
        </div>
    )
}

export default NotFoundPage;