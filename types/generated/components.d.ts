import type { Schema, Struct } from '@strapi/strapi';

export interface SectionsCollection extends Struct.ComponentSchema {
  collectionName: 'components_sections_collections';
  info: {
    description: 'Collection section content';
    displayName: 'Collection';
  };
  attributes: {
    badge: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Limited Edition'>;
    description: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Each timepiece is a tribute to legendary clubs, crafted with Swiss precision and adorned with iconic team colors. Limited to 100 pieces per edition.'>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'The Collection'>;
  };
}

export interface SectionsFooter extends Struct.ComponentSchema {
  collectionName: 'components_sections_footers';
  info: {
    description: 'Footer section content';
    displayName: 'Footer';
  };
  attributes: {
    brandName: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Kick Off Couture'>;
    copyrightText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'\u00A9 2025 Kick Off Couture. All rights reserved.'>;
    tagline: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Where football passion meets horological excellence'>;
  };
}

export interface SectionsHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_heroes';
  info: {
    description: 'Hero section content';
    displayName: 'Hero';
  };
  attributes: {
    badge: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Limited Edition'>;
    ctaLink: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'#collection'>;
    ctaText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Explore Collection'>;
    subtitle: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Discover our exclusive collection of luxury timepieces inspired by legendary football clubs. Each watch is a masterpiece, limited to 100 pieces per edition.'>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Where Football Passion Meets Horological Excellence'>;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedNavigationLabels extends Struct.ComponentSchema {
  collectionName: 'components_shared_navigation_labels';
  info: {
    description: 'Labels for navigation menu';
    displayName: 'Navigation Labels';
  };
  attributes: {
    blog: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Blog'>;
    cart: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Cart'>;
    collection: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Collection'>;
    login: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Login'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'sections.collection': SectionsCollection;
      'sections.footer': SectionsFooter;
      'sections.hero': SectionsHero;
      'shared.media': SharedMedia;
      'shared.navigation-labels': SharedNavigationLabels;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
    }
  }
}
