import Link from 'next/link';
import { getNavigationLinks } from '../data/navigation';

export default function Navbar() {
  const navLinks = getNavigationLinks();

  return (
    <nav className="bg-background-light p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-accent-color text-2xl font-bold glow-text">
          Game Studio
        </Link>
        <ul className="flex space-x-6">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link href={link.href} className="text-foreground-primary hover:text-accent-color transition-colors duration-300">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}