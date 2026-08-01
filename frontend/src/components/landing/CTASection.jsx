import { ArrowRight, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";

import Button from "../common/Button";

export default function CTASection() {
    return (
        <section className="relative overflow-hidden py-20 lg:py-24">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F4C81] via-[#0E7490] to-[#22A06B]" />

            {/* Decorative Blobs */}
            <div className="absolute -top-32 left-0 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

            <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 text-center lg:px-8">
                <motion.span
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="rounded-full border border-white/30 bg-white/10 px-5 py-2 text-sm font-semibold tracking-wide text-white backdrop-blur"
                >
                    JOIN THE BLUE CARBON MOVEMENT
                </motion.span>

                <motion.h2
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    viewport={{ once: true }}
                    className="mt-7 max-w-4xl text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl"
                >
                    Restore Coastal Ecosystems with
                    <span className="block text-emerald-300">
                        Transparency & Trust
                    </span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    viewport={{ once: true }}
                    className="mt-6 max-w-3xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8"
                >
                    Register projects, verify restoration activities,
                    issue blockchain-backed carbon credits and connect
                    with organizations committed to climate action.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    viewport={{ once: true }}
                    className="mt-10 flex flex-wrap justify-center gap-4"
                >
                    <Button
                        className="h-13 rounded-2xl bg-white px-7 text-[#0F4C81] hover:bg-slate-100"
                        rightIcon={<ArrowRight size={18} />}
                    >
                        Register Your Project
                    </Button>

                    <Button
                        variant="ghost"
                        className="h-13 rounded-2xl border border-white/40 px-7 text-white hover:bg-white/10"
                        leftIcon={<PlayCircle size={18} />}
                    >
                        Watch Demo
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}