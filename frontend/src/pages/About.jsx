import React from 'react';
import { Sparkles, Scissors, Users } from 'lucide-react';
import SEO from '../components/SEO';

const About = () => {
    return (
        <div className="min-h-screen bg-white">
            <SEO
                title="About Adefes | Fashion Designer in Ekiti, Nigeria"
                description="Learn about Adefes Fashion House — the leading fashion designer in Ekiti. Based in Ado Ekiti, our master tailors craft premium Agbada, Kaftan, and Senator styles."
                url="https://adefes.com/about"
            />
            {/* Hero Section */}
            <section className="relative h-[60vh] overflow-hidden" aria-label="About Adefes Banner">
                <img
                    src="/images/agbada-collection.png"
                    alt="Adefes Fashion House - Premium Nigerian Agbada and men's traditional wear showroom"
                    className="w-full h-full object-cover"
                    loading="eager"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <h1 className="text-5xl sm:text-7xl font-playfair font-bold text-white tracking-tight">Our Story</h1>
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32" aria-labelledby="philosophy-heading">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 id="philosophy-heading" className="text-3xl sm:text-4xl font-playfair font-bold mb-8">Crafting Heritage, Defining Style</h2>
                        <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                            <p>
                                Founded in Lagos, Nigeria, <strong>ADEFES</strong> was born from a deep reverence for the <strong>Agbada</strong> — one of West Africa's most iconic garments. Our mission is to elevate Nigerian men's traditional wear to a global luxury standard while preserving the artistry that makes it truly extraordinary.
                            </p>
                            <p>
                                Every garment is meticulously handcrafted in our Lagos atelier, where master tailors with decades of experience bring together <strong>premium guinea brocade, aso-oke, and damask fabrics</strong> with intricate hand-stitched embroidery. Our designs honour the rich traditions of Yoruba, Hausa, and broader Nigerian fashion while embracing contemporary silhouettes.
                            </p>
                            <p>
                                From grand <strong>owambe celebrations</strong> and <strong>Nigerian weddings</strong> to boardroom presence and everyday distinction — Adefes dresses the modern Nigerian man for every stage of life.
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <img
                            src="/images/craftsmanship-detail.png"
                            alt="Hand-stitched gold embroidery on premium Agbada fabric - traditional Nigerian tailoring craftsmanship"
                            className="w-full h-full object-cover rounded-lg"
                            loading="lazy"
                        />
                        <img
                            src="/images/about-studio.png"
                            alt="Adefes design studio with premium aso-oke and damask fabrics - Lagos fashion atelier"
                            className="w-full h-full object-cover rounded-lg mt-8"
                            loading="lazy"
                        />
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="bg-gray-50 py-20 lg:py-32" aria-labelledby="values-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 id="values-heading" className="text-3xl sm:text-4xl font-playfair font-bold mb-4">Our Values</h2>
                        <div className="h-1 w-12 bg-black mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <article className="text-center p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="bg-black text-white w-12 h-12 flex items-center justify-center rounded-full mx-auto mb-6">
                                <Scissors className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Master Craftsmanship</h3>
                            <p className="text-gray-600">
                                Every stitch tells a story. Our master tailors bring decades of experience to create Agbada and men's wear with unparalleled precision and artistry.
                            </p>
                        </article>
                        <article className="text-center p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="bg-black text-white w-12 h-12 flex items-center justify-center rounded-full mx-auto mb-6">
                                <Sparkles className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Premium Materials</h3>
                            <p className="text-gray-600">
                                We source only the finest guinea brocade, aso-oke, and damask fabrics, paired with gold and silver embroidery threads for a truly luxurious finish.
                            </p>
                        </article>
                        <article className="text-center p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="bg-black text-white w-12 h-12 flex items-center justify-center rounded-full mx-auto mb-6">
                                <Users className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Cultural Pride</h3>
                            <p className="text-gray-600">
                                We celebrate and preserve Nigerian fashion heritage, ensuring that the art of the Agbada and traditional men's wear thrives for future generations.
                            </p>
                        </article>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
