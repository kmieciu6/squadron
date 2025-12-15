"use client";
import React, { useState, useRef } from "react";
import useTranslation from "../hooks/useTranslation";
import ReCAPTCHA from "react-google-recaptcha";
import { useCookiesConsent } from "../context/CookiesConsentContext";
import ConsentPlaceholder from "../components/ConsentPlaceholder";
import useIntersectionHide from "@/app/hooks/useIntersectionHide";
import Link from "next/link";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

const Contact = () => {
    const { t } = useTranslation("common");
    const { isAccepted, acceptCookies } = useCookiesConsent();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
        consent: false,
    });

    const [errors, setError] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [recaptchaToken, setRecaptchaToken] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [secRef, isSecHidden] = useIntersectionHide();
    const recaptchaRef = useRef(null);

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
        if (submitted) {
            setError((prevErrors) => ({
                ...prevErrors,
                [name]: "",
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm(formData, recaptchaToken);
        if (Object.keys(validationErrors).length !== 0) {
            setError(validationErrors);
            setSubmitted(false);
            return;
        }

        setIsSending(true);
        setError({});
        setSubmitted(false);
        setShowSuccessMessage(false);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, recaptchaToken }),
            });

            if (res.ok) {
                setSubmitted(true);
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    message: "",
                    consent: false,
                });
                setShowSuccessMessage(true);
                setTimeout(() => setShowSuccessMessage(false), 5000);
            } else {
                const data = await res.json().catch(() => null);

                setError((prev) => ({
                    ...prev,
                    server:
                        t("form_submit_error") ||
                        "Wystąpił błąd serwera. Spróbuj ponownie później.",
                }));

                console.error("Błąd serwera:", data?.error || res.statusText);
            }
        } catch (err) {
            setError((prev) => ({
                ...prev,
                server:
                    t("network_error") ||
                    "Błąd połączenia z serwerem. Sprawdź internet.",
            }));
            console.error("Błąd sieci:", err);
        } finally {
            setIsSending(false);
            if (recaptchaRef.current) {
                recaptchaRef.current.reset();
            }
            setRecaptchaToken("");
        }
    };

    const validateForm = (data, recaptchaToken) => {
        const errors = {};

        if (!data.name.trim()) {
            errors.name = t("field_required");
        } else if (data.name.trim().length < 2) {
            errors.name = t("must_contain_two_letters");
        }

        if (!data.message.trim()) {
            errors.message = t("field_required");
        } else if (data.message.trim().length <= 20) {
            errors.message = t("must_contain"); // np. "Wiadomość musi mieć min. 20 znaków"
        }

        if (!data.email.trim()) {
            errors.email = t("field_required");
        } else if (!isValidEmail(data.email)) {
            errors.email = t("invalid_email");
        }

        if (!data.consent) {
            errors.consent = t("consent");
        }

        if (!recaptchaToken) {
            errors.recaptcha = t("verify_recaptcha");
        }

        return errors;
    };

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    return (
        <div className='contact'>
            <div ref={secRef} className={`contact_container ${isSecHidden ? 'hidden' : ''}`}>
                <h1>
                    {t('contact')}
                </h1>

                {showSuccessMessage && (
                    <p className="success">{t("form_submitted_successfully")}</p>
                )}

                {errors.server && <p className="error">{errors.server}</p>}

                <form
                    autoComplete="on"
                    onSubmit={handleSubmit}
                    noValidate
                    className="form"
                >
                    <label htmlFor="name">
                        <p>{t("name")}</p>
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="input"
                        autoComplete="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {errors.name && <span className="error">{errors.name}</span>}

                    <label htmlFor="email">
                        <p>{t("email")}</p>
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="input"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <span className="error">{errors.email}</span>}

                    <label htmlFor="phone">
                        <p>{t("phone")}</p>
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="input"
                        autoComplete="tel"
                        value={formData.phone}
                        onChange={handleChange}
                    />

                    <label htmlFor="message">
                        <p>{t("message")}</p>
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        className="input"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                    />
                    {errors.message && <span className="error">{errors.message}</span>}

                    <div className="checkbox_container">
                        <label htmlFor="consent" className="checkbox">
                            <input
                                type="checkbox"
                                id="consent"
                                name="consent"
                                checked={formData.consent}
                                onChange={handleChange}
                            />
                            <span className="checkmark" />
                            <p>
                                {`${t("consent_text")} `}
                                <Link href="/privacy_policy"
                                    className="link"
                                    >
                                    {`${t("privacy_policy")}.`}
                                </Link>
                            </p>
                        </label>
                        {errors.consent && (
                            <span className="error">{errors.consent}</span>
                        )}
                    </div>

                    {/* reCAPTCHA + cookies */}
                    <div className="recaptcha">
                        {isAccepted ? (
                            <ReCAPTCHA
                                sitekey={RECAPTCHA_SITE_KEY}
                                ref={recaptchaRef}
                                onChange={(token) => setRecaptchaToken(token || "")}
                                theme="light"
                            />
                        ) : (
                            <ConsentPlaceholder
                                text={t("accept_cookies_to_use_recaptcha")}
                                onAccept={acceptCookies}
                                className='consent_placeholder'
                            >
                                <button onClick={acceptCookies}>{t("accept")}</button>
                            </ConsentPlaceholder>
                        )}
                    </div>
                    {errors.recaptcha && (
                        <span className="error">{errors.recaptcha}</span>
                    )}

                    <div className="button">
                        <button type="submit" disabled={isSending}>
                            {isSending ? t("sending") || "Wysyłanie..." : t("send")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Contact;
