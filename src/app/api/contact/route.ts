import nodemailer from "nodemailer";
import {NextRequest} from "next/server";

type ContactBody = {
    name: string;
    email: string;
    phone?: string;
    message: string;
    recaptchaToken: string;
};

export async function POST(request: NextRequest) {
    try {
        const body = request.json() as Partial<ContactBody>;
        const { name, email, phone, message, recaptchaToken } = body;

        // 1. Walidacja minimalna
        if (!name || !email || !message || !recaptchaToken) {
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
                body: new URLSearchParams({
                    secret: secretKey,
                    response: recaptchaToken,
                }),
            }
        );

        const recaptchaData: { success?: boolean; ["error-codes"]?: string[] } =
            await recaptchaRes.json();

        if (!recaptchaData.success) {
            console.warn("reCAPTCHA failed:", recaptchaData);
            return Response.json(
                { error: "reCAPTCHA failed" },
                { status: 400 }
            );
        }

        const mailUser = process.env.MAIL_USER;
        const mailPass = process.env.MAIL_PASS;

        if (!mailUser || !mailPass) {
            console.error("Brak MAIL_USER / MAIL_PASS w env");
            return Response.json({ error: "Server configuration error" }, { status: 500 });
        }

        // 3. Nodemailer – to samo co w Expressie, tylko w API route
        const transporter = nodemailer.createTransport ({
            service: "gmail",
            auth: {
                user: mailUser,
                pass: mailPass,
            },

            // TYLKO DO TESTÓW LOKALNIE!!!
            // tls: {
            //     rejectUnauthorized: false
            // }
        });

        const to = process.env.CONTACT_TO;

        await transporter.sendMail({
            from: `"${name}" <${mailUser}>`,
            to,
            subject: `Wiadomość z formularza ze strony od ${name}`,
            text: `Imię: ${name}
Email: ${email}
Telefon: ${phone || "Nie podano."}
Wiadomość:
${message}`,
        });

        return Response.json({ success: true }, { status: 200 });
            } catch (error) {
        console.error("Mail send failed:", error);
        return Response.json(
            { error: "Mail send failed" },
            { status: 500 }
        );
    }
}