import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import linkedIn from "../assets/logo_linkedIn.png";
import logo from "../assets/logo_white.png";
import { useLanguage } from './translations/LanguageContext';
import { getTranslation } from "./translations/LanguageUtils";
import Contact from "./Contact";
import {AdvancedMarker, APIProvider, Map, } from '@vis.gl/react-google-maps';

const Footer = () => {
    // const { isLoaded, loadError } = useJsApiLoader({
    //     googleMapsApiKey: 'AIzaSyDjDAoTQpelI8spxHbPujrD8kj-0EZ63Bk'
    // });
    const { currentLanguage } = useLanguage();

    const center = {
        lat: 54.385569, 
        lng: 18.633790 
    };
    
    

    return (
        <div className="footer">
            <div className="info">
                <h1>
                    {getTranslation("contact", currentLanguage)}
                </h1>
                <APIProvider apiKey={'AIzaSyDjDAoTQpelI8spxHbPujrD8kj-0EZ63Bk'}>
                    <Map 
                        className="map" 
                        defaultZoom={14} 
                        defaultCenter={center}
                        mapId={"404f0de6d5b0dc31"}>
                        <AdvancedMarker position={center}/>
                    </Map>
                </APIProvider>
                <img src={logo} alt="logo" className="logo" />
                <h5>
                    ul. Narwicka 6
                    <br/>
                    80-557 Gdańsk
                </h5>
                <a href="tel:+48609690340">
                    <FontAwesomeIcon icon={faPhone} className="icon" />
                    <h5>
                        +48 609 690 340
                    </h5>
                </a>
                <a href="mailto:biuro@squadron.pl">
                    <FontAwesomeIcon icon={faEnvelope} className="icon" />
                    <h5>
                        biuro@squadron.pl
                    </h5>
                </a>
                <a href="https://pl.linkedin.com/company/squadron-sp.-z-o.o.">
                    <img src={linkedIn} alt="logo linkedIn" className="in"/>
                </a>
            </div>
            <Contact/>
        </div>
    )
};

export default Footer;