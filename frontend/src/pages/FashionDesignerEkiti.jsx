import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, MapPin, Star, CheckCircle, Scissors, Clock } from 'lucide-react';
import SEO from '../components/SEO';

const FashionDesignerEkiti = () => {
    const whatsappUrl = `https://wa.me/2348154280329?text=${encodeURIComponent("Hello Adefes! I found you while searching for a fashion designer in Ekiti. I'd like to discuss a custom outfit.")}`;

    return (
        <div className="min-h-screen bg-white">
            <SEO
                title="Best Fashion Designer in Ekiti | Adefes Fashion House"
                description="Looking for the best fashion designer in Ekiti? Adefes Fashion House in Ado Ekiti specializes in Agbada, Kaftan, Senator styles, aso ebi, and custom tailoring. Call 08154280329."
                keywords="fashion designer in Ekiti, best fashion designer in Ekiti, tailor in Ekiti, clothing designer in Ekiti, Agbada designer Ado Ekiti, aso ebi Ekiti, custom tailor Ekiti, fashion house Ekiti, men's wear Ekiti"
                url="https://adefes.com/fashion-designer-ekiti"
            />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-brand-charcoal via-brand-emerald-dark to-black text-white py-20 lg:py-32 overflow-hidden">
                {/* Subtle overlay pattern/animation */}
                <div className="absolute inset-0 bg-brand-gold/5 blur-[100px] rounded-full animate-pulse"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-2 mb-4">
                            <MapPin className="h-4 w-4 text-green-400" />
                            <span className="text-green-400 text-sm font-bold uppercase tracking-widest">Ado Ekiti, Nigeria</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold mb-6 leading-tight">
                            Fashion Designer in Ekiti
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed">
                            Welcome to <strong>Adefes Fashion House</strong> — the premier <strong>fashion designer in Ekiti</strong>, Nigeria. We create breathtaking Agbada, Kaftan, Senator styles, and custom men's traditional wear with handcrafted embroidery that tells your story.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-5 relative z-10">
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[#25D366] text-white px-8 py-4 uppercase tracking-[0.2em] text-[10px] font-bold flex items-center justify-center gap-3 hover:bg-[#20bd5a] hover:-translate-y-1 hover:shadow-xl transition-all duration-300 rounded-sm"
                            >
                                <Phone className="h-4 w-4" />
                                Contact on WhatsApp
                            </a>
                            <Link
                                to="/shop"
                                className="bg-brand-gold text-brand-charcoal px-8 py-4 uppercase tracking-[0.2em] text-[10px] font-bold flex items-center justify-center gap-3 hover:bg-brand-ivory hover:-translate-y-1 hover:shadow-xl transition-all duration-300 rounded-sm group"
                            >
                                Browse Our Collection
                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* About / Introduction */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24" aria-labelledby="about-heading">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 id="about-heading" className="text-3xl sm:text-4xl font-playfair font-bold mb-6">
                            Why Adefes is the Best Fashion Designer in Ekiti
                        </h2>
                        <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                            <p>
                                If you're searching for a <strong>fashion designer in Ekiti</strong>, you've found the right place. <strong>Adefes Fashion House</strong>, based in <strong>Ado Ekiti</strong>, has built a reputation as the most trusted name in Nigerian men's traditional fashion across Ekiti State.
                            </p>
                            <p>
                                Whether you need a grand <strong>Agbada for your wedding</strong>, a sharp <strong>Senator style for the office</strong>, a flowing <strong>Kaftan for Friday prayers</strong>, or stunning <strong>aso ebi</strong> coordination for your family celebrations — our master tailors deliver perfection every time.
                            </p>
                            <p>
                                We serve clients across <strong>Ado Ekiti, Ikere Ekiti, Ijero Ekiti, Ikole Ekiti, Efon Alaaye</strong>, and all communities throughout Ekiti State. Our <strong>clothing designer</strong> team combines decades of traditional tailoring expertise with contemporary design to create pieces you'll wear with pride.
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <img
                            src="/images/hero-agbada.png"
                            alt="Premium Agbada by Adefes - the best fashion designer in Ekiti"
                            className="w-full rounded-lg shadow-lg"
                            loading="lazy"
                        />
                        <img
                            src="/images/craftsmanship-detail.png"
                            alt="Hand-stitched embroidery detail by Adefes Fashion designer in Ekiti"
                            className="w-full rounded-lg shadow-lg mt-8"
                            loading="lazy"
                        />
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="bg-gray-50 py-16 lg:py-24" aria-labelledby="services-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 id="services-heading" className="text-3xl sm:text-4xl font-playfair font-bold mb-4">Our Fashion Design Services in Ekiti</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            As the leading <strong>tailor in Ekiti</strong>, we offer a comprehensive range of men's fashion services.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Agbada Design & Tailoring",
                                desc: "Grand three-piece Agbada ensembles with heavy hand-stitched embroidery. Guinea brocade, aso-oke, and damask fabrics. Perfect for weddings, owambe, and ceremonies.",
                                icon: Scissors,
                            },
                            {
                                title: "Kaftan & Jalabiya",
                                desc: "Elegant Kaftan designs in lightweight and premium fabrics. Modern cuts with traditional embroidery for casual elegance and Friday style.",
                                icon: Star,
                            },
                            {
                                title: "Senator Styles",
                                desc: "Sharp, tailored Senator wear that commands respect. Clean lines, mandarin collars, and subtle embroidery for professional and social occasions.",
                                icon: CheckCircle,
                            },
                            {
                                title: "Aso Ebi Coordination",
                                desc: "Complete aso ebi fabric coordination and tailoring for families, groups, and wedding parties across Ekiti State.",
                                icon: Star,
                            },
                            {
                                title: "Custom Bespoke Tailoring",
                                desc: "Made-to-measure garments crafted to your exact specifications. Personal consultations available at our Ado Ekiti studio.",
                                icon: Scissors,
                            },
                            {
                                title: "Express & Rush Orders",
                                desc: "Need an outfit quickly? Our express service delivers premium quality with faster turnaround times for urgent occasions.",
                                icon: Clock,
                            },
                        ].map((service, idx) => (
                            <article key={idx} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="bg-black text-white w-12 h-12 flex items-center justify-center rounded-full mb-6">
                                    <service.icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{service.desc}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24" aria-labelledby="why-heading">
                <h2 id="why-heading" className="text-3xl sm:text-4xl font-playfair font-bold mb-12 text-center">
                    Why Choose Our Fashion House in Ekiti?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {[
                        { title: "Master Craftsmen", desc: "Our tailors have 15+ years of experience crafting premium Nigerian traditional wear." },
                        { title: "Premium Fabrics Only", desc: "We use only the finest guinea brocade, aso-oke, damask, and Italian fabrics." },
                        { title: "Based in Ado Ekiti", desc: "Conveniently located in Ado Ekiti with delivery across all of Ekiti State and Nigeria." },
                        { title: "Perfect Fit Guarantee", desc: "We take precise measurements and offer alterations until you're 100% satisfied." },
                        { title: "Competitive Pricing", desc: "Premium quality at fair prices. We believe luxury should be accessible." },
                        { title: "On-Time Delivery", desc: "We respect your deadlines. Your outfit will be ready when promised." },
                    ].map((item, idx) => (
                        <div key={idx} className="flex gap-4">
                            <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                                <p className="text-gray-600">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Areas We Serve */}
            <section className="bg-gray-50 py-16 lg:py-24" aria-labelledby="areas-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 id="areas-heading" className="text-3xl sm:text-4xl font-playfair font-bold mb-6 text-center">
                        Areas We Serve in Ekiti State
                    </h2>
                    <p className="text-gray-600 text-lg text-center max-w-3xl mx-auto mb-12">
                        While our studio is based in <strong>Ado Ekiti</strong>, we proudly serve clients across all local government areas in Ekiti State. Whether you're in the city or surrounding towns, our fashion design services are available to you.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
                        {[
                            "Ado Ekiti", "Ikere Ekiti", "Ijero Ekiti", "Ikole Ekiti",
                            "Efon Alaaye", "Aramoko Ekiti", "Omuo Ekiti", "Ise Ekiti",
                            "Emure Ekiti", "Ilawe Ekiti", "Igede Ekiti", "Oye Ekiti",
                            "Otun Ekiti", "Ido Ekiti", "Gbonyin", "Ekiti West"
                        ].map((area) => (
                            <span key={area} className="bg-white border border-gray-200 px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-black hover:text-white hover:border-black transition-all cursor-default">
                                {area}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24" aria-labelledby="testimonials-heading">
                <h2 id="testimonials-heading" className="text-3xl sm:text-4xl font-playfair font-bold mb-12 text-center">
                    What Our Clients in Ekiti Say
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            name: "Chief Adebayo O.",
                            location: "Ado Ekiti",
                            text: "Adefes made the most stunning Agbada I've ever worn for my chieftaincy ceremony. The embroidery work is world-class. Truly the best fashion designer in Ekiti!",
                        },
                        {
                            name: "Engr. Femi A.",
                            location: "Ikere Ekiti",
                            text: "I've been using Adefes for all my Senator styles for the past 3 years. The fit is always perfect, and the quality is unmatched anywhere in Ekiti.",
                        },
                        {
                            name: "Dr. Oladipo T.",
                            location: "Ijero Ekiti",
                            text: "They coordinated our entire family's aso ebi for my daughter's wedding. From fabric selection to final delivery, the service was exceptional.",
                        },
                    ].map((review, idx) => (
                        <article key={idx} className="bg-gray-50 p-8 rounded-xl">
                            <div className="flex gap-1 mb-4">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <p className="text-gray-700 mb-6 italic leading-relaxed">"{review.text}"</p>
                            <div>
                                <p className="font-bold text-sm">{review.name}</p>
                                <p className="text-gray-500 text-xs">{review.location}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative bg-gradient-to-t from-black to-brand-emerald-dark text-brand-ivory py-16 lg:py-24 overflow-hidden" aria-labelledby="cta-heading">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h2 id="cta-heading" className="text-3xl sm:text-4xl font-playfair font-bold mb-6 text-brand-gold drop-shadow-md">
                        Ready to Look Your Best?
                    </h2>
                    <p className="text-brand-ivory/80 text-lg mb-10 max-w-2xl mx-auto">
                        Whether you need a grand Agbada for your wedding or a sharp Senator style for the boardroom, the best <strong>fashion designer in Ekiti</strong> is ready to serve you. Contact us today for a consultation.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-5 justify-center">
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#25D366] text-white px-8 py-4 uppercase tracking-[0.2em] text-[10px] font-bold flex items-center justify-center gap-3 hover:bg-[#20bd5a] hover:-translate-y-1 hover:shadow-xl transition-all duration-300 rounded-sm"
                        >
                            <Phone className="h-4 w-4" />
                            WhatsApp: 08154280329
                        </a>
                        <a
                            href="tel:+2348154280329"
                            className="bg-brand-gold text-brand-charcoal px-8 py-4 uppercase tracking-[0.2em] text-[10px] font-bold flex items-center justify-center gap-3 hover:bg-brand-ivory hover:-translate-y-1 hover:shadow-xl transition-all duration-300 rounded-sm"
                        >
                            <Phone className="h-4 w-4" />
                            Call: 08154280329
                        </a>
                    </div>
                    <p className="mt-6 text-gray-400 text-sm">
                        <MapPin className="h-4 w-4 inline mr-1" />
                        Ado Ekiti, Ekiti State, Nigeria
                    </p>
                </div>
            </section>

            {/* FAQ Schema / Bottom Content */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24" aria-labelledby="faq-heading">
                <h2 id="faq-heading" className="text-3xl font-playfair font-bold mb-8 text-center">
                    Frequently Asked Questions
                </h2>
                <div className="space-y-6">
                    {[
                        {
                            q: "Where is Adefes Fashion House located in Ekiti?",
                            a: "Adefes Fashion House is located in Ado Ekiti, the capital of Ekiti State, Nigeria. We serve clients across all areas of Ekiti State and offer nationwide delivery."
                        },
                        {
                            q: "What types of clothing do you design?",
                            a: "We specialize in Nigerian men's traditional wear including Agbada, Kaftan, Senator styles, and accessories like fila caps and coral beads. We also handle aso ebi coordination for families and groups."
                        },
                        {
                            q: "How long does it take to make a custom Agbada?",
                            a: "A standard Agbada order takes 2-3 weeks for completion. For rush orders, we offer express service with faster turnaround times. Contact us for specific timelines."
                        },
                        {
                            q: "Do you deliver outside Ekiti State?",
                            a: "Yes! While we're based in Ado Ekiti, we deliver across Nigeria. Free delivery within Ekiti State, and affordable nationwide shipping for other states."
                        },
                        {
                            q: "How do I book a consultation?",
                            a: "Simply send us a WhatsApp message at 08154280329 or call us directly. We'll schedule a time for you to visit our studio in Ado Ekiti for measurements and fabric selection."
                        }
                    ].map((faq, idx) => (
                        <details key={idx} className="group border-b border-gray-200 pb-4">
                            <summary className="flex justify-between items-center cursor-pointer py-2 font-bold text-lg">
                                {faq.q}
                                <span className="text-xl group-open:rotate-45 transition-transform ml-4">+</span>
                            </summary>
                            <p className="text-gray-600 mt-2 leading-relaxed">{faq.a}</p>
                        </details>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default FashionDesignerEkiti;
