// Strapi API client for fetching blog content
// Always use /api routes (backend handles Strapi calls with caching)
const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
const API_BASE_URL = '/api';

// Verification log (check console to confirm new code is deployed)
console.log('✅ Strapi client loaded - Using API routes:', API_BASE_URL);

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
  return apiRequest<StrapiResponse<StrapiArticle>>(
    `/articles?page=${page}&pageSize=${pageSize}`
  );
}

// Get a single article by slug
export async function getArticleBySlug(slug: string): Promise<StrapiSingleResponse<StrapiArticle> | null> {
  try {
    return await apiRequest<StrapiSingleResponse<StrapiArticle>>(`/articles/${slug}`);
  } catch (error: any) {
    if (error.message?.includes('404')) {
      return null;
    }
    throw error;
  }
}

// Get all categories
export async function getCategories(): Promise<StrapiResponse<StrapiCategory>> {
  return apiRequest<StrapiResponse<StrapiCategory>>(`/categories`);
}

// Get articles by category
export async function getArticlesByCategory(categorySlug: string, page = 1, pageSize = 10): Promise<StrapiResponse<StrapiArticle>> {
  return apiRequest<StrapiResponse<StrapiArticle>>(
    `/articles?category=${categorySlug}&page=${page}&pageSize=${pageSize}`
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
    const response = await apiRequest<{ data: HomepageContent }>('/homepage');
    return response.data || null;
  } catch (error) {
    console.error('Error fetching homepage:', error);
    return null;
  }
}

// Get global settings
export async function getGlobal(): Promise<GlobalContent | null> {
  try {
    const response = await apiRequest<{ data: GlobalContent }>('/global');
    return response.data || null;
  } catch (error) {
    console.error('Error fetching global settings:', error);
    return null;
  }
}
