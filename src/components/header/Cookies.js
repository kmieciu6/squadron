import CookieConsent from "react-cookie-consent";
import {Link} from "react-router-dom";

const Cookies = () => {
    return (
        <>
            <CookieConsent
                location="bottom"
                buttonText="Rozumiem i akceptuje"
                cookieName="myAwesomeCookieName2"
                style={{background: "#2B373B", opacity: .9}}
                buttonStyle={{background: "orange", color: "black", fontSize: "17px", padding: '0.6rem 1rem'}}
                expires={150}
            >
                Strona korzysta z plików cookie w celu poprawienia jej dostępności, personalizacji czy aby zbierać dane, dotyczące ruchu na stronie. Każdy może sam decydować o tym czy dopuszcza pliki cookies, ustawiając odpowiednio swoją przeglądarkę.
                <br/>
                Więcej informacji znajdziesz w 
                {" "}
                <Link to="/privacy_policy"
                      className='terms_cookies'
                      onClick={() => {
                          window.scroll({
                              top: 0,
                              left: 0,
                              behavior: "smooth",
                          });
                      }}>
                    Polityce Prywatności i Regulaminie.                
                </Link>
            </CookieConsent>
        </>
    )
}

export default Cookies;