import {
    ShieldCheck,
    Satellite,
    Blocks,
    Leaf,
} from "lucide-react";

const features = [
    {
        icon: <Blocks size={24} />,
        title: "Blockchain Secured",
        description:
            "All project data and credits are secured on-chain for complete transparency.",
    },
    {
        icon: <Satellite size={24} />,
        title: "Satellite Verified",
        description:
            "Powered by advanced satellite analytics for accurate restoration monitoring.",
    },
    {
        icon: <ShieldCheck size={24} />,
        title: "Immutable & Transparent",
        description:
            "Every step is recorded, verified and cannot be tampered with.",
    },
    {
        icon: <Leaf size={24} />,
        title: "Real Environmental Impact",
        description:
            "Driving measurable change in ocean and coastal ecosystems.",
    },
];

export default function FeaturesSection() {
    return (
        <section className="features-strip">
            <div className="features-strip-container">

                <div className="features-strip-card">

                    {features.map((feature, index) => (
                        <div
                            key={feature.title}
                            className={`feature-strip-item ${index !== features.length - 1
                                ? "feature-divider"
                                : ""
                                }`}
                        >
                            <div className="feature-strip-icon">
                                {feature.icon}
                            </div>

                            <div className="feature-strip-content">
                                <h3>{feature.title}</h3>

                                <p>{feature.description}</p>
                            </div>
                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
}