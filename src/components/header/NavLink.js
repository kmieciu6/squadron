import { Link, useLocation } from "react-router-dom";

const NavLink = ({ to, children }) => {
  const location = useLocation();

  const handleClick = (event) => {
    if (location.pathname === to) {
      event.preventDefault(); // Zatrzymuje przeładowanie, jeśli już jesteśmy na stronie
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Link to={to} onClick={handleClick}>
      {children}
    </Link>
  );
};

export default NavLink;