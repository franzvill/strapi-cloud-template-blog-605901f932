# Strapi Setup Guide

Quick guide to get Strapi running and configured for your website.

## 1. Start Strapi

```bash
npm run develop
```

Access admin panel at: `http://localhost:1337/admin`

## 2. Create Admin Account (First Time Only)

Fill in your admin credentials when prompted.

## 3. Configure API Permissions

**Important**: The website needs public access to read content.

1. Go to **Settings** → **Users & Permissions** → **Roles**
2. Click on **Public** role
3. Under **Permissions**, enable the following:

### Homepage
- ✅ `find` (for homepage content)

### Global
- ✅ `find` (for site settings and navigation labels)

### Article
- ✅ `find` (list of articles)
- ✅ `findOne` (single article)

### Author
- ✅ `find`
- ✅ `findOne`

### Category
- ✅ `find`
- ✅ `findOne`

4. Click **Save** at the top right

## 4. Add Homepage Content

1. Go to **Content Manager** → **Homepage**
2. Fill in all sections:

   **Hero Section:**
   - Badge: "Swiss Precision Craftsmanship"
   - Title: "Where Football Meets Timeless Elegance"
   - Subtitle: Your hero description
   - CTA Text: "Discover the Collection"
   - CTA Link: "#collection"

   **Collection Section:**
   - Badge: "Limited Edition"
   - Title: "The Collection"
   - Description: Your collection description

   **Footer:**
   - Brand Name: "Kick Off Couture"
   - Tagline: "Where football passion meets horological excellence"
   - Copyright Text: "© 2025 Kick Off Couture. All rights reserved."

3. Click **Save**

## 5. Configure Global Settings

1. Go to **Content Manager** → **Global**
2. Fill in:
   - **Site Name**: "Kick Off Couture"
   - **Site Description**: "Luxury watches inspired by legendary football clubs"
   - **Navigation Labels**:
     - Collection: "Collection"
     - Blog: "Blog"
     - Login: "Login"
     - Cart: "Cart"
3. Click **Save**

## 6. Add Blog Content (Optional)

### Create Authors

1. Go to **Content Manager** → **Author** → **Create new entry**
2. Add author details
3. Click **Save** and **Publish**

### Create Categories

1. Go to **Content Manager** → **Category** → **Create new entry**
2. Add category details
3. Click **Save** and **Publish**

### Create Articles

1. Go to **Content Manager** → **Article** → **Create new entry**
2. Fill in:
   - Title
   - Description (max 80 characters)
   - Slug (auto-generated)
   - Cover image
   - Author (select from dropdown)
   - Category (select from dropdown)
   - Content blocks (add Rich Text, Quotes, Media, etc.)
3. Click **Save** and **Publish**

## 7. Test the Setup

Test the API endpoints:

```bash
# Homepage content
curl http://localhost:1337/api/homepage?populate=deep

# Global settings
curl http://localhost:1337/api/global?populate=deep

# Articles
curl http://localhost:1337/api/articles?populate=*
```

If you get JSON responses, everything is working!

## 8. Start the Website

In a new terminal:

```bash
cd website
npm run dev
```

Access the website at: `http://localhost:8080/`

You should now see your Strapi content displayed on the website!

## Troubleshooting

**Content not showing?**
- Check Strapi is running (`http://localhost:1337/admin`)
- Verify permissions are set correctly (step 3)
- Check browser console for errors (F12)

**Default content showing?**
- This is normal if Strapi content hasn't been created yet
- The website has fallback content for development

For more detailed content management instructions, see [CONTENT_MANAGEMENT_GUIDE.md](./CONTENT_MANAGEMENT_GUIDE.md)
