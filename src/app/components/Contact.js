"use client";
import React, { useState } from "react";
import useTranslation from "../hooks/useTranslation";

const Contact = () => {
    const { t } = useTranslation('common')
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        consent: false
    });

    const [errors, setError] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const {name, value, checked, type} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (submitted) {
            setError((prevErrors) => ({
                ...prevErrors,
                [name]: ''
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm(formData, t);
        if (Object.keys(errors).length === 0) {
            console.log('Formularz przesłany: ', formData);
            setError({});
            setSubmitted(true);
            setFormData({
                name: '',
                email: '',
                phone: '',
                message: '',
                consent: false
            });
        } else {
            setError(errors);
            setSubmitted(false);
        }
    };

    const validateForm = (data) => {

        const errors = {};
        if (!data.name.trim()) {
            errors.name = t('field_required');
        } else if (data.name.trim().length < 2) {
            errors.name = t('must_contain_two_letters');
        }
        if (!data.message.trim()) {
            errors.message = t('field_required');
        }
        if (!data.email.trim()) {
            errors.email = t('field_required');
        } else if (!isValidEmail(data.email)) {
            errors.email = t('invalid_email');
        }
        if (!data.consent) {
            errors.consent = t('consent');
        }
        return errors;
    };

    const isValidEmail = (email) => {
        // Prosta walidacja adresu email
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      };

    return (
        <div className="contact_container">
            <h2>
                {t("write_to_us")}
            </h2>
            <form 
                autoComplete="on" 
                onSubmit={handleSubmit} 
                noValidate 
                className="form"
            >
                <label htmlFor="name">
                    <p>{t('name')}</p>
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
                    <p>{t('email')}</p>
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
                    <p>{t('phone')}</p>
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
                    <p>{t('message')}</p>
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
                        <span className="checkmark"/>
                        <p>
                            {t('consent_text')}
                        </p>
                    </label>
                    {errors.consent && <span className="error">{errors.consent}</span>}
                </div>

                <div className="button">
                    <button type='submit'>{t('send')}</button>
                </div>
                {submitted && Object.keys(errors).length === 0 && (
                    <p className="success">{t('form_submitted_successfully')}</p>
                )}
            </form>
        </div>
    )
} 

export default Contact;