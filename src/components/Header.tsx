import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, Moon, Sun, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const genres = [
    { name: "Sci-Fi", href: "/universe?genre=sci-fi" },
    { name: "Drama", href: "/universe?genre=drama" },
    { name: "Fantasy", href: "/universe?genre=fantasy" },
    { name: "Noir", href: "/universe?genre=noir" },
    { name: "Romance", href: "/universe?genre=romance" },
    { name: "Mystery", href: "/universe?genre=mystery" },
  ];

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "UNIVERSE", href: "/universe", hasDropdown: true },
    { name: "CREATE WITH AI", href: "/create" },
    { name: "ORIGINALS", href: "#originals" },
    { name: "ABOUT", href: "#about" },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-secondary via-primary to-accent opacity-0 animate-pulse z-[100]" />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md shadow-lg border-b border-primary/40"
            : "bg-background/80 backdrop-blur-sm border-b border-primary/20"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 group transition-transform hover:scale-105"
            >
              <h1 className="font-display text-2xl font-bold tracking-wider">
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  CINEVERSE
                </span>
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList className="gap-6">
                {navLinks.map((link) =>
                  link.hasDropdown ? (
                    <NavigationMenuItem key={link.name}>
                      <NavigationMenuTrigger className="bg-transparent hover:bg-transparent data-[state=open]:bg-transparent text-foreground hover:text-secondary transition-colors tracking-widest text-sm font-medium">
                        {link.name}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="bg-card/95 backdrop-blur-md border border-primary/20">
                        <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2">
                          {genres.map((genre) => (
                            <li key={genre.name}>
                              <NavigationMenuLink asChild>
                                <Link
                                  to={genre.href}
                                  className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent/10 hover:text-accent focus:bg-accent/10 focus:text-accent"
                                >
                                  <div className="text-sm font-medium leading-none tracking-wide">
                                    {genre.name}
                                  </div>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ) : (
                    <NavigationMenuItem key={link.name}>
                      <Link
                        to={link.href}
                        className={`relative px-2 py-1 text-sm font-medium tracking-widest transition-colors ${
                          isActive(link.href)
                            ? "text-secondary"
                            : "text-foreground hover:text-secondary"
                        } after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-bottom-right after:scale-x-0 after:bg-gradient-to-r after:from-secondary after:to-accent after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100`}
                      >
                        {link.name}
                      </Link>
                    </NavigationMenuItem>
                  )
                )}
              </NavigationMenuList>
            </NavigationMenu>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-secondary/10 transition-colors group"
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-foreground group-hover:text-secondary transition-colors" />
              </button>

              {/* Theme Toggle */}
              <button
                onClick={() => setIsDark(!isDark)}
                className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-secondary/10 transition-colors group"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Moon className="w-5 h-5 text-foreground group-hover:text-secondary transition-colors" />
                ) : (
                  <Sun className="w-5 h-5 text-foreground group-hover:text-secondary transition-colors" />
                )}
              </button>

              {/* User Menu */}
              <Button
                variant="hero"
                size="sm"
                className="hidden md:flex items-center gap-2 rounded-full px-6"
              >
                <User className="w-4 h-4" />
                <span className="text-sm font-medium tracking-wide">SIGN IN</span>
              </Button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-secondary/10 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-foreground" />
                ) : (
                  <Menu className="w-6 h-6 text-foreground" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search Overlay */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-primary/20 p-4 animate-fade-in">
            <div className="container mx-auto">
              <input
                type="text"
                placeholder="Search stories, creators, genres..."
                className="w-full bg-card/50 border border-primary/20 rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-primary/20 animate-slide-in-right">
            <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <div key={link.name}>
                  <Link
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block py-2 text-lg font-medium tracking-widest transition-colors ${
                      isActive(link.href)
                        ? "text-secondary"
                        : "text-foreground hover:text-secondary"
                    }`}
                  >
                    {link.name}
                  </Link>
                  {link.hasDropdown && (
                    <div className="ml-4 mt-2 grid grid-cols-2 gap-2">
                      {genres.map((genre) => (
                        <Link
                          key={genre.name}
                          to={genre.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-sm text-muted-foreground hover:text-accent transition-colors py-1"
                        >
                          {genre.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Button
                variant="hero"
                className="mt-4 w-full rounded-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User className="w-4 h-4 mr-2" />
                SIGN IN
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Spacer to prevent content from hiding under fixed header */}
      <div className="h-16" />
    </>
  );
};

export default Header;
