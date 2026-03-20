"use client";

import { useState, useRef, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import type ReCAPTCHAType from "react-google-recaptcha";
import useTranslation from "../hooks/useTranslation";
import { useCookiesConsent } from "../context/CookiesConsentContext";
import ConsentPlaceholder from "../components/ConsentPlaceholder";
import useIntersectionHide from "@/app/hooks/useIntersectionHide";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

type FormData = {
    name: string;
    email: string;
    phone: string;
    message: string;
    consent: boolean;
};

type FormErrors = Partial<
    Record<keyof FormData | "recaptcha" | "server", string>
>;

const ContactPage = () => {
    const { t } = useTranslation("common");
    const { isAccepted, acceptCookies } = useCookiesConsent();

    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        phone: "",
        message: "",
        consent: false,
    });

    const [errors, setError] = useState<FormErrors>({});
    const [submitted, setSubmitted] = useState(false);
    const [recaptchaToken, setRecaptchaToken] = useState<string>("");
    const [isSending, setIsSending] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    // jeśli Twój hook zwraca tuple [ref, boolean], to tak jest OK
    const [secRef, isSecHidden] = useIntersectionHide() as unknown as [
        React.RefObject<HTMLDivElement>,
        boolean
    ];

    const recaptchaRef = useRef<ReCAPTCHAType | null>(null);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target;

        // checkbox ma checked, reszta value
        const nextValue =
            type === "checkbox"
                ? (e.target as HTMLInputElement).checked
                : value;

        setFormData((prev) => ({
            ...prev,
            [name]: nextValue,
        }));

        if (submitted) {
            setError((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
            recaptchaRef.current?.reset();
            setRecaptchaToken("");
        }
    };

    const validateForm = (data: FormData, token: string): FormErrors => {
        const nextErrors: FormErrors = {};

        if (!data.name.trim()) nextErrors.name = t("field_required");
        else if (data.name.trim().length < 2)
            nextErrors.name = t("must_contain_two_letters");

        if (!data.message.trim()) nextErrors.message = t("field_required");
        else if (data.message.trim().length <= 20)
            nextErrors.message = t("must_contain");

        if (!data.email.trim()) nextErrors.email = t("field_required");
        else if (!isValidEmail(data.email)) nextErrors.email = t("invalid_email");

        if (!data.consent) nextErrors.consent = t("consent");

        if (!token) nextErrors.recaptcha = t("verify_recaptcha");

        return nextErrors;
    };

    const isValidEmail = (email: string): boolean =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const recaptchaAvailable = isAccepted && RECAPTCHA_SITE_KEY.length > 0;

    return (
        <div className="contact">
            <div
                ref={secRef}
                className={`contact_container ${isSecHidden ? "hidden" : ""}`}
            >
                <h1>{t("contact")}</h1>

                {showSuccessMessage && (
                    <p className="success">{t("form_submitted_successfully")}</p>
                )}

                {errors.server && <p className="error">{errors.server}</p>}

                <form autoComplete="on" onSubmit={handleSubmit} noValidate className="form">
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
                                <Link href="/privacy_policy" className="link">
                                    {`${t("privacy_policy_page")}.`}
                                </Link>
                            </p>
                        </label>
                        {errors.consent && <span className="error">{errors.consent}</span>}
                    </div>

                    <div className="recaptcha">
                        {recaptchaAvailable ? (
                            <ReCAPTCHA
                                sitekey={RECAPTCHA_SITE_KEY}
                                ref={recaptchaRef}
                                onChange={(token) => setRecaptchaToken(token ?? "")}
                                theme="light"
                            />
                        ) : (
                            <ConsentPlaceholder
                                text={
                                    RECAPTCHA_SITE_KEY.length === 0
                                        ? "Brak klucza reCAPTCHA w env (NEXT_PUBLIC_RECAPTCHA_SITE_KEY)."
                                        : t("accept_cookies_to_use_recaptcha")
                                }
                                onAccept={acceptCookies}
                                className="consent_placeholder"
                            >
                                <button type="button" onClick={acceptCookies}>
                                    {t("accept")}
                                </button>
                            </ConsentPlaceholder>
                        )}
                    </div>

                    {errors.recaptcha && <span className="error">{errors.recaptcha}</span>}

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

export default ContactPage;