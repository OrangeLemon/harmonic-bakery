"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface MenuItem {
    id: string;
    name: string;
    batchSize: number;
    pricePerBatch: number;
    options?: string[];
    description: string;
    ingredients: string;
    image: string;
}

export interface CartItem extends MenuItem {
    cartId: string;
    option: string;
    batches: number;
    notes: string;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: MenuItem, option: string, quantity: number, notes: string) => void;
    removeItem: (cartId: string) => void;
    adjustQty: (cartId: string, delta: number) => void;
    clearCart: () => void;
    itemCount: number;
    cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        const savedCart = localStorage.getItem("hb_cart");
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("hb_cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item: MenuItem, option: string, quantity: number, notes: string) => {
        setCart((prev) => [
            ...prev,
            {
                ...item,
                cartId: crypto.randomUUID(),
                option,
                batches: quantity,
                notes,
            },
        ]);
    };

    const removeItem = (cartId: string) => {
        setCart((prev) => prev.filter((i) => i.cartId !== cartId));
    };

    const adjustQty = (cartId: string, delta: number) => {
        setCart((prev) =>
            prev.map((i) =>
                i.cartId === cartId
                    ? { ...i, batches: Math.max(1, i.batches + delta) }
                    : i
            )
        );
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem("hb_cart");
    };

    const itemCount = cart.reduce((s, i) => s + i.batches, 0);
    const cartTotal = cart.reduce((s, i) => s + i.batches * i.pricePerBatch, 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeItem,
                adjustQty,
                clearCart,
                itemCount,
                cartTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within CartProvider");
    return context;
};

export const MENU: MenuItem[] = [
    {
        id: "muffins",
        name: "Muffins",
        batchSize: 6,
        pricePerBatch: 18,
        options: ["Blueberry", "Strawberry", "Raspberry", "Chocolate Chip", "Banana Nut"],
        description: "Soft, bakery-style muffins made fresh.",
        ingredients: "Flour, sugar, eggs, milk, butter, fruit",
        image: "/Images/Menu/blueberry-muffins-square.jpg",
    },
    {
        id: "danishes",
        name: "Cream Cheese Danishes",
        batchSize: 6,
        pricePerBatch: 18,
        options: ["Blueberry", "Strawberry", "Raspberry"],
        description: "Flaky pastry with sweet cream cheese filling.",
        ingredients: "Flour, butter, cream cheese, sugar, eggs",
        image: "/Images/Menu/199-blueberry-cream-cheese-danish-3-768x1024.jpg",
    },
    {
        id: "cinnamon",
        name: "Cinnamon Rolls",
        batchSize: 12,
        pricePerBatch: 36,
        description: "Soft rolls with cinnamon sugar swirl.",
        ingredients: "Flour, yeast, cinnamon, sugar, butter",
        image: "/Images/Menu/cinnamonbun_800x.jpg",
    },
    {
        id: "scones",
        name: "White Chocolate Scones",
        batchSize: 6,
        pricePerBatch: 16,
        description: "Tender scones with white chocolate",
        ingredients: "Flour, cream, butter, white chocolate",
        image: "/Images/Menu/Scones.jpeg",
    },
];
