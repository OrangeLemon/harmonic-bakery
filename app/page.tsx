"use client";

import { useCart } from "@/components/bakery/CartContext";

export default function HomePage() {
    const textBlack = "#000000";

    return (
        <section className="p-20 text-center space-y-8" style={{ color: textBlack }}>
            <img
                src="/Images/Menu/logo.png"
                alt="Logo"
                className="mx-auto h-80 mb-12"
            />

            <h2 className="text-6xl font-bold mt-6">
                Family owned, Handcrafted, Locally sourced pastry's and such
            </h2>

            <p className="text-2xl">Out of Dripping Springs Texas</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                {[1, 2, 3, 4].map(i => (
                    <img
                        key={i}
                        src="https://via.placeholder.com/400"
                        className="rounded-xl"
                        alt={`Bakery item ${i}`}
                    />
                ))}
            </div>
        </section>
    );
}
