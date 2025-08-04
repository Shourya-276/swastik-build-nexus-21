import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import swastikLogo from "@/assets/swastik-logo.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { 
      name: "Projects", 
      href: "#projects",
      dropdown: [
        { name: "Completed Projects", href: "#projects-completed" },
        { name: "Ongoing Projects", href: "#projects-ongoing" },
        { name: "Upcoming Projects", href: "#projects-upcoming" },
      ]
    },
    { name: "Loyalty Programme", href: "/loyalty-programme" },
    { name: "Blogs", href: "/blogs" },
    { name: "Careers", href: "/careers" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src={swastikLogo} alt="Swastik Group" className="h-10 w-auto" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.dropdown ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-brand-blue transition-colors">
                      <span>{item.name}</span>
                      <ChevronDown className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white border border-border shadow-lg">
                      {item.dropdown.map((subItem) => (
                        <DropdownMenuItem key={subItem.name}>
                          <a 
                            href={subItem.href}
                            className="w-full text-sm hover:text-brand-blue transition-colors"
                          >
                            {subItem.name}
                          </a>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  item.href.startsWith('#') ? (
                    <a
                      href={item.href}
                      className="text-sm font-medium text-foreground hover:text-brand-blue transition-colors"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      to={item.href}
                      className="text-sm font-medium text-foreground hover:text-brand-blue transition-colors"
                    >
                      {item.name}
                    </Link>
                  )
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Contact Button */}
          <div className="hidden lg:block">
            <Button variant="brand" size="lg">
              Contact
            </Button>
          </div>

          {/* Mobile menu button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-white">
              <div className="flex flex-col space-y-6 mt-8">
                <div className="flex items-center space-x-2 mb-6">
                  <img src={swastikLogo} alt="Swastik Group" className="h-8 w-auto" />
                </div>
                
                {navigation.map((item) => (
                  <div key={item.name} className="space-y-2">
                    {item.href.startsWith('#') ? (
                      <a
                        href={item.href}
                        className="block text-lg font-medium text-foreground hover:text-brand-blue transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </a>
                    ) : (
                      <Link
                        to={item.href}
                        className="block text-lg font-medium text-foreground hover:text-brand-blue transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                    {item.dropdown && (
                      <div className="ml-4 space-y-2">
                        {item.dropdown.map((subItem) => (
                          <a
                            key={subItem.name}
                            href={subItem.href}
                            className="block text-sm text-muted-foreground hover:text-brand-blue transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            {subItem.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                <div className="pt-6">
                  <Button variant="brand" size="lg" className="w-full">
                    Contact
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;