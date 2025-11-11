import type { VercelRequest, VercelResponse } from '@vercel/node';

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { slug, locale = 'en' } = req.query;

  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({ error: 'Slug parameter is required' });
  }

  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (STRAPI_TOKEN) {
      headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
    }

    const response = await fetch(
      `${STRAPI_URL}/api/articles?locale=${locale}&filters[slug][$eq]=${slug}&populate[cover]=*&populate[author][populate]=avatar&populate[category]=*&populate[blocks]=*`,
      { headers }
    );

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.data.length === 0) {
      return res.status(404).json({ error: 'Article not found' });
    }

    // Cache for 5 minutes, serve stale for up to 10 minutes while revalidating
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    res.setHeader('CDN-Cache-Control', 'max-age=300');

    res.status(200).json({ data: data.data[0] });
  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).json({ error: 'Failed to fetch article' });
  }
}
