import { Link } from "react-router-dom";
import {
  Leaf,
  Globe,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-grid">

          {/* Brand */}

          <div className="footer-brand">

            <Link
              to="/"
              className="footer-logo"
            >
              <div className="footer-logo-icon">
                <Leaf size={24} />
              </div>

              <div>

                <h2>
                  Karbon
                  <span>Shrunkhala</span>
                </h2>

                <p>
                  Blockchain Blue Carbon Registry
                </p>

              </div>

            </Link>

            <p className="footer-description">
              KarbonShrunkhala is a blockchain-powered Blue Carbon Registry &
              MRV platform enabling transparent monitoring, verification and
              tokenization of coastal ecosystem restoration projects across
              India.
            </p>

          </div>

          {/* Platform */}

          <div className="footer-column">

            <h3>Platform</h3>

            <Link to="/">Home <ArrowUpRight size={15} /></Link>

            <Link to="/#how-it-works">How It Works <ArrowUpRight size={15} /></Link>

            <Link to="/#marketplace">Marketplace <ArrowUpRight size={15} /></Link>

            <Link to="/#projects">Projects <ArrowUpRight size={15} /></Link>

          </div>

          {/* Stakeholders */}

          <div className="footer-column">

            <h3>Stakeholders</h3>

            <Link to="/register">NGOs</Link>

            <Link to="/login">Verifiers</Link>

            <Link to="/login">Corporate Buyers</Link>

            <Link to="/login">Government</Link>

          </div>

          {/* Tech */}

          <div className="footer-column">

            <h3>Technology</h3>

            <div className="footer-tech">

              <Globe size={18} />

              <div>

                <strong>Google Earth Engine</strong>

                <span>Sentinel-2 Monitoring</span>

              </div>

            </div>

            <div className="footer-tech">

              <ShieldCheck size={18} />

              <div>

                <strong>Polygon Blockchain</strong>

                <span>Immutable Carbon Registry</span>

              </div>

            </div>

          </div>

        </div>

        <div className="footer-bottom">

          <p>
            © 2026 KarbonShrunkhala. All rights reserved.
          </p>

          <p>
            Ministry of Earth Sciences (MoES) • National Centre for Coastal Research
          </p>

        </div>

      </div>
    </footer>
  );
}