import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function RoleCard({
    icon,
    title,
    description,
    action,
    color,
    bg,
}) {
    return (
        <motion.div
            whileHover={{
                y: -10,
                scale: 1.02,
            }}
            transition={{ duration: 0.28 }}
            className="role-card"
        >
            <div
                className="role-icon"
                style={{
                    background: bg,
                    color: color,
                }}
            >
                {icon}
            </div>

            <div className="role-content">
                <h3>{title}</h3>

                <p>{description}</p>
            </div>

            <button
                className="role-button"
                style={{ color }}
            >
                {action}

                <ArrowRight size={18} />
            </button>
        </motion.div>
    );
}