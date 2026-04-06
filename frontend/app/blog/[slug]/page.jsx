import Image from 'next/image';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/src/data/blogPosts';

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const post = blogPosts.find((item) => item.slug === params.slug);
  if (!post) {
    return {};
  }
  return {
    title: `${post.title} | Adefes Blog`,
    description: post.description,
    openGraph: {
      title: `${post.title} | Adefes Blog`,
      description: post.description,
      url: `https://adefes.com/blog/${post.slug}`,
      images: [{ url: post.image, width: 1200, height: 630 }],
    },
  };
}

export default function BlogPostPage({ params }) {
  const post = blogPosts.find((item) => item.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="bg-white">
      <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <div className="mb-10 text-gray-500 text-sm uppercase tracking-[0.3em] font-semibold">Adefes Blog</div>
        <h1 className="text-4xl sm:text-5xl font-playfair font-bold mb-6">{post.title}</h1>
        <div className="flex flex-wrap gap-4 items-center text-sm text-gray-500 mb-12">
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readingTime}</span>
        </div>
        <div className="relative aspect-[16/9] overflow-hidden rounded-3xl shadow-xl mb-12 bg-gray-100">
          <Image src={post.image} alt={post.title} fill className="object-cover" />
        </div>
        <div className="prose prose-lg max-w-none text-gray-700">
          {post.content.map((block, index) => {
            if (block.type === 'heading') {
              const Tag = `h${block.level}`;
              return <Tag key={index} className="mt-10 mb-4 text-3xl font-semibold tracking-tight">{block.text}</Tag>;
            }
            return <p key={index} className="mb-6 leading-relaxed">{block.text}</p>;
          })}
        </div>
      </article>
    </main>
  );
}
