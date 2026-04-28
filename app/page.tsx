import OS from '../src/components/OS';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shindekalpesharun OS | Portfolio',
  description: 'Interactive portfolio of Kalpesh Shinde - Full-Stack & Android Developer',
};

export default function Home() {
  return <OS />;
}