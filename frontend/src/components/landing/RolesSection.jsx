import {
    Leaf,
    Shield,
    BriefcaseBusiness,
    BarChart3,
} from "lucide-react";

import RoleCard from "./RoleCard";

export default function RolesSection() {
    return (
        <section className="roles-section">
            <div className="mx-auto max-w-[1380px] px-6 lg:px-8">
                {/* Heading */}

                <div className="roles-header">
                    <Leaf
                        size={20}
                        className="text-[#22A06B]"
                    />

                    <h2 className="font-['Plus_Jakarta_Sans'] text-[34px] font-bold tracking-tight text-slate-900 lg:text-[42px]">
                        Built for Every Impact Partner
                    </h2>

                    <Leaf
                        size={20}
                        className="text-[#22A06B]"
                    />
                </div>

                {/* Cards */}

                <div className="roles-grid">
                    <RoleCard
                        icon={<Leaf size={28} />}
                        title="For NGOs"
                        description="Submit and manage blue carbon projects, upload evidence and track restoration progress."
                        action="Get Started"
                        color="#22A06B"
                        bg="#E9F8F1"
                    />

                    <RoleCard
                        icon={<Shield size={28} />}
                        title="For Verifiers"
                        description="Review satellite imagery, verify MRV evidence and approve restoration projects."
                        action="Start Verifying"
                        color="#2563EB"
                        bg="#EAF2FF"
                    />

                    <RoleCard
                        icon={<BriefcaseBusiness size={28} />}
                        title="Corporate Buyers"
                        description="Purchase verified blue carbon credits while supporting coastal ecosystem restoration."
                        action="Explore Marketplace"
                        color="#8B5CF6"
                        bg="#F2EAFF"
                    />

                    <RoleCard
                        icon={<BarChart3 size={28} />}
                        title="For Admins"
                        description="Monitor platform activity, manage users and ensure complete system transparency."
                        action="Admin Login"
                        color="#F59E0B"
                        bg="#FFF6E5"
                    />
                </div>
            </div>
        </section>
    );
}