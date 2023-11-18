"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { cn } from "~/lib/utils";

class NavRoute {
    label: string
    href: string
    active: boolean

    constructor(label: string, href: string, active: boolean = false) {
        this.label = label
        this.href = href
        this.active = active
    }
}

export default function Navbar({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname();

    const routes: Array<NavRoute> = [
        new NavRoute("Categories", "/categories"),
        new NavRoute("Cart", "/cart"),
        new NavRoute("Purchases", "/purchases")
    ];

    routes.forEach((route) => {
        route.active = route.href === pathname
    })

    return (
        <nav
            className={cn("flex justify-between items-center space-x-4 lg:space-x-6 py-4 px-4", className)}
            {...props}
        >
            <h2 className="text-4xl">Soko</h2>
            <ul className="flex space-x-6">
                {routes.map((route) => (
                    <li key={route.href}>
                        <Link
                            href={route.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary",
                                route.active
                                    ? "text-black dark:text-white"
                                    : "text-muted-foreground",
                            )}
                        >
                            {route.label}
                        </Link>
                    </li>

                ))}
                <li>
                    <UserButton afterSignOutUrl="/" />
                </li>
            </ul>

        </nav>
    );
}