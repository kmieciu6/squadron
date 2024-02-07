import React, { useState } from "react";

const Contact = () => {
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
        const errors = validateForm(formData);
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

    const validateForm = (data) => {
        const errors = {};
        if (!data.name.trim()) {
            errors.name = 'Pole jest wymagane';
        } else if (data.name.trim().length < 2) {
            errors.name = 'Imię musi zawierać co najmniej dwie litery'
        }
        if (!data.message.trim()) {
            errors.message = 'Pole jest wymagane';
        }
        if (!data.email.trim()) {
            errors.email = 'Email jest wymagany';
        } else if (!isValidEmail(data.email)) {
            errors.email = 'Nieprawidłowy adres email';
        }
        return errors;
    };

    const isValidEmail = (email) => {
        // Prosta walidacja adresu email, można użyć bardziej zaawansowanych metod
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      };

    return (
        <section className="contact">
            <h1>Kontakt</h1>
            {submitted && Object.keys(errors).length === 0 && (
                <p>Formularz został pomyślnie przesłany!</p>
            )}
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">
                    <p>Imię</p>
                </label>
                <input type="text" id="name" name="name" className="input" value={formData.name} onChange={handleChange}/>
                {errors.name && <span className="error">{errors.name}</span>}
                <label htmlFor="email">
                    <p>Email</p>
                </label>
                <input type="text" id="email" name="email" className="input" value={formData.email} onChange={handleChange}/>
                {errors.email && <span className="error">{errors.email}</span>}
                <label htmlFor="phone">
                    <p>Telefon</p>
                </label>
                <input type="text" id="phone" name="phone" className="input" value={formData.phone} onChange={handleChange}/>
                <label htmlFor="message">
                    <p>Wiadomość</p>    
                </label>
                <textarea id="message" name="message" className="input" value={formData.message} onChange={handleChange}/>
                {errors.message && <span className="error">{errors.message}</span>}
                <button type='submit'>Wyślij</button>
            </form>
        </section>
    )
} 

export default Contact;
