import heroWatch from "@/assets/hero-watch.jpg";
import { HeroSection, getStrapiMedia } from "@/lib/strapi";

interface HeroProps {
  content?: HeroSection;
}

export const Hero = ({ content }: HeroProps) => {
  // Default content as fallback
  const defaultContent: HeroSection = {
    badge: "Swiss Precision Craftsmanship",
    title: "Where Football Meets Timeless Elegance",
    subtitle: "Each timepiece is a masterpiece, celebrating legendary clubs with Swiss precision and iconic team heritage",
    ctaText: "Discover the Collection",
    ctaLink: "#collection"
  };

  const hero = content || defaultContent;

  // Get background image - use Strapi image if available, otherwise use default
  const backgroundImage = hero.backgroundImage?.url
    ? getStrapiMedia(hero.backgroundImage.url)
    : heroWatch;

  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${backgroundImage})`,
          transition: 'transform 0.3s ease-out',
        }}
      />

      <div className="absolute inset-0 bg-gradient-radial opacity-50" />

      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
        <div className="mb-6 animate-fade-in">
          <div className="inline-block px-6 py-2 border border-luxury-gold/30 rounded-full mb-8 backdrop-blur-sm bg-black/20">
            <span className="text-accent text-sm font-semibold tracking-[0.2em] uppercase">{hero.badge}</span>
            HEççP
          </div>
        </div>

        <h1 className="font-playfair text-6xl md:text-8xl font-bold mb-8 animate-fade-in leading-tight whitespace-pre-line" style={{ animationDelay: '0.2s' }}>
          {hero.title}
        </h1>

        <p className="text-xl md:text-2xl mb-12 text-luxury-silver animate-fade-in leading-relaxed max-w-3xl mx-auto" style={{ animationDelay: '0.4s' }}>
          {hero.subtitle}
        </p>

        <a
          href={hero.ctaLink}
          className="inline-block bg-gradient-gold text-luxury-dark px-10 py-5 rounded-md font-semibold hover:shadow-gold-glow transition-elegant hover:scale-105 shadow-luxury animate-fade-in text-lg tracking-wide"
          style={{ animationDelay: '0.6s' }}
        >
          {hero.ctaText}
        </a>
      </div>
    </section>
  );
};
