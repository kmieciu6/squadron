import React, { useState } from "react";
import { useLanguage } from './translations/LanguageContext';
import { getTranslation } from "./translations/LanguageUtils";

const Contact = () => {
    const { currentLanguage } = useLanguage();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const [errors, setError] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        if (submitted) {
            setError({
                ...errors,
                [name]: ''
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm(formData, currentLanguage);
        if (Object.keys(errors).length === 0) {
            console.log('Formularz przesłany: ', formData);
            setError({});
            setSubmitted(true);
            setFormData({
                name: '',
                email: '',
                phone: '',
                message: ''
            });
        } else {
            setError(errors);
            setSubmitted(false);
        }
    };

    const validateForm = (data, currentLanguage) => {

        const errors = {};
        if (!data.name.trim()) {
            errors.name = getTranslation('field_required', currentLanguage);
        } else if (data.name.trim().length < 2) {
            errors.name = getTranslation('must_contain_two_letters', currentLanguage);
        }
        if (!data.message.trim()) {
            errors.message = getTranslation('field_required', currentLanguage);
        }
        if (!data.email.trim()) {
            errors.email = getTranslation('field_required', currentLanguage);
        } else if (!isValidEmail(data.email)) {
            errors.email = getTranslation('invalid_email', currentLanguage);
        }
        return errors;
    };

    const isValidEmail = (email) => {
        // Prosta walidacja adresu email
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      };

    return (
        <div className="contact">
            <h2>
                {getTranslation("write_to_us", currentLanguage)}
            </h2>
            <form autoComplete="on" onSubmit={handleSubmit} noValidate className="form">
                <label htmlFor="name">
                    <p>{getTranslation('name', currentLanguage)}</p>
                </label>
                <input type="text" id="name" name="name" className="input" autoComplete="name" value={formData.name} onChange={handleChange}/>
                {errors.name && <span className="error">{errors.name}</span>}
                <label htmlFor="email">
                    <p>{getTranslation('email', currentLanguage)}</p>
                </label>
                <input type="email" id="email" name="email" className="input" autoComplete="email" value={formData.email} onChange={handleChange}/>
                {errors.email && <span className="error">{errors.email}</span>}
                <label htmlFor="phone">
                    <p>{getTranslation('phone', currentLanguage)}</p>
                </label>
                <input type="tel" id="phone" name="phone" className="input" autoComplete="tel" value={formData.phone} onChange={handleChange}/>
                <label htmlFor="message">
                    <p>{getTranslation('message', currentLanguage)}</p>
                </label>
                <textarea id="message" name="message" className="input" value={formData.message} onChange={handleChange} rows={4}/>
                {errors.message && <span className="error">{errors.message}</span>}
                <button type='submit'>{getTranslation('send', currentLanguage)}</button>
                {submitted && Object.keys(errors).length === 0 && (
                    <p className="success">{getTranslation('form_submitted_successfully', currentLanguage)}</p>
                )}
            </form>
        </div>
    )
} 

export default Contact;