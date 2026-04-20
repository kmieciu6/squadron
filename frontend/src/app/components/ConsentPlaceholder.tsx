'use client';
import useTranslation from "../hooks/useTranslation";
import {ReactNode} from "react";

type ConsentPlaceholderProps = {
    text: ReactNode;
    onAccept: () => void;
    className?: string;
    children?: ReactNode;
};

const ConsentPlaceholder = ({ text, onAccept, className }: ConsentPlaceholderProps) => {
    const { t } = useTranslation('common');

    return (
        <div className={`consent_placeholder${className ? ` ${className}` : ""}`}>
            <p>{text}</p>
            <button onClick={onAccept}>{t('accept')}</button>
        </div>
    );
};

export default ConsentPlaceholder;