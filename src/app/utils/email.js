const fetch = require("node-fetch");
const mustache = require("mustache");
const mjml = require("mjml");
const nodemailer = require('nodemailer');

const mjmlTemplate = `
<mjml>
    <mj-head>
        <mj-title>Magic Post</mj-title>
        <mj-font name="Roboto" href="https://fonts.googleapis.com/css?family=opensans:300,500"></mj-font>
        <mj-attributes>
            <mj-all font-family="Roboto, Helvetica, sans-serif"></mj-all>
            <mj-text font-weight="300" font-size="16px" color="#616161" line-height="24px"></mj-text>
            <mj-section padding="0px"></mj-section>
        </mj-attributes>
    </mj-head>
    <mj-body>

        <mj-section>
            <mj-column width="100%">
                
                <mj-text align="center" font-weight="900" padding="0px" font-size="22px">Password Reset Request
                </mj-text>
                <mj-text align="center" font-weight="500" padding-top="15px" font-size="20px">Magic Post
                </mj-text>
            </mj-column>
        </mj-section>

        <mj-section>
            <mj-column width="100%">
                <mj-text padding-top="20px">
                    <p>Hello,</p>

                    <p>Trust this message finds you in good health and high spirits.
                    </p>

                    <p>We acknowledge the receipt of your recent request to reset the password linked to your account with <strong>Magic Post</strong>. Security and confidentiality are paramount to us, and as such, we require your explicit confirmation before proceeding with the password reset process.
                    </p>

                    <p>If you initiated this request, kindly proceed by following the secure link provided below:
[Password Reset Link]
                    </p>
                </mj-text>


                <mj-button background-color="#4d91eb" color="#ffffff" font-size="15px"
                           href="{{link}}">Password Reset Link
                </mj-button>


                <mj-text>
                    In the event that you did not initiate this password reset request or if you harbor any reservations regarding the security of your account, we urge you to contact our dedicated support team promptly. You can reach us via email at <strong>support@magicpost.com</strong> or by phone at <strong>0969606295</strong>. Your prompt action is crucial in ensuring the integrity of your account.
                    <p>
                  When selecting a new password, we strongly advise that you choose a combination that is robust and unique to fortify the security of your account. Should you encounter any challenges during this process or if you require further assistance, please do not hesitate to reach out to our support team.

We appreciate your prompt attention to this matter and thank you for entrusting us with the security of your account.</p>
                </mj-text>

                <mj-text>
                    <p>Kind regards,</p>
                    <p>
                        <strong>
                            <i>Magic Post</i>
                        </strong>
                    </p>
                </mj-text>


                <mj-spacer height="50px"></mj-spacer>

            </mj-column>
        </mj-section>


        <mj-section>

            <mj-column width="100%">
                <mj-divider border-width="0.5px" border-color="#616161" width="80%"></mj-divider>
            </mj-column>

            <mj-column width="20%" vertical-align="middle">
                <mj-image href="https://www.facebook.com/SupportGroupUET"
                          src="https://raw.githubusercontent.com/Haha6400/MJML/main/magicPost.png">
                </mj-image>
            </mj-column>
            <mj-column width="80%">
                <mj-text font-size="15px">
                    <strong>MAGIC POST</strong>
                </mj-text>

                <mj-text line-height="18px">
                    <p>
                        <strong>Email:</strong>
                        <a href="mailto:psjily@gmail.com">support@magicpost.com</a>
                    </p>
                    <p>
                        <strong>Fanpage:</strong>
                        <a>facebook.com/MagicPost</a>
                    </p>
                    <p>
                        <strong>Address</strong>
                        144 Xuan Thuy, Cau Giay, Ha Noi
                    </p>
                </mj-text>

                <mj-social align="center" icon-size="30px">
                    <mj-social-element href="https://www.facebook.com/SupportGroupUET"
                                       name="facebook"></mj-social-element>
                    <mj-social-element href="https://www.youtube.com/c/SGUET/" name="youtube"></mj-social-element>
                    <mj-social-element href="https://www.instagram.com/sguet_cfs/" name="instagram"></mj-social-element>
                    <mj-social-element href="mailto:lienhe.sguet@gmail.com" name="google"></mj-social-element>
                </mj-social>
            </mj-column>
        </mj-section>


        <mj-section>
            <mj-column width="65%">

            </mj-column>
        </mj-section>
    </mj-body>
</mjml>
`

// const renderedMJML = mustache.render(mjmlTemplate, templateData);

// const html =  mjml(renderedMJML).html;
// don't forget the `.html`

const sendEmail = async (email, subject, link) => {
    try{

        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            service: process.env.EMAIL_SERVICE,
            port: process.env.EMAIL_PORT,
            secure: true,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        const renderedMJML = mustache.render(mjmlTemplate, {"link": link});

        const html =  mjml(renderedMJML).html;

        await transporter.sendMail({
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: subject,
            html: html,
        });

        console.log("email sent successfully");
    } catch (err) {
        console.log(err, "email not sent");
    }
}

module.exports = sendEmail;