import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/src/data/blogPosts';

export const metadata = {
  title: 'Adefes Blog | Fashion Tips, Agbada Styling and Menswear Advice',
  description: 'Read the Adefes blog for expert Nigerian men’s fashion advice, Agbada styling tips, Kaftan trends, and bespoke tailoring guides from Ekiti.',
  keywords: 'Adefes blog, Agbada styling, Kaftan trends, Senator fashion, Nigerian menswear, Ekiti tailor blog, fashion tips',
  openGraph: {
    title: 'Adefes Blog | Fashion Tips and Menswear Advice',
    description: 'Discover styling guides and tailoring advice for Agbada, Kaftan, Senator and bespoke menswear at Adefes.',
    url: 'https://adefes.com/blog',
  },
};

export default function BlogPage() {
  return (
    <main className="bg-white">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-2 block">Adefes Insights</span>
          <h1 className="text-4xl sm:text-5xl font-playfair font-bold">Fashion advice from Ekiti’s trusted designer</h1>
          <p className="mt-6 text-gray-600 text-lg leading-relaxed">
            Browse our latest articles on Agbada, Kaftan, Senator styling, hair fashion tips and how to order bespoke menswear in Ado Ekiti.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article key={post.slug} className="group overflow-hidden rounded-3xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-[10px] uppercase tracking-[0.3em] text-brand-charcoal bg-brand-gray/10 rounded-full px-2 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-2xl font-playfair font-semibold tracking-tight mb-4">{post.title}</h2>
                <p className="text-gray-600 leading-relaxed mb-6">{post.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{post.date}</span>
                  <Link href={`/blog/${post.slug}`} className="text-brand-gold font-bold uppercase tracking-[0.2em] text-xs hover:text-brand-emerald-dark">
                    Read More
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
