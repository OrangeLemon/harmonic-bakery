"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const outlineColor = "#d9e6b0";

export function Navbar({ itemCount }: { itemCount: number }) {
    const pathname = usePathname();

    const links = [
        { name: "HOME", path: "/" },
        { name: "MENU", path: "/menu" },
        { name: "CONTACT", path: "/contact" },
    ];

    return (
        <>
            <nav className="flex justify-between p-6 items-center">
                <Link
                    href="/"
                    style={{ color: outlineColor }}
                    className="text-5xl font-bold flex items-center gap-1"
                >
                    Harm
                    <img
                        src="/Images/Menu/logo.png"
                        className="h-10 w-10 inline-block"
                        alt="logo"
                    />
                    nic Bakery
                </Link>

                <div className="flex gap-6 items-center">
                    {links.map((link) => (
                        <Link
                            key={link.path}
                            href={link.path}
                            className={`px-6 py-2 text-xl border rounded-lg transition-colors ${pathname === link.path ? "bg-[#d9e6b0]/10" : ""
                                }`}
                            style={{ borderColor: outlineColor, color: outlineColor }}
                        >
                            {link.name}
                        </Link>
                    ))}

                    <Link href="/cart" className="relative cursor-pointer">
                        <ShoppingCart size={32} color={outlineColor} />
                        {itemCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-2 rounded-full text-white">
                                {itemCount}
                            </span>
                        )}
                    </Link>
                </div>
            </nav>
            <div className="w-full h-[1px]" style={{ backgroundColor: outlineColor }} />
        </>
    );
}
