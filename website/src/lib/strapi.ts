// Strapi API client for fetching blog content
// Use Vercel serverless functions for caching benefits
const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';

// In development: use direct Strapi calls (simpler, faster)
// In production: use API routes (cached, secure)
const IS_DEV = import.meta.env.DEV;
const API_BASE_URL = IS_DEV ? `${STRAPI_URL}/api` : '/api';

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

async function apiRequest<T>(endpoint: string): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching from API:', error);
    throw error;
  }
}

// Get all articles with pagination
export async function getArticles(page = 1, pageSize = 10): Promise<StrapiResponse<StrapiArticle>> {
  // In dev: use full Strapi query params
  // In prod: API route handles the query params
  const endpoint = IS_DEV
    ? `/articles?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=publishedAt:desc`
    : `/articles?page=${page}&pageSize=${pageSize}`;

  return apiRequest<StrapiResponse<StrapiArticle>>(endpoint);
}

// Get a single article by slug
export async function getArticleBySlug(slug: string): Promise<StrapiSingleResponse<StrapiArticle> | null> {
  try {
    // In dev: use full Strapi query
    // In prod: API route handles the query
    const endpoint = IS_DEV
      ? `/articles?filters[slug][$eq]=${slug}&populate[cover]=*&populate[author][populate]=avatar&populate[category]=*&populate[blocks]=*`
      : `/articles/${slug}`;

    const response = IS_DEV
      ? await apiRequest<StrapiResponse<StrapiArticle>>(endpoint)
      : await apiRequest<StrapiSingleResponse<StrapiArticle>>(endpoint);

    // In dev mode, convert array response to single response
    if (IS_DEV) {
      const arrayResponse = response as StrapiResponse<StrapiArticle>;
      if (arrayResponse.data.length === 0) {
        return null;
      }
      return { data: arrayResponse.data[0] };
    }

    return response as StrapiSingleResponse<StrapiArticle>;
  } catch (error: any) {
    if (error.message?.includes('404')) {
      return null;
    }
    throw error;
  }
}

// Get all categories
export async function getCategories(): Promise<StrapiResponse<StrapiCategory>> {
  const endpoint = IS_DEV ? `/categories?populate=*` : `/categories`;
  return apiRequest<StrapiResponse<StrapiCategory>>(endpoint);
}

// Get articles by category
export async function getArticlesByCategory(categorySlug: string, page = 1, pageSize = 10): Promise<StrapiResponse<StrapiArticle>> {
  const endpoint = IS_DEV
    ? `/articles?filters[category][slug][$eq]=${categorySlug}&populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=publishedAt:desc`
    : `/articles?category=${categorySlug}&page=${page}&pageSize=${pageSize}`;

  return apiRequest<StrapiResponse<StrapiArticle>>(endpoint);
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
  backgroundImage?: {
    url: string;
    alternativeText?: string;
  };
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
    const endpoint = IS_DEV
      ? `/homepage?populate[hero][populate]=backgroundImage&populate[collectionSection]=*&populate[footer]=*`
      : `/homepage`;

    const response = await apiRequest<{ data: HomepageContent }>(endpoint);
    return response.data || null;
  } catch (error) {
    console.error('Error fetching homepage:', error);
    return null;
  }
}

// Get global settings
export async function getGlobal(): Promise<GlobalContent | null> {
  try {
    const endpoint = IS_DEV
      ? `/global?populate[navigationLabels]=*`
      : `/global`;

    const response = await apiRequest<{ data: GlobalContent }>(endpoint);
    return response.data || null;
  } catch (error) {
    console.error('Error fetching global settings:', error);
    return null;
  }
}
