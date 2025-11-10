import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartDrawer } from "./CartDrawer";
import { User } from "lucide-react";
import { getGlobal, GlobalContent } from "@/lib/strapi";

const SHOPIFY_CUSTOMER_LOGIN_URL = "https://kick-off-couture-urq1r.myshopify.com/account/login";

export const Navbar = () => {
  const [global, setGlobal] = useState<GlobalContent | null>(null);

  useEffect(() => {
    const fetchGlobal = async () => {
      try {
        const data = await getGlobal();
        setGlobal(data);
      } catch (error) {
        console.error('Error fetching global settings:', error);
      }
    };

    fetchGlobal();
  }, []);

  // Default labels as fallback
  const siteName = global?.siteName || "Kick Off Couture";
  const labels = global?.navigationLabels || {
    collection: "Collection",
    blog: "Blog",
    login: "Login",
    cart: "Cart"
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <h1 className="text-2xl font-playfair font-bold tracking-tight">
              {siteName.split(' ')[0]} <span className="text-accent">{siteName.split(' ').slice(1).join(' ')}</span>
            </h1>
          </Link>

          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="text-sm font-medium hover:text-accent transition-colors"
            >
              {labels.collection}
            </Link>
            <Link
              to="/blog"
              className="text-sm font-medium hover:text-accent transition-colors"
            >
              {labels.blog}
            </Link>
            <a
              href={SHOPIFY_CUSTOMER_LOGIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors"
            >
              <User className="h-4 w-4" />
              {labels.login}
            </a>
            <CartDrawer />
          </div>
        </div>
      </div>
    </nav>
  );
};
