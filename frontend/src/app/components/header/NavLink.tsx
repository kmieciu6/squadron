'use client';

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, MouseEvent } from "react";

type NavLinkProps = Omit<LinkProps, 'href'> & {
    to: string;
    children: ReactNode;
    className?: string;
    onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
    target?: string;
};

const NavLink = ({ to, children, onClick, ...props }: NavLinkProps) => {
    const pathname = usePathname();

    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        if (pathname === to) {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: "auto" });
        }

        onClick?.(event);
    };

    return (
        <Link href={to} {...props} onClick={handleClick}>
            {children}
        </Link>
    );
};

export default NavLink;