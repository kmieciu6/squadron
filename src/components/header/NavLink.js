import { Link, useLocation } from "react-router-dom";

const NavLink = ({ to, children, ...props }) => {
  const location = useLocation();

  const handleClick = (event) => {
    // Jeżeli jesteśmy już na danej ścieżce, przewiń stronę do góry
    if (location.pathname === to) {
      event.preventDefault();
      // window.scrollTo({ top: 0, behavior: "smooth" });
      window.scrollTo(0, 0);
    }
    // Jeżeli przekazano dodatkowy onClick, wywołaj go
    if (props.onClick) {
      props.onClick(event);
    }
  };

  return (
    <Link to={to} {...props} onClick={handleClick}>
      {children}
    </Link>
  );
};

export default NavLink;