import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { getHomepage, HomepageContent } from "@/lib/strapi";

const Index = () => {
  const [homepage, setHomepage] = useState<HomepageContent | null>(null);

  useEffect(() => {
    const fetchHomepage = async () => {
      try {
        const data = await getHomepage();
        setHomepage(data);
      } catch (error) {
        console.error('Error fetching homepage content:', error);
      }
    };

    fetchHomepage();
  }, []);

  // Default content as fallback
  const defaultCollection = {
    badge: "Limited Edition",
    title: "The Collection",
    description: "Each timepiece is a tribute to legendary clubs, crafted with Swiss precision and adorned with iconic team colors. Limited to 100 pieces per edition."
  };

  const defaultFooter = {
    brandName: "Kick Off Couture",
    tagline: "Where football passion meets horological excellence",
    copyrightText: "© 2025 Kick Off Couture. All rights reserved."
  };

  const collection = homepage?.collectionSection || defaultCollection;
  const footer = homepage?.footer || defaultFooter;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero content={homepage?.hero} />

      <section id="collection" className="py-32 bg-gradient-to-b from-background to-luxury-charcoal/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-block mb-6">
              <span className="text-accent text-sm font-semibold tracking-[0.3em] uppercase">{collection.badge}</span>
            </div>
            <h2 className="font-playfair text-5xl md:text-6xl font-bold mb-6 bg-gradient-gold bg-clip-text text-transparent">
              {collection.title}
            </h2>
            <div className="w-24 h-1 bg-gradient-gold mx-auto mb-8 rounded-full"></div>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
              {collection.description}
            </p>
          </div>

          <ProductGrid />
        </div>
      </section>

      <footer className="bg-luxury-dark text-white py-16 mt-32 border-t border-luxury-gold/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="font-playfair text-3xl md:text-4xl mb-3">
              {footer.brandName.split(' ')[0]} <span className="bg-gradient-gold bg-clip-text text-transparent">{footer.brandName.split(' ').slice(1).join(' ')}</span>
            </p>
            <p className="text-luxury-silver text-sm tracking-wider">{footer.tagline}</p>
          </div>
          <div className="border-t border-luxury-gold/10 pt-8 text-center">
            <p className="text-xs text-muted-foreground">{footer.copyrightText}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
