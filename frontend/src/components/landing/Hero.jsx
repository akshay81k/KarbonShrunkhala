import { motion } from "framer-motion";
import {
    ShieldCheck,
    ArrowRight,
    PlayCircle,
    TrendingUp,
} from "lucide-react";

import heroImage from "../../assets/images/hero-ocean.png";

export default function Hero() {
    const stats = [
        {
            value: "120+",
            label: "Projects Submitted",
        },
        {
            value: "45.6K",
            label: "tCO₂ Credits Issued",
        },
        {
            value: "28",
            label: "NGO Partners",
        },
        {
            value: "15+",
            label: "Countries Impacted",
        },
    ];

    return (
        <section className="hero">
            <div className="hero-container">

                {/* LEFT */}

                <motion.div
                    className="hero-left"
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: .7 }}
                >

                    {/* Badge */}

                    <div className="hero-badge">

                        <ShieldCheck size={16} />

                        <span>
                            Transparent. Verifiable. Impactful.
                        </span>

                    </div>

                    {/* Heading */}

                    <h1 className="hero-title">

                        Building a{" "}

                        <span className="blue">
                            Blue Future
                        </span>

                        <br />

                        with{" "}

                        <span className="green">
                            Trust
                        </span>{" "}

                        and

                        <br />

                        <span className="green">
                            Technology
                        </span>

                    </h1>

                    {/* Description */}

                    <p className="hero-description">

                        KarbonShrunkhala is a blockchain-powered
                        Blue Carbon Registry & MRV platform helping
                        NGOs, verifiers and corporate buyers build
                        trust through satellite monitoring,
                        blockchain transparency and measurable
                        environmental impact.

                    </p>

                    {/* Buttons */}

                    <div className="hero-actions">

                        <button className="btn-primary">

                            Explore Marketplace

                            <ArrowRight size={18} />

                        </button>

                        <button className="btn-secondary">

                            <PlayCircle size={18} />

                            Learn How It Works

                        </button>

                    </div>

                    {/* Stats */}

                    <div className="hero-stats">

                        {stats.map((item, index) => (

                            <div
                                key={item.label}
                                className="stat-item"
                            >

                                <h3>{item.value}</h3>

                                <p>{item.label}</p>

                            </div>

                        ))}

                    </div>

                </motion.div>

                {/* RIGHT */}

                <motion.div
                    className="hero-right"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: .7 }}
                >

                    <div className="hero-image">

                        <img
                            src={heroImage}
                            alt="Mangrove Forest"
                        />

                        <div className="hero-image-overlay" />

                        {/* Floating Card */}

                        <div className="impact-card">

                            <div className="impact-header">

                                <div className="impact-dot" />

                                <span>
                                    Live Impact
                                </span>

                            </div>

                            <p className="impact-label">
                                NDVI Trend (6 Months)
                            </p>

                            <div className="impact-chart">

                                <svg
                                    viewBox="0 0 220 90"
                                    fill="none"
                                >

                                    <path
                                        d="
                    M4 74
                    L30 66
                    L58 52
                    L82 56
                    L108 38
                    L132 44
                    L160 24
                    L186 18
                    L214 6
                    "
                                        stroke="#22A06B"
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />

                                </svg>

                            </div>

                            <div className="impact-growth">

                                <TrendingUp size={22} />

                                <h2>+18.7%</h2>

                            </div>
                            <p className="impact-text">
                                Vegetation Health Increased
                                <br />
                                Across All Active Projects
                            </p>

                        </div>

                    </div>

                </motion.div>

            </div>
        </section>
    );
}