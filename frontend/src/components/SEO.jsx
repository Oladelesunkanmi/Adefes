import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
    title = "Adefes Fashion House | Best Fashion Designer in Ekiti",
    description = "Adefes is the leading fashion designer in Ekiti, Nigeria. We specialize in premium Agbada, Kaftan, Senator styles, and custom men's traditional wear. Visit us in Ado Ekiti.",
    keywords = "fashion designer in Ekiti, tailor in Ekiti, Agbada designer Ekiti, best fashion designer in Ekiti, clothing designer Ekiti, aso ebi Ekiti, Nigerian fashion, men's traditional wear",
    url = "https://adefes.com",
    image = "https://adefes.com/images/hero-agbada.png",
    type = "website",
    jsonLd = null,
}) => {
    const defaultJsonLd = {
        "@context": "https://schema.org",
        "@type": "ClothingStore",
        "name": "Adefes Fashion House",
        "alternateName": "Adefes - Fashion Designer in Ekiti",
        "url": "https://adefes.com",
        "logo": "https://adefes.com/images/hero-agbada.png",
        "image": "https://adefes.com/images/hero-agbada.png",
        "description": "Premier fashion designer in Ekiti, Nigeria specializing in luxury Agbada, Kaftan, Senator styles, and custom men's traditional wear with handcrafted embroidery.",
        "telephone": "+2348154280329",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Ado Ekiti",
            "addressLocality": "Ado Ekiti",
            "addressRegion": "Ekiti",
            "addressCountry": "NG"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "7.6211",
            "longitude": "5.2215"
        },
        "areaServed": [
            { "@type": "City", "name": "Ado Ekiti" },
            { "@type": "State", "name": "Ekiti" },
            { "@type": "City", "name": "Ikere Ekiti" },
            { "@type": "City", "name": "Ijero Ekiti" },
            { "@type": "City", "name": "Ikole Ekiti" },
            { "@type": "City", "name": "Efon Alaaye" },
            { "@type": "Country", "name": "Nigeria" }
        ],
        "priceRange": "₦₦₦",
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:00",
                "closes": "18:00"
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Saturday",
                "opens": "09:00",
                "closes": "16:00"
            }
        ],
        "sameAs": [
            "https://instagram.com/adefes",
            "https://twitter.com/adefes",
            "https://facebook.com/adefes"
        ],
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Nigerian Men's Traditional Wear",
            "itemListElement": [
                {
                    "@type": "OfferCatalog",
                    "name": "Agbada",
                    "description": "Premium handcrafted Agbada with intricate embroidery"
                },
                {
                    "@type": "OfferCatalog",
                    "name": "Kaftan",
                    "description": "Modern and traditional Kaftan designs"
                },
                {
                    "@type": "OfferCatalog",
                    "name": "Senator Styles",
                    "description": "Contemporary Senator wear for the modern man"
                },
                {
                    "@type": "OfferCatalog",
                    "name": "Custom Tailoring",
                    "description": "Bespoke tailoring services for all occasions"
                }
            ]
        }
    };

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content="Adefes Fashion House" />
            <meta name="robots" content="index, follow" />
            <link rel="canonical" href={url} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:locale" content="en_NG" />
            <meta property="og:site_name" content="Adefes Fashion House" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={url} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(jsonLd || defaultJsonLd)}
            </script>
        </Helmet>
    );
};

export default SEO;
