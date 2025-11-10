// Strapi API client for fetching blog content
const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_URL = `${STRAPI_URL}/api`;

export interface StrapiImage {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
}

export interface StrapiAuthor {
  id: number;
  name: string;
  email?: string;
  avatar?: {
    data: {
      attributes: StrapiImage;
    };
  };
}

export interface StrapiCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

export interface StrapiArticle {
  id: number;
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  publishedAt: string;
  cover: {
    data: {
      attributes: StrapiImage;
    };
  } | null;
  author: {
    data: {
      attributes: StrapiAuthor;
    };
  } | null;
  category: {
    data: {
      attributes: StrapiCategory;
    };
  } | null;
  blocks?: any[];
}

export interface StrapiResponse<T> {
  data: Array<{
    id: number;
    attributes: T;
  }>;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiSingleResponse<T> {
  data: {
    id: number;
    attributes: T;
  };
}

async function strapiRequest<T>(endpoint: string): Promise<T> {
  const url = `${STRAPI_API_URL}${endpoint}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching from Strapi:', error);
    throw error;
  }
}

// Get all articles with pagination
export async function getArticles(page = 1, pageSize = 10): Promise<StrapiResponse<StrapiArticle>> {
  return strapiRequest<StrapiResponse<StrapiArticle>>(
    `/articles?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=publishedAt:desc`
  );
}

// Get a single article by slug
export async function getArticleBySlug(slug: string): Promise<StrapiSingleResponse<StrapiArticle> | null> {
  const response = await strapiRequest<StrapiResponse<StrapiArticle>>(
    `/articles?filters[slug][$eq]=${slug}&populate=deep`
  );

  if (response.data.length === 0) {
    return null;
  }

  return {
    data: response.data[0]
  };
}

// Get all categories
export async function getCategories(): Promise<StrapiResponse<StrapiCategory>> {
  return strapiRequest<StrapiResponse<StrapiCategory>>(`/categories?populate=*`);
}

// Get articles by category
export async function getArticlesByCategory(categorySlug: string, page = 1, pageSize = 10): Promise<StrapiResponse<StrapiArticle>> {
  return strapiRequest<StrapiResponse<StrapiArticle>>(
    `/articles?filters[category][slug][$eq]=${categorySlug}&populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=publishedAt:desc`
  );
}

// Helper function to get full image URL
export function getStrapiMedia(url: string | undefined): string {
  if (!url) return '';

  // If URL is already absolute, return it
  if (url.startsWith('http')) {
    return url;
  }

  // Otherwise, prepend Strapi URL
  return `${STRAPI_URL}${url}`;
}

// Helper function to format date
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

// Homepage and Global content types
export interface HeroSection {
  badge: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

export interface CollectionSection {
  badge: string;
  title: string;
  description: string;
}

export interface FooterSection {
  brandName: string;
  tagline: string;
  copyrightText: string;
}

export interface NavigationLabels {
  collection: string;
  blog: string;
  login: string;
  cart: string;
}

export interface HomepageContent {
  hero: HeroSection;
  collectionSection: CollectionSection;
  footer: FooterSection;
}

export interface GlobalContent {
  siteName: string;
  siteDescription: string;
  navigationLabels: NavigationLabels;
}

// Get homepage content
export async function getHomepage(): Promise<HomepageContent | null> {
  try {
    const response = await strapiRequest<{ data: { attributes: HomepageContent } }>('/homepage?populate=deep');
    return response.data?.attributes || null;
  } catch (error) {
    console.error('Error fetching homepage:', error);
    return null;
  }
}

// Get global settings
export async function getGlobal(): Promise<GlobalContent | null> {
  try {
    const response = await strapiRequest<{ data: { attributes: GlobalContent } }>('/global?populate=deep');
    return response.data?.attributes || null;
  } catch (error) {
    console.error('Error fetching global settings:', error);
    return null;
  }
}
