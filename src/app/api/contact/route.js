import nodemailer from "nodemailer";

export async function POST(req) {
    try {
        const { name, email, phone, message, consent } = await req.json();

        // Prosta walidacja po stronie serwera
        if (!name || !email || !message || !consent) {
            return new Response(
                JSON.stringify({ ok: false, error: "Missing required fields" }),
                { status: 400 }
            );
        }

        // transporter – użyj swoich danych SMTP
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: false, // jeśli 465 → true
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const mailOptions = {
            from: `"Strona WWW" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
            to: process.env.CONTACT_TO, // tutaj Twój mail docelowy
            subject: `Nowa wiadomość z formularza od: ${name}`,
            text: `
Imię i nazwisko: ${name}
Email: ${email}
Telefon: ${phone || "-"}
Zgoda: ${consent ? "TAK" : "NIE"}

Treść wiadomości:
${message}
            `.trim(),
        };

        await transporter.sendMail(mailOptions);

        return new Response(JSON.stringify({ ok: true }), { status: 200 });
    } catch (err) {
        console.error("Błąd wysyłki maila:", err);
        return new Response(
            JSON.stringify({ ok: false, error: "Server error" }),
            { status: 500 }
        );
    }
}