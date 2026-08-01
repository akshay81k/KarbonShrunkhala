import { motion } from "framer-motion";

export default function BackgroundBlobs() {
    return (
        <>
            {/* Ocean Blue Blob */}
            <motion.div
                animate={{
                    scale: [1, 1.08, 1],
                    opacity: [0.25, 0.35, 0.25],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                }}
                className="absolute -top-52 -left-48 h-[34rem] w-[34rem] rounded-full bg-[#0F4C81]/20 blur-[120px]"
            />

            {/* Mangrove Green Blob */}
            <motion.div
                animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.20, 0.30, 0.20],
                }}
                transition={{
                    duration: 14,
                    repeat: Infinity,
                }}
                className="absolute right-0 top-40 h-[30rem] w-[30rem] rounded-full bg-[#22A06B]/20 blur-[120px]"
            />

            {/* Bottom Accent */}
            <div className="absolute bottom-0 left-0 h-80 w-full bg-gradient-to-t from-white to-transparent" />
        </>
    );
}