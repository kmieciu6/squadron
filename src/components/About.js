import photo from "../assets/1.jpg";
import { useLanguage } from './translations/LanguageContext';
import { getTranslation } from "./translations/LanguageUtils";

const About = () => {
  const { currentLanguage } = useLanguage();

    return (
        <div className="about page">
            <h1>{getTranslation('about', currentLanguage)}</h1>
            <p>
                Ea fugiat fugiat minim ipsum culpa excepteur laboris dolore elit ipsum ipsum fugiat. Et pariatur qui duis Lorem 
                non non ipsum duis ex. Laboris ipsum aliqua fugiat quis tempor ullamco eiusmod commodo veniam ut excepteur nisi. 
                Id elit tempor nostrud aute nulla eu sit et.
            </p>
            <img src={photo} alt="obraz"/>
        </div>
    )
} 

export default About;