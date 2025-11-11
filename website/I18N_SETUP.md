# Multi-Language Support (i18n) Setup Guide

This guide explains how to set up and use multiple languages in your Strapi + Next.js application.

## Overview

✅ **What's Implemented:**
- Frontend locale management
- API routes with locale support
- Language switcher component
- Automatic locale parameter passing

## Step 1: Enable i18n in Strapi

### 1.1 Install i18n Plugin (if not installed)

The i18n plugin comes pre-installed in Strapi v4+. If you need to install it:

```bash
cd ../strapi  # Go to your Strapi directory
npm install @strapi/plugin-i18n
```

### 1.2 Configure Locales

1. Log in to Strapi admin: `https://awesome-prosperity-f883a3373a.strapiapp.com/admin`
2. Go to **Settings** → **Internationalization**
3. Click **"Add new locale"**
4. Add languages:
   - **English (en)** - Set as default
   - **Italian (it)**
   - **Spanish (es)**
   - **French (fr)**
   - **German (de)**
5. Save

### 1.3 Enable i18n on Content Types

For each content type that needs translations:

#### For "Article" Content Type:
1. Go to **Content-Type Builder** → **Article**
2. Click **"Edit"** (pencil icon)
3. Go to **"Advanced Settings"** tab
4. Enable **"Enable localization for this Content-Type"**
5. **Save** and restart Strapi

#### For "Homepage" Single Type:
1. Go to **Content-Type Builder** → **Homepage**
2. Click **"Edit"**
3. Go to **"Advanced Settings"**
4. Enable **"Enable localization for this Content-Type"**
5. **Save** and restart

#### For "Global" Single Type:
Same steps as Homepage.

## Step 2: Create Translations in Strapi

### 2.1 Translate Articles

1. Go to **Content Manager** → **Articles**
2. Open an article
3. In the top-right, you'll see a **locale dropdown** (default: English)
4. Click **"Create new locale"** → Select a language (e.g., Italian)
5. Fill in the translated content
6. **Save** and **Publish**

### 2.2 Translate Homepage

1. Go to **Content Manager** → **Homepage**
2. You'll see the locale dropdown
3. Create translations for each language
4. Update fields like:
   - `hero.title` → "Best watches" (EN) → "Migliori orologi" (IT)
   - `hero.subtitle` → Translate to target language
   - etc.

## Step 3: Using the Language Switcher

### 3.1 Add to Navbar

Update your `Navbar.tsx`:

```tsx
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

export function Navbar() {
  return (
    <nav>
      {/* ... other nav items ... */}

      <LanguageSwitcher />
    </nav>
  );
}
```

### 3.2 How It Works

1. User selects a language from the dropdown
2. The locale is saved in `localStorage`
3. Page reloads with the new locale
4. All API calls automatically include `?locale=it` (or selected language)
5. Strapi returns content in the selected language

## Step 4: API Behavior

### Default Behavior (English)

```
GET /api/homepage
→ https://strapi.com/api/homepage?locale=en
```

### With Locale Parameter

```
GET /api/homepage?locale=it
→ https://strapi.com/api/homepage?locale=it
```

### Frontend Usage

The locale is automatically added to all API requests:

```typescript
import { setLocale, getHomepage } from '@/lib/strapi';

// Set locale
setLocale('it');

// Fetch homepage (automatically includes locale=it)
const homepage = await getHomepage();
```

## Step 5: Strapi API Response Format

When i18n is enabled, Strapi returns localized content:

### Single Type (Homepage, Global)

```json
{
  "data": {
    "id": 1,
    "locale": "it",
    "hero": {
      "title": "Migliori orologi",
      "subtitle": "Scopri la nostra collezione esclusiva..."
    },
    "localizations": [
      {
        "id": 1,
        "locale": "en"
      },
      {
        "id": 2,
        "locale": "es"
      }
    ]
  }
}
```

### Collection Type (Articles)

```json
{
  "data": [
    {
      "id": 1,
      "locale": "it",
      "title": "Il miglior orologio del 2025",
      "description": "Descrizione in italiano...",
      "localizations": [
        { "id": 1, "locale": "en" },
        { "id": 2, "locale": "es" }
      ]
    }
  ]
}
```

## Step 6: Advanced Configuration

### 6.1 Fallback Locale

If a translation doesn't exist, Strapi can fall back to the default locale:

Update API routes to include fallback:

```typescript
const response = await fetch(
  `${STRAPI_URL}/api/articles?locale=${locale}&populate=*`,
  {
    headers,
    // Strapi automatically falls back to default locale if not found
  }
);
```

### 6.2 Custom Language Detection

Detect user's browser language automatically:

```typescript
// In src/lib/strapi.ts
const browserLang = navigator.language.split('-')[0]; // 'en-US' → 'en'
const supportedLangs = ['en', 'it', 'es', 'fr', 'de'];
const defaultLang = supportedLangs.includes(browserLang) ? browserLang : 'en';

localStorage.setItem('locale', defaultLang);
```

### 6.3 URL-based Locale (Optional)

Use URL paths for SEO:

```
/en/about → English
/it/about → Italian
/es/about → Spanish
```

This requires additional routing configuration with React Router.

## Step 7: SEO Considerations

### Add Language Meta Tags

In your pages:

```tsx
<head>
  <link rel="alternate" hrefLang="en" href="https://yoursite.com/en" />
  <link rel="alternate" hrefLang="it" href="https://yoursite.com/it" />
  <link rel="alternate" hrefLang="es" href="https://yoursite.com/es" />
</head>
```

## Testing

### 1. Test in Strapi Admin
- Create an article in English
- Add Italian translation
- Add Spanish translation
- Verify all fields are translated

### 2. Test in Frontend
- Open your site
- Switch language using the dropdown
- Verify content changes
- Check Network tab: API calls should have `?locale=it`

### 3. Test Cache
- Make a content change in Strapi
- Wait 5 minutes (cache TTL)
- Verify changes appear

## Troubleshooting

### Issue: Content not translating

**Solution:**
1. Check if i18n is enabled on the content type
2. Verify translations exist in Strapi
3. Check API response includes `locale` parameter
4. Clear cache: wait 5 minutes or restart

### Issue: Missing translations

**Solution:**
- Strapi returns default locale (English) if translation doesn't exist
- Create translations for all content types
- Publish translations (unpublished translations won't appear)

### Issue: Language switcher not working

**Solution:**
1. Check browser console for errors
2. Verify `localStorage.getItem('locale')` has the correct value
3. Ensure API routes receive the locale parameter

## Supported Languages

Currently configured (add more in Strapi admin):
- 🇬🇧 English (`en`) - Default
- 🇮🇹 Italian (`it`)
- 🇪🇸 Spanish (`es`)
- 🇫🇷 French (`fr`)
- 🇩🇪 German (`de`)

## Summary

✅ **Backend (Strapi):**
- Enable i18n plugin
- Add locales
- Enable localization on content types
- Create translations

✅ **Frontend (React):**
- Locale management in `src/lib/strapi.ts`
- Language switcher component
- Automatic locale parameter passing
- LocalStorage persistence

✅ **API Routes:**
- Accept `locale` query parameter
- Pass to Strapi API
- Cache per locale

Your multi-language site is ready! 🌍
