import Link from 'next/link';
import { Anchor, FileText, Briefcase, Share2, Home } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white font-bold text-xl">Diver Logbook</Link>
        <div className="space-x-4">
          <NavLink href="/" icon={<Home className="w-4 h-4" />} />
          <NavLink href="/log-dive" icon={<Anchor className="w-4 h-4" />} />
          <NavLink href="/certifications" icon={<FileText className="w-4 h-4" />} />
          <NavLink href="/upcoming-jobs" icon={<Briefcase className="w-4 h-4" />} />
          <NavLink href="/share-logbook" icon={<Share2 className="w-4 h-4" />} />
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, icon }) {
  return (
    <Link href={href} className="text-white hover:text-blue-200">
      {icon}
    </Link>
  );
}