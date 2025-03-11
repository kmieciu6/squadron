import React, { useState } from "react";
import { useLanguage } from "./translations/LanguageContext";
import { getTranslation } from "./translations/LanguageUtils";

const Contact = () => {
    const { currentLanguage } = useLanguage();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });

    const [errors, setError] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        if (submitted) {
            setError({
                ...errors,
                [name]: ""
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm(formData, currentLanguage);
        if (Object.keys(errors).length === 0) {
            console.log("Formularz przesłany: ", formData);
            setError({});
            setSubmitted(true);
            setFormData({
                name: "",
                email: "",
                phone: "",
                message: ""
            });
        } else {
            setError(errors);
            setSubmitted(false);
        }
    };

    const validateForm = (data, currentLanguage) => {
        const errors = {};
        if (!data.name.trim()) {
            errors.name = getTranslation("field_required", currentLanguage);
        } else if (data.name.trim().length < 2) {
            errors.name = getTranslation("must_contain_two_letters", currentLanguage);
        }
        if (!data.message.trim()) {
            errors.message = getTranslation("field_required", currentLanguage);
        }
        if (!data.email.trim()) {
            errors.email = getTranslation("field_required", currentLanguage);
        } else if (!isValidEmail(data.email)) {
            errors.email = getTranslation("invalid_email", currentLanguage);
        }
        return errors;
    };

    const isValidEmail = (email) => {
        // Prosta walidacja adresu email
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    return (
        <section className="contact-hero">
            <div className="overlay"></div>

            {/* Główna treść: nagłówek + panel formularza */}
            <div className="contact-content">
                <h1>{getTranslation("contact", currentLanguage)}</h1>

                {/* Komunikat po udanym przesłaniu */}
                {submitted && Object.keys(errors).length === 0 && (
                    <p className="submitted-info">{getTranslation("form_submitted_successfully", currentLanguage)}</p>
                )}

                <div className="contact-form-glass">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">{getTranslation("name", currentLanguage)}</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="input"
                                value={formData.name}
                                onChange={handleChange}
                                autoComplete="name"
                            />
                            {errors.name && <span className="error">{errors.name}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">{getTranslation("email", currentLanguage)}</label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                className="input"
                                value={formData.email}
                                onChange={handleChange}
                                autoComplete="email"
                            />
                            {errors.email && <span className="error">{errors.email}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">{getTranslation("phone", currentLanguage)}</label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                className="input"
                                value={formData.phone}
                                onChange={handleChange}
                                autoComplete="tel"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">{getTranslation("message", currentLanguage)}</label>
                            <textarea
                                id="message"
                                name="message"
                                className="input"
                                value={formData.message}
                                onChange={handleChange}
                            />
                            {errors.message && <span className="error">{errors.message}</span>}
                        </div>

                        <button type="submit" className="send-btn">
                            {getTranslation("send", currentLanguage)}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;