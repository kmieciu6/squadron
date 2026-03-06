'use client';
import useTranslation from '../hooks/useTranslation';
import photo from "../../../public/images/1.jpg";
import useIntersectionHide from '../hooks/useIntersectionHide';
import Image from "next/image";

export default function About() {
    const { t } = useTranslation('common')
    const [sec1Ref, isSec1Hidden] = useIntersectionHide();

    return (
        <section className="about-section page">
            {/* Górna fala (SVG) */}
            <div className="wave-top">
                <svg
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                >
                    <path
                        d="M321.39,56.13C202.87,82,107.55,106.23,0,120V0H1200V30.73c-95.66,26.81-205.43,54.86-321.39,25.4C735.49,13.14,613,83.45,489.91,106.07,403.45,121.42,349.17,38.57,321.39,56.13Z"
                        className="shape-fill"
                        ></path>
                </svg>
            </div>

            <div ref={sec1Ref} className={`text text1 text_width ${isSec1Hidden ? 'hidden' : ''}`}>
                {/* Główna zawartość */}
                <div className="about-container">
                    <div className="about-text">
                        <h1>{t("about")}</h1>
                        <h2>{t("about_title1")}</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent elementum eget magna in aliquam. Morbi odio erat, 
                            porta eu luctus vitae, iaculis a diam. Nam congue elit a vestibulum suscipit. Pellentesque dapibus lorem urna, 
                            vitae lacinia lorem rutrum nec. Curabitur et semper tellus, eu sollicitudin magna. Sed egestas metus vel vehicula 
                            consequat. Integer in posuere sapien, ac porta nulla. Mauris et diam diam.
                        </p>

                        <h2>{t("about_title2")}</h2>
                        <p>
                            Vestibulum augue nisl, tincidunt et consequat vitae, tempus quis ex. Nullam posuere, felis et ultricies consequat, 
                            leo ex malesuada metus, sed porttitor est velit a ligula. Duis aliquet lorem nec purus viverra, ac facilisis neque 
                            volutpat. Mauris et velit quis nisl aliquam pulvinar ut id neque. Nulla ut dui tempus, semper libero nec, posuere neque.
                            Vivamus placerat egestas convallis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; 
                            In porta in sapien in egestas.
                        </p>

                        <h2>{t("about_title3")}</h2>
                        <p>
                            Suspendisse potenti. Curabitur nec nisl quis est tempus suscipit a sed turpis. Integer laoreet lobortis odio, ac 
                            congue nisl tincidunt at. Cras ex lorem, rhoncus sed nibh eget, fringilla volutpat metus. Phasellus sed ultrices nisl, 
                            at luctus nulla. Fusce rutrum lacus id risus ultrices dignissim. Pellentesque commodo, odio at fermentum ullamcorper, 
                            velit ligula mattis leo, eu bibendum massa arcu a neque.
                        </p>
                    </div>

                    <div className="about-image">
                        <Image src={photo.src} alt="Obraz"
                           width={photo.width}
                           height={photo.height}
                           style={{ width: "100%", height: "auto" }}/>
                    </div>
                </div>
            </div>
            {/* Dolna fala (SVG) */}
            <div className="wave-bottom">
                <svg
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                >
                    <path
                        d="M985.66,83.13c-62.72,23.06-142.51,35.69-221,36.42-104.79.91-187.71-21.34-287.6-42.65C382.63,50.35,262.65,28,120.21,28H0V120H1200V66.94C1144.31,72.52,1081.48,60.07,985.66,83.13Z"
                        className="shape-fill"
                        ></path>
                </svg>
            </div>
        </section>
    );
}