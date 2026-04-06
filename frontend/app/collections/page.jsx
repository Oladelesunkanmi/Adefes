import Layout from '@/src/components/Layout';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Collections | Adefes Fashion House',
  description: 'Browse our curated collections of premium Agbada, Kaftan, and Senator styles.',
};

export default function Collections() {
    const collections = [
        {
            name: 'Premium Agbada',
            description: 'Our signature collection of handcrafted Agbada with intricate embroidery',
            image: '/images/agbada-collection.png',
            href: '/shop?category=Agbada'
        },
        {
            name: 'Modern Kaftan',
            description: 'Contemporary Kaftan designs for the modern Nigerian man',
            image: '/images/kaftan-senator.png',
            href: '/shop?category=Kaftan'
        },
        {
            name: 'Senator & Suits',
            description: 'Sharp Senator styles and classic suits for every occasion',
            image: '/images/craftsmanship-detail.png',
            href: '/shop?category=Senator'
        }
    ];

    return (
        <Layout>
            <div className="min-h-screen bg-white">
                {/* Header */}
                <div className="bg-gray-50 py-16 sm:py-24 border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-5xl font-playfair font-bold">Collections</h1>
                        <p className="text-gray-600 mt-4">Explore our curated selections</p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {collections.map((collection) => (
                            <Link key={collection.name} href={collection.href} className="group">
                                <div className="relative overflow-hidden h-[300px] mb-6">
                                    <Image
                                        src={collection.image}
                                        alt={collection.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <h3 className="text-2xl font-playfair font-bold mb-2 group-hover:text-brand-gold transition-colors">{collection.name}</h3>
                                <p className="text-gray-600">{collection.description}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
