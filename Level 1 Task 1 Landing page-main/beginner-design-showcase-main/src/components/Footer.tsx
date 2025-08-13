import { Github, Twitter, Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/20 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
              WebCraft Pro
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Empowering the next generation of web developers with modern tools, 
              best practices, and beautiful design principles.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center hover:bg-primary/20 transition-smooth">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center hover:bg-primary/20 transition-smooth">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center hover:bg-primary/20 transition-smooth">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center hover:bg-primary/20 transition-smooth">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-smooth">Courses</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-smooth">Projects</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-smooth">Resources</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-smooth">Community</a></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-smooth">Help Center</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-smooth">Documentation</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-smooth">Contact</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-smooth">FAQ</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2024 WebCraft Pro. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-smooth">Privacy Policy</a>
            <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-smooth">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;