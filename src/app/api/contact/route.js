import nodemailer from "nodemailer";

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, email, phone, message, recaptchaToken } = body;

        // 1. Walidacja minimalna
        if (!name || !email || !message) {
            return Response.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // 2. Weryfikacja reCAPTCHA
        const secretKey = process.env.RECAPTCHA_SECRET_KEY;
        if (!secretKey) {
            console.error("Brak RECAPTCHA_SECRET_KEY w .env");
            return Response.json(
                { error: "Server configuration error" },
                { status: 500 }
            );
        }

        const recaptchaRes = await fetch(
            "https://www.google.com/recaptcha/api/siteverify",
            {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `secret=${secretKey}&response=${recaptchaToken}`,
            }
        );

        const recaptchaData = await recaptchaRes.json();

        if (!recaptchaData.success) {
            console.warn("reCAPTCHA failed:", recaptchaData);
            return Response.json(
                { error: "reCAPTCHA failed" },
                { status: 400 }
            );
        }

        // 3. Nodemailer – to samo co w Expressie, tylko w API route
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },

            // TYLKO DO TESTÓW LOKALNIE!!!
            // tls: {
            //     rejectUnauthorized: false
            // }
        });

        const mailOptions = {
            from: `"${name}" <${email}>`,
            to: process.env.CONTACT_TO || "jakub.kmiecik96@gmail.com",
            subject: `Wiadomość z formularza ze strony od ${name}`,
            text: `Imię: ${name}
Email: ${email}
Telefon: ${phone || "Nie podano."}
Wiadomość:
${message}`,
        };

        await transporter.sendMail(mailOptions);

        return Response.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Mail send failed:", error);
        return Response.json(
            { error: "Mail send failed" },
            { status: 500 }
        );
    }
}