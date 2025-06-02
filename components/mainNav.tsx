"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
  storeId: string;
}

export const MainNav = ({
  className,
  storeId,
  ...props
}: MainNavProps) => {
  const pathName = usePathname();

  const routes = [
    {
      href: `/${storeId}`,
      label: "Dashboard",
      active: pathName === `/${storeId}`,
    },
    {
      href: `/${storeId}/billboards`,
      label: "Billboards",
      active: pathName === `/${storeId}/billboards`,
    },
    {
      href: `/${storeId}/categories`,
      label: "Categories",
      active: pathName === `/${storeId}/categories`,
    },
    {
      href: `/${storeId}/products`,
      label: "Products",
      active: pathName === `/${storeId}/products`,
    },
    {
      href: `/${storeId}/colors`,
      label: "Colors",
      active: pathName === `/${storeId}/colors`,
    },
    {
      href: `/${storeId}/sizes`,
      label: "Sizes",
      active: pathName === `/${storeId}/sizes`,
    },
    {
      href: `/${storeId}/orders`,
      label: "Orders",
      active: pathName === `/${storeId}/orders`,
    },
    {
      href: `/${storeId}/settings`,
      label: "Settings",
      active: pathName === `/${storeId}/settings`,
    },
  ];
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};
