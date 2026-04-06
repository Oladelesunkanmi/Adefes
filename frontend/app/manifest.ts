export default async function manifest() {
  return {
    name: 'Adefes Fashion House',
    short_name: 'Adefes',
    description: 'Premium Nigerian men\'s traditional wear - Agbada, Kaftan, Senator styles',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1B4D3E',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
    categories: ['shopping', 'fashion'],
    orientation: 'portrait-primary',
  };
}
