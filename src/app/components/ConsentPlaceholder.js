'use client';
import useTranslation from "../hooks/useTranslation";

const ConsentPlaceholder = ({ text, onAccept }) => {
    const { t } = useTranslation('common');

    return (
        <div className="consent_placeholder">
            <p>{text}</p>
            <button onClick={onAccept}>{t('accept')}</button>
        </div>
    );
};

export default ConsentPlaceholder;