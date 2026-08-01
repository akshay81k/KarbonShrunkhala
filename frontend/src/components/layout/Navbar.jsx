import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

import logo from "../../assets/images/logo.png";

import Button from "../common/Button";
import Container from "../common/Container";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "How It Works", path: "/how-it-works" },
  { name: "Marketplace", path: "/marketplace" },
  { name: "Projects", path: "/projects" },
  { name: "About Us", path: "/about" },
  { name: "Resources", path: "/resources" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <Container>
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="KarbonShrunkhala"
              className="h-12 w-12 object-contain"
            />

            <div>
              <h1 className="logo-font text-[34px] font-bold leading-none text-slate-900">
                Karbon
                <span className="text-[#22A06B]">Shrunkhala</span>
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Blue Carbon MRV System
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `relative pb-1 text-[16px] font-medium transition ${isActive
                    ? "text-[#22A06B]"
                    : "text-slate-700 hover:text-[#22A06B]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}

                    {isActive && (
                      <span className="absolute -bottom-2 left-0 h-[2px] w-full rounded-full bg-[#22A06B]" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-4 lg:flex">
            <Button
              variant="secondary"
              className="rounded-xl px-6 py-3"
            >
              Login
            </Button>

            <Button className="rounded-xl px-6 py-3">
              Sign Up
            </Button>
          </div>

          {/* Mobile */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden"
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <Container className="py-6">
            <div className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className="text-slate-700"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.name}
                </NavLink>
              ))}

              <div className="mt-3 flex flex-col gap-3">
                <Button variant="secondary">Login</Button>
                <Button>Sign Up</Button>
              </div>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}