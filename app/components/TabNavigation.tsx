"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface TabProps {
  href: string;
  label: string;
  active: boolean;
}

const Tab = ({ href, label, active }: TabProps) => {
  return (
    <Link href={href}>
      <div className={`px-4 py-3 text-center rounded-r-md transition-colors ${
        active 
          ? 'bg-green-600 text-white font-medium' 
          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
      }`}>
        {label}
      </div>
    </Link>
  );
};

export default function TabNavigation() {
  const pathname = usePathname();
  
  const tabs = [
    { href: '/chat', label: 'Chat' },
    { href: '/myplants', label: 'My Plants' }
  ];
  
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
      {tabs.map((tab) => (
        <Tab 
          key={tab.href}
          href={tab.href}
          label={tab.label}
          active={pathname === tab.href || 
                 (pathname === '/' && tab.href === '/myplants') ||
                 (pathname.startsWith('/chat') && tab.href === '/chat')}
        />
      ))}
    </div>
  );
} 