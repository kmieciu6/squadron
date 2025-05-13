'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ to, children, ...props }) => {
    const pathname = usePathname();

    const handleClick = (event) => {
        if (pathname === to) {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: "auto" });
        }

        if (props.onClick) props.onClick(event);
    };

    return (
        <Link href={to} {...props} onClick={handleClick}>
            {children}
        </Link>
    );
};

export default NavLink;