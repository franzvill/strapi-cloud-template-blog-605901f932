# Content Management with Strapi

This guide explains how to manage all website text, labels, and content through the Strapi admin panel.

## Overview

Your website now pulls all content dynamically from Strapi:

### Content Types Created:

1. **Homepage** (Single Type) - Manages homepage content
   - Hero section (badge, title, subtitle, CTA)
   - Collection section (badge, title, description)
   - Footer (brand name, tagline, copyright)

2. **Global** (Single Type) - Manages site-wide settings
   - Site name
   - Site description
   - Navigation labels (Collection, Blog, Login, Cart)
   - SEO settings

3. **Article** (Collection Type) - Blog posts (already existed)
   - Title, description, slug
   - Cover image
   - Author and category
   - Dynamic content blocks

## Step-by-Step: Managing Content

### 1. Start Strapi

```bash
npm run develop
```

Access admin at `http://localhost:1337/admin`

### 2. Set Up Permissions (First Time Only)

Go to **Settings** → **Users & Permissions** → **Roles** → **Public**

Enable these permissions:
- ✅ **Homepage**: `find`
- ✅ **Global**: `find`
- ✅ **Article**: `find`, `findOne`
- ✅ **Author**: `find`, `findOne`
- ✅ **Category**: `find`, `findOne`

Click **Save**

### 3. Configure Homepage Content

Go to **Content Manager** → **Homepage**

#### Hero Section
- **Badge**: Top label (e.g., "Swiss Precision Craftsmanship")
- **Title**: Main headline (e.g., "Where Football Meets Timeless Elegance")
- **Subtitle**: Supporting text
- **CTA Text**: Button text (e.g., "Discover the Collection")
- **CTA Link**: Button destination (e.g., "#collection")

#### Collection Section
- **Badge**: Section label (e.g., "Limited Edition")
- **Title**: Section heading (e.g., "The Collection")
- **Description**: Section description

#### Footer
- **Brand Name**: Your brand (e.g., "Kick Off Couture")
- **Tagline**: Slogan (e.g., "Where football passion meets horological excellence")
- **Copyright Text**: Copyright notice (e.g., "© 2025 Kick Off Couture. All rights reserved.")

Click **Save**

### 4. Configure Global Settings

Go to **Content Manager** → **Global**

- **Site Name**: Your website name (appears in navbar)
- **Site Description**: SEO description
- **Navigation Labels**:
  - Collection: Label for products link
  - Blog: Label for blog link
  - Login: Label for login link
  - Cart: Label for cart (tooltip/aria-label)

Click **Save**

### 5. Manage Blog Articles

Go to **Content Manager** → **Article** → **Create new entry**

Fill in:
- Title
- Description (max 80 chars)
- Slug (auto-generated)
- Cover image
- Author
- Category
- Content blocks (Rich Text, Quotes, Media, Sliders)

Click **Save** and **Publish**

## How It Works

### Fallback System

The website has default content built-in. If Strapi is unavailable or content isn't set:
- Default English content displays
- No errors shown to users
- Website remains functional

### Live Updates

When you update content in Strapi:
1. Make your changes in Strapi admin
2. Click **Save**
3. Refresh your website
4. Changes appear immediately (no rebuild needed)

## Content Examples

### Hero Title Formatting

You can use line breaks in the title. The website will respect them:

```
Where Football Meets
Timeless Elegance
```

This will display across two lines on the website.

### Brand Name Styling

For **Site Name** and **Footer Brand Name**, the last word automatically gets the gold accent color:

- "Kick Off Couture" → "Kick Off" (white) + "Couture" (gold)
- "Your Brand Name" → "Your Brand" (white) + "Name" (gold)

## Multi-language Support (Future)

To add multiple languages later:

1. Install i18n plugin in Strapi
2. Enable localization on content types
3. Add translations for each language
4. Update frontend to detect user language

## Content Best Practices

### Hero Section
- **Title**: 3-10 words, impactful
- **Subtitle**: 15-25 words, descriptive
- **CTA**: 2-4 words, action-oriented

### Collection Section
- **Title**: 2-4 words
- **Description**: 20-40 words

### Articles
- **Title**: 40-60 characters (SEO optimal)
- **Description**: 70-80 characters (exactly - it's limited to 80)
- **Cover**: High quality images, at least 1200x800px

## Troubleshooting

### Content Not Showing?

1. **Check Strapi is running**: `http://localhost:1337/admin`
2. **Verify permissions**: Public role has `find` access
3. **Check browser console**: Look for API errors (F12)
4. **Test API directly**:
   ```bash
   curl http://localhost:1337/api/homepage?populate=deep
   curl http://localhost:1337/api/global?populate=deep
   ```

### Default Content Showing?

This is normal if:
- Strapi isn't running
- Content hasn't been created yet
- Permissions aren't set correctly

The website gracefully falls back to defaults to maintain functionality.

## Production Deployment

When deploying to production:

1. **Update environment variable** in `website/.env`:
   ```
   VITE_STRAPI_URL=https://your-production-strapi-url.com
   ```

2. **Rebuild the frontend**:
   ```bash
   cd website
   npm run build
   ```

3. **Deploy**:
   - Frontend: Vercel, Netlify, etc.
   - Strapi: Strapi Cloud, Railway, Render, etc.

## API Endpoints

Your website uses these Strapi endpoints:

- `GET /api/homepage?populate=deep` - Homepage content
- `GET /api/global?populate=deep` - Global settings
- `GET /api/articles?populate=*` - Blog articles list
- `GET /api/articles?filters[slug][$eq]=SLUG&populate=deep` - Single article
- `GET /api/categories?populate=*` - Categories

All endpoints are read-only from the public frontend.
