import { motion } from "framer-motion";

export default function FeatureCard({
    icon,
    title,
    description,
}) {
    return (
        <motion.div
            whileHover={{
                y: -8,
            }}
            transition={{ duration: 0.25 }}
            className="feature-card"
        >
            <div className="feature-icon">
                {icon}
            </div>

            <div className="feature-content">
                <h3>{title}</h3>

                <p>{description}</p>
            </div>
        </motion.div>
    );
}