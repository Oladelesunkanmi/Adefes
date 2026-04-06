import { blogPosts } from '@/src/data/blogPosts';

export default async function sitemap() {
  const baseUrl = 'https://adefes.com';

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/shop`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/collections`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/fashion-designer-ekiti`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ];

  // Fetch products for dynamic sitemap entries
  let productPages = [];
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

  if (apiBaseUrl) {
    try {
      const response = await fetch(`${apiBaseUrl}/api/products`, {
        next: { revalidate: 3600 },
      });
      if (response.ok) {
        const products = await response.json();
        productPages = products.map((product) => ({
          url: `${baseUrl}/shop/${product.id}`,
          lastModified: new Date(product.created_at || new Date()),
          changeFrequency: 'monthly',
          priority: 0.6,
        }));
      }
    } catch (error) {
      console.error('Failed to fetch products for sitemap:', error);
    }
  }

  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages, ...productPages];
}
