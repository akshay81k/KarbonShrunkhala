import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

const variants = {
    primary:
        "bg-[#22A06B] text-white shadow-lg shadow-emerald-200 hover:bg-[#1B8B5D]",

    secondary:
        "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50",

    ghost:
        "text-slate-700 hover:bg-slate-100",

    outline:
        "border border-[#22A06B] text-[#22A06B] hover:bg-[#22A06B] hover:text-white",
};

export default function Button({
    children,
    variant = "primary",
    className,
    leftIcon,
    rightIcon,
    ...props
}) {
    return (
        <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className={cn(
                "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#22A06B]/40",
                variants[variant],
                className
            )}
            {...props}
        >
            {leftIcon}
            {children}
            {rightIcon}
        </motion.button>
    );
}