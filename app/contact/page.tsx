"use client";

export default function ContactPage() {
    const textBlack = "#000000";

    return (
        <section className="p-20 text-center space-y-6" style={{ color: textBlack }}>
            <h2 className="text-6xl font-bold mb-10">Contact Us</h2>

            <div className="bg-white/40 p-12 rounded-2xl max-w-2xl mx-auto backdrop-blur-sm border-2 border-[#d9e6b0]/30 shadow-xl">
                <div className="space-y-8">
                    <div>
                        <h3 className="text-2xl font-bold mb-2">Email</h3>
                        <p className="text-3xl text-emerald-800">micahepps777@gmail.com</p>
                    </div>

                    <div className="w-24 h-px bg-[#d9e6b0] mx-auto"></div>

                    <div>
                        <h3 className="text-2xl font-bold mb-2">Phone</h3>
                        <p className="text-3xl text-emerald-800">+1 (435) 324-1209</p>
                    </div>

                    <div className="w-24 h-px bg-[#d9e6b0] mx-auto"></div>

                    <div>
                        <h3 className="text-2xl font-bold mb-2">Location</h3>
                        <p className="text-3xl text-emerald-800">Dripping Springs, Texas</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
