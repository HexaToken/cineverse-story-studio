const Footer = () => {
  const links = [
    { name: "About", href: "#" },
    { name: "Studio", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Discord", href: "#" },
    { name: "X", href: "#" },
    { name: "YouTube", href: "#" }
  ];

  return (
    <footer className="bg-surface py-12 px-4 border-t border-border/30">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <h3 className="font-display text-2xl font-bold">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                CineVerse
              </span>
            </h3>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-border/20 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 CineVerse Studios. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
