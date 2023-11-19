"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

import { cn } from "~/lib/utils";

class NavRoute {
  label: string;
  href: string;
  active: boolean;

  constructor(label: string, href: string, active = false) {
    this.label = label;
    this.href = href;
    this.active = active;
  }
}

export function Navbar({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  const routes: Array<NavRoute> = [
    new NavRoute("Categories", "/categories"),
    new NavRoute("Cart", "/cart"),
    new NavRoute("Purchases", "/purchases"),
  ];

  routes.forEach((route) => {
    route.active = route.href === pathname;
  });

  return (
    <nav
      className={cn(
        "flex items-center justify-between space-x-4 px-4 py-4 lg:space-x-6",
        className,
      )}
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
