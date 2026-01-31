"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { useCart } from "@/components/bakery/CartContext";
import { useForm } from "@formspree/react";

export default function CartPage() {
    const { cart, adjustQty, removeItem, cartTotal, clearCart } = useCart();
    const [pickupTime, setPickupTime] = useState("");
    const [fulfillment, setFulfillment] = useState("Pickup");
    const [address, setAddress] = useState("");
    const [showConfirmation, setShowConfirmation] = useState(false);

    const [state, handleSubmit] = useForm("xojwvzdp");

    const isTimeValid = () => {
        if (!pickupTime) return false;
        return (new Date(pickupTime).getTime() - new Date().getTime()) / 36e5 >= 24;
    };

    const onOrderSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isTimeValid()) return;

        // Formspree handle will take the form data
        await handleSubmit(e);

        if (state.succeeded) {
            setShowConfirmation(true);
            clearCart();
        }
    };

    const textBlack = "#000000";

    if (cart.length === 0 && !showConfirmation) {
        return (
            <section className="p-20 text-center">
                <h2 className="text-4xl font-bold" style={{ color: textBlack }}>Your cart is empty</h2>
                <Button className="mt-8" onClick={() => window.location.href = '/menu'}>Go to Menu</Button>
            </section>
        );
    }

    return (
        <section className="max-w-xl mx-auto p-16 space-y-8" style={{ color: textBlack }}>
            <h2 className="text-5xl font-bold text-center">Your Cart</h2>

            {cart.map((i) => (
                <div key={i.cartId} className="grid grid-cols-3 gap-4 items-center border-b pb-4">
                    <div>
                        <b className="text-lg">{i.name}</b>
                        {i.option && <div>({i.option})</div>}
                        {i.notes && <div className="italic text-sm">"{i.notes}"</div>}
                    </div>

                    <div className="flex justify-center items-center gap-2">
                        <Button variant="outline" onClick={() => adjustQty(i.cartId, -1)}>-</Button>
                        <span className="font-semibold text-lg">{i.batches}</span>
                        <Button variant="outline" onClick={() => adjustQty(i.cartId, 1)}>+</Button>
                    </div>

                    <div className="text-right space-y-2">
                        <div className="text-lg font-bold">${i.batches * i.pricePerBatch}</div>
                        <button
                            onClick={() => removeItem(i.cartId)}
                            className="text-red-600 hover:text-red-800 ml-auto block"
                        >
                            <Trash2 size={24} />
                        </button>
                    </div>
                </div>
            ))}

            <div className="text-2xl font-bold flex justify-between items-center pt-4">
                <span>Total:</span>
                <span>${cartTotal}</span>
            </div>

            <form onSubmit={onOrderSubmit} className="space-y-6 bg-white/50 p-8 rounded-xl shadow-inner">
                <div className="grid grid-cols-1 gap-4">
                    <input required name="name" placeholder="Your Name" className="p-3 border rounded-md" />
                    <input required type="email" name="email" placeholder="Your Email" className="p-3 border rounded-md" />

                    <div className="space-y-2">
                        <label className="block font-semibold">Fulfillment Method</label>
                        <select
                            value={fulfillment}
                            onChange={(e) => setFulfillment(e.target.value)}
                            className="w-full p-3 border rounded-md bg-white"
                            name="fulfillment"
                        >
                            <option>Pickup</option>
                            <option>Delivery</option>
                        </select>
                    </div>

                    {fulfillment === "Delivery" && (
                        <div className="space-y-2">
                            <input
                                required
                                name="address"
                                placeholder="Delivery Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full p-3 border rounded-md"
                            />
                            <p className="italic text-sm text-gray-600">We will contact you for a delivery quote.</p>
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="block font-semibold">Pickup/Delivery Time (24h+ notice)</label>
                        <input
                            type="datetime-local"
                            name="time"
                            value={pickupTime}
                            onChange={(e) => setPickupTime(e.target.value)}
                            className="w-full p-3 border rounded-md"
                            required
                        />
                        {!isTimeValid() && pickupTime && (
                            <p className="text-red-500 text-sm">
                                Must be at least 24 hours in advance.
                            </p>
                        )}
                    </div>
                </div>

                <input type="hidden" name="order" value={JSON.stringify(cart)} />

                <Button
                    type="submit"
                    className="w-full h-14 text-xl"
                    disabled={!cart.length || !isTimeValid() || state.submitting}
                >
                    {state.submitting ? "Placing Order..." : "Place Order"}
                </Button>
            </form>

            {showConfirmation && (
                <div
                    onClick={() => setShowConfirmation(false)}
                    className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100]"
                >
                    <Card className="bg-emerald-900 p-10 text-center text-white border-2 border-[#d9e6b0]">
                        <h2 className="text-5xl font-bold">Order Received!</h2>
                        <p className="mt-4 text-xl">A confirmation email has been sent.</p>
                        <Button
                            variant="outline"
                            className="mt-8 border-white text-white hover:bg-white hover:text-emerald-900"
                            onClick={() => setShowConfirmation(false)}
                        >
                            Close
                        </Button>
                    </Card>
                </div>
            )}
        </section>
    );
}
