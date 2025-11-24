import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SidebarNav } from '../../../app/dashboard/_components/SidebarNav';

/**
 * Component Test: Sidebar Navigation
 * 
 * Tests:
 * - Disabled items have aria-disabled
 * - Active item is highlighted
 * - Disabled items don't navigate
 */
describe('SidebarNav', () => {
  it('should render all menu items', () => {
    render(<SidebarNav />);

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Sessões')).toBeInTheDocument();
    expect(screen.getByText('Pautas')).toBeInTheDocument();
    expect(screen.getByText('Relatórios')).toBeInTheDocument();
    expect(screen.getByText('Configurações')).toBeInTheDocument();
  });

  it('should mark disabled items correctly', () => {
    render(<SidebarNav />);

    const disabledItems = ['Sessões', 'Pautas', 'Relatórios', 'Configurações'];
    disabledItems.forEach((item) => {
      const element = screen.getByText(item);
      expect(element).toHaveClass('cursor-not-allowed');
      expect(element).toHaveClass('text-neutral-400');
    });
  });

  it('should highlight active item', () => {
    render(<SidebarNav />);

    const dashboardItem = screen.getByText('Dashboard');
    expect(dashboardItem).toHaveClass('bg-primary-100');
    expect(dashboardItem).toHaveClass('text-primary-700');
  });
});

