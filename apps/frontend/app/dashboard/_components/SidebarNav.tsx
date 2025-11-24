import type { MenuItemState } from '@shared/contracts';
import Link from 'next/link';

/**
 * Sidebar Navigation Component
 * 
 * Displays menu items with active/disabled states
 */
export function SidebarNav() {
  const menuItems: MenuItemState[] = [
    { label: 'Dashboard', route: '/dashboard', isActive: true, isDisabled: false },
    { label: 'Sessões', route: '/sessions', isActive: false, isDisabled: true },
    { label: 'Pautas', route: '/agendas', isActive: false, isDisabled: true },
    { label: 'Relatórios', route: '/reports', isActive: false, isDisabled: true },
    { label: 'Configurações', route: '/settings', isActive: false, isDisabled: true },
  ];

  return (
    <nav className="w-64 bg-neutral-50 border-r border-neutral-200 p-4">
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.route}>
            {item.isDisabled ? (
              <span className="block px-4 py-2 text-neutral-400 cursor-not-allowed">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.route}
                className={`block px-4 py-2 rounded-md ${
                  item.isActive
                    ? 'bg-primary-100 text-primary-700 font-medium'
                    : 'text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

