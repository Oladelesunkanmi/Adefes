import { useEffect } from 'react';

const LocalBusinessSchema = () => {
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': 'https://adefes.com',
      url: 'https://adefes.com',
      name: 'Adefes Fashion House',
      alternateName: 'Adefes - Fashion Designer in Ekiti',
      description: 'Premier fashion designer in Ekiti, Nigeria specializing in luxury Agbada, Kaftan, Senator styles, and custom men\'s traditional wear with handcrafted embroidery.',
      image: 'https://adefes.com/images/hero-agbada.png',
      logo: 'https://adefes.com/images/logo.png',
      telephone: '+2348154280329',
      email: 'contact@adefes.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Ado Ekiti',
        addressLocality: 'Ado Ekiti',
        addressRegion: 'Ekiti',
        postalCode: '360101',
        addressCountry: 'NG'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '7.6211',
        longitude: '5.2215'
      },
      areaServed: [
        { '@type': 'City', name: 'Ado Ekiti' },
        { '@type': 'State', name: 'Ekiti' },
        { '@type': 'City', name: 'Ikere Ekiti' },
        { '@type': 'City', name: 'Ijero Ekiti' },
        { '@type': 'City', name: 'Ikole Ekiti' },
        { '@type': 'Country', name: 'Nigeria' }
      ],
      priceRange: '₦₦₦',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00'
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Saturday',
          opens: '09:00',
          closes: '16:00'
        }
      ],
      sameAs: [
        'https://instagram.com/adefes',
        'https://twitter.com/adefes',
        'https://facebook.com/adefes'
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Nigerian Men\'s Traditional Wear',
        itemListElement: [
          {
            '@type': 'OfferCatalog',
            name: 'Agbada',
            description: 'Premium handcrafted Agbada with intricate embroidery',
            url: 'https://adefes.com/shop?category=Agbada'
          },
          {
            '@type': 'OfferCatalog',
            name: 'Kaftan',
            description: 'Modern and traditional Kaftan designs',
            url: 'https://adefes.com/shop?category=Kaftan'
          },
          {
            '@type': 'OfferCatalog',
            name: 'Senator Styles',
            description: 'Contemporary Senator wear for the modern man',
            url: 'https://adefes.com/shop?category=Senator'
          },
          {
            '@type': 'OfferCatalog',
            name: 'Custom Tailoring',
            description: 'Bespoke tailoring services for all occasions',
            url: 'https://adefes.com/shop'
          }
        ]
      },
      founder: {
        '@type': 'Person',
        name: 'Adefes Design Team'
      },
      foundingDate: '2020'
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
};

export default LocalBusinessSchema;
