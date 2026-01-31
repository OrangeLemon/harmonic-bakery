"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useCart, MENU, MenuItem } from "@/components/bakery/CartContext";

const outlineColor = "#d9e6b0";

export default function MenuPage() {
    const { addToCart } = useCart();
    const [activeItem, setActiveItem] = useState<MenuItem | null>(null);
    const [option, setOption] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);
    const [notes, setNotes] = useState("");
    const [optionError, setOptionError] = useState("");

    const handleAddToCart = (item: MenuItem) => {
        if (item.options && !option) {
            setOptionError("Please select a flavor option.");
            return;
        }

        addToCart(item, option, quantity, notes);
        setAdded(true);

        setTimeout(() => {
            setAdded(false);
            setActiveItem(null);
            setOption("");
            setQuantity(1);
            setNotes("");
        }, 1000);
    };

    return (
        <section className="p-12">
            <h2
                className="text-6xl text-center mb-12 font-bold"
                style={{ color: outlineColor }}
            >
                Baked Goods
            </h2>

            <div className="grid md:grid-cols-4 gap-10">
                {MENU.map((item) => (
                    <Card
                        key={item.id}
                        onClick={() => {
                            setActiveItem(item);
                            setOption("");
                            setQuantity(1);
                            setNotes("");
                            setAdded(false);
                        }}
                        className="bg-[#6f7f5e] border-2 border-[var(--outline)] cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl"
                        style={{ "--outline": outlineColor } as React.CSSProperties}
                    >
                        <CardContent className="p-6">
                            <img
                                src={item.image}
                                className="w-full h-[220px] object-cover rounded-xl mb-3"
                                alt={item.name}
                            />
                            <h3 className="text-2xl font-bold" style={{ color: outlineColor }}>
                                {item.name}
                            </h3>
                            <p style={{ color: outlineColor }}>
                                {item.batchSize} {item.name}
                            </p>
                            <p style={{ color: outlineColor }}>
                                ${item.pricePerBatch} per batch
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* MODAL */}
            {activeItem && (
                <div
                    onClick={() => setActiveItem(null)}
                    className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fadeIn"
                >
                    <Card
                        onClick={(e) => e.stopPropagation()}
                        className="bg-[#6f7f5e] p-8 max-w-md relative text-[#f5f1e6] border-2"
                        style={{ borderColor: outlineColor }}
                    >
                        <button
                            className="absolute top-3 left-3"
                            onClick={() => setActiveItem(null)}
                        >
                            <X />
                        </button>

                        <img
                            src={activeItem.image}
                            className="w-full h-[260px] object-cover rounded-xl mb-4"
                            alt={activeItem.name}
                        />

                        <h2 className="text-3xl font-bold">{activeItem.name}</h2>
                        <p>{activeItem.description}</p>
                        <p><b>Ingredients:</b> {activeItem.ingredients}</p>

                        {activeItem.options && (
                            <div className="mt-2">
                                <select
                                    className="w-full p-2 rounded-md bg-[#ebe6d8] text-black border-2 border-[var(--outline)]"
                                    value={option}
                                    onChange={(e) => {
                                        setOption(e.target.value);
                                        setOptionError("");
                                    }}
                                >
                                    <option value="">Select Flavor</option>
                                    {activeItem.options.map((o) => (
                                        <option key={o}>{o}</option>
                                    ))}
                                </select>
                                {optionError && (
                                    <p className="text-red-400 text-sm mt-2">{optionError}</p>
                                )}
                            </div>
                        )}

                        <textarea
                            placeholder="Order Notes (optional)"
                            className="w-full p-2 mt-3 text-black rounded-md"
                            style={{ backgroundColor: "#f5f1e6" }}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />

                        <div className="flex items-center gap-4 mt-4">
                            <Button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>-</Button>
                            <span>
                                {quantity} {quantity === 1 ? "batch" : "batches"}
                            </span>
                            <Button onClick={() => setQuantity((q) => q + 1)}>+</Button>
                        </div>

                        <Button
                            onClick={() => handleAddToCart(activeItem)}
                            className="mt-6 w-full"
                            disabled={activeItem.options && !option}
                        >
                            {added ? "Added!" : "Add To Cart"}
                        </Button>
                    </Card>
                </div>
            )}
        </section>
    );
}
