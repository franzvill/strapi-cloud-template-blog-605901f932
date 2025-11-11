import type { VercelRequest, VercelResponse } from '@vercel/node';

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { page = '1', pageSize = '10', locale = 'en' } = req.query;

  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // Add authorization if token is available
    if (STRAPI_TOKEN) {
      headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
    }

    const response = await fetch(
      `${STRAPI_URL}/api/articles?locale=${locale}&populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=publishedAt:desc`,
      { headers }
    );

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status}`);
    }

    const data = await response.json();

    // Set cache headers for Vercel Edge Network
    // Cache for 5 minutes, serve stale for up to 10 minutes while revalidating
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    res.setHeader('CDN-Cache-Control', 'max-age=300');

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
}
