import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    ["Home", "/"],
    ["Templates", "/#templates"],
    ["Features", "/#features"],
    ["Live Preview", "/preview"],
    ["Customizer", "/customizer"],
    ["Gallery", "/#gallery"],
    ["Contact", "/#contact"],
  ];
  return (
    <header className="navbar">
      <Link className="brand" to="/" aria-label="Ardhas home">
        Ardhas<span>✧</span>
      </Link>
      <nav
        className={open ? "nav-links open" : "nav-links"}
        aria-label="Main navigation"
      >
        {links.map(([label, to]) => (
          <Link key={label} to={to} onClick={() => setOpen(false)}>
            {label}
          </Link>
        ))}
      </nav>
      <Link className="nav-cta" to="/customizer">
        Create your invite <ArrowUpRight size={15} />
      </Link>
      <button
        className="menu-toggle"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        {open ? <X /> : <Menu />}
      </button>
    </header>
  );
}
