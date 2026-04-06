import '@/src/globals.css';
import { Playfair_Display, Inter } from 'next/font/google';
import { Providers } from './providers';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Adefes Fashion House',
  description: 'Adefes Fashion House is the leading fashion designer in Ekiti, Nigeria, offering premium bespoke Agbada, Kaftan, Senator styles and accessories.',
  url: 'https://adefes.com',
  telephone: '+2348154280329',
  priceRange: '₦₦₦',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Ado Ekiti',
    addressLocality: 'Ado Ekiti',
    addressRegion: 'Ekiti',
    postalCode: '360001',
    addressCountry: 'NG',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 7.7753,
    longitude: 5.2186,
  },
  sameAs: [
    'https://instagram.com/adefes',
    'https://twitter.com/adefes',
    'https://facebook.com/adefes',
  ],
  openingHours: ['Mon-Sat 09:00-18:00'],
};

export const metadata = {
  metadataBase: new URL('https://adefes.com'),
  title: 'Adefes | Best Fashion Designer in Ekiti | Agbada & Men\'s Wear',
  description: 'Adefes is the best fashion designer in Ekiti, Nigeria. Premium Agbada, Kaftan, Senator styles with handcrafted embroidery. Based in Ado Ekiti. Call 08154280329.',
  keywords: 'fashion designer in Ekiti, tailor in Ekiti, Agbada designer Ekiti, best fashion designer in Ekiti, clothing designer Ekiti, aso ebi Ekiti, Nigerian fashion, men\'s traditional wear, bespoke tailor Ado-Ekiti, Aso-ebi designer Ekiti State',
  authors: [{ name: 'Adefes Fashion House' }],
  creator: 'Adefes Fashion House',
  publisher: 'Adefes Fashion House',
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: 'https://adefes.com',
    title: 'Adefes | Best Fashion Designer in Ekiti',
    description: 'Premium handcrafted Nigerian men\'s traditional wear — Agbada, Kaftan, Senator styles',
    siteName: 'Adefes Fashion House',
    images: [
      {
        url: '/images/hero-agbada.png',
        width: 1200,
        height: 630,
        alt: 'Adefes Fashion House',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adefes | Fashion Designer in Ekiti',
    description: 'Premium Agbada & Men\'s Wear',
    images: ['/images/hero-agbada.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://adefes.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1B4D3E" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="font-sans antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
