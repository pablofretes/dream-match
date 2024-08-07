import { UserGroupIcon, HomeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import './Links.module.css';
const links = [
  {
    name: 'Welcome',
    href: '/',
    icon: HomeIcon,
  },
  {
    name: 'Teams',
    href: '/teams',
    icon: UserGroupIcon,
  },
];

export default function Links() {
  return (
    <div className="flex flex-col md:flex-row md:items-center">
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className="flex items-center justify-center gap-2 rounded-md bg-gray-50 p-2 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:mx-2 md:p-2 mb-2 last:mb-0 md:mb-0"
          >
            <LinkIcon className="w-6 h-6" />
            <p>{link.name}</p>
          </Link>
        );
      })}
    </div>
  );
}
