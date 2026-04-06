import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Fashion Designer in Ekiti | Adefes',
  description: 'Best fashion designer in Ado-Ekiti, Nigeria. Premium Agbada, Kaftan, and bespoke tailoring. We serve Ekiti State and beyond.',
};

export default function FashionDesignerEkiti() {
  // This page redirects to about page
  redirect('/about');
}
