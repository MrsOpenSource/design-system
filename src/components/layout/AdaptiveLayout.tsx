import React, { useState, useEffect } from 'react';
import { Sidebar } from '../organisms/Sidebar';
import { NavigationRail } from './NavigationRail';
import { BottomNavigation, BottomNavItem } from './BottomNavigation';
import { HamburgerMenu } from '../molecules/HamburgerMenu';

export interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: string | number;
  href?: string;
}

export interface AdaptiveLayoutProps {
  brandName?: string;
  brandLogo?: React.ReactNode;
  items: NavigationItem[];
  activeItemId: string;
  onNavigate: (id: string) => void;
  userProfile?: {
    name: string;
    role: string;
    avatarUrl?: string;
  };
  children: React.ReactNode;
  headerActions?: React.ReactNode;
  className?: string;
}

/**
 * AdaptiveLayout: Master Multi-Device App Shell
 * Seamlessly morphs navigation across device tiers:
 * - Desktop (>1024px): Persistent Sidebar (260px) with collapsible rail mode
 * - Tablet (600px–1024px): Vertical Navigation Rail (72px) maximizing horizontal canvas
 * - Phone (<600px): Top App Bar + Hamburger Drawer + Bottom Navigation Bar (64px, thumb-zone)
 */
export const AdaptiveLayout: React.FC<AdaptiveLayoutProps> = ({
  brandName = 'Enterprise DS',
  brandLogo,
  items,
  activeItemId,
  onNavigate,
  userProfile,
  children,
  headerActions,
  className = '',
}) => {
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'phone'>('desktop');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkViewport = () => {
      const width = window.innerWidth;
      if (width < 600) {
        setViewport('phone');
      } else if (width <= 1024) {
        setViewport('tablet');
      } else {
        setViewport('desktop');
      }
    };

    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  // Adapt items for sidebar
  const sidebarNavItems = items.map((item) => ({
    key: item.id,
    label: item.label,
    icon: item.icon,
    active: item.id === activeItemId,
    badge: item.badge ? String(item.badge) : undefined,
  }));

  // Adapt items for bottom nav (max 5 items)
  const bottomNavItems: BottomNavItem[] = items.slice(0, 5).map((item) => ({
    id: item.id,
    label: item.label,
    icon: item.icon,
    badge: item.badge,
  }));

  return (
    <div
      className={`eds-adaptive-layout viewport-${viewport} ${className}`}
      style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: 'var(--sys-color-background, #F8FAFC)',
        fontFamily: 'var(--typography-font-family-sans, "Inter", sans-serif)',
        color: 'var(--sys-color-text-primary, #0F172A)',
      }}
    >
      {/* 1. DESKTOP VIEW (>1024px): Persistent Sidebar */}
      {viewport === 'desktop' && (
        <Sidebar
          brandName={brandName}
          navItems={sidebarNavItems}
          onSelect={(key) => onNavigate(key)}
          user={userProfile}
        />
      )}

      {/* 2. TABLET VIEW (600px–1024px): Persistent Navigation Rail */}
      {viewport === 'tablet' && (
        <NavigationRail
          items={bottomNavItems}
          activeId={activeItemId}
          onSelect={onNavigate}
        />
      )}

      {/* 3. PHONE VIEW (<600px): Top Header Bar + Hamburger Drawer */}
      {viewport === 'phone' && (
        <>
          <header
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              height: '56px',
              backgroundColor: 'var(--sys-color-surface-card, #FFFFFF)',
              borderBottom: '1px solid var(--sys-color-border-subtle, #E2E8F0)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 16px',
              zIndex: 1100,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <HamburgerMenu
                isOpen={isMobileMenuOpen}
                onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                items={sidebarNavItems}
                onSelect={(key) => {
                  onNavigate(key);
                  setIsMobileMenuOpen(false);
                }}
              />
              <span style={{ fontWeight: 700, fontSize: '16px' }}>{brandName}</span>
            </div>
            {headerActions && <div>{headerActions}</div>}
          </header>

          {/* Bottom Navigation for Primary Phone Destinations */}
          <BottomNavigation
            items={bottomNavItems}
            activeId={activeItemId}
            onSelect={onNavigate}
          />
        </>
      )}

      {/* Main Workspace Content Area */}
      <main
        style={{
          flex: 1,
          minWidth: 0,
          padding: viewport === 'phone' ? '72px 16px 84px' : '24px 32px',
          boxSizing: 'border-box',
          overflowY: 'auto',
        }}
      >
        {children}
      </main>
    </div>
  );
};

