import * as React from 'react';
import { Nav, INavLink } from '@fluentui/react';
import { HSEQ_NAV_ITEMS } from './constants';
import type { IHseqNavItem } from './models';

interface IHSEQSidebarProps {
  isMobile: boolean;
  navCollapsed: boolean;
  selectedModule: IHseqNavItem | undefined;
  onSelectModule: (item: IHseqNavItem) => void;
  onCloseMobile: () => void;
}

export const HSEQSidebar: React.FC<IHSEQSidebarProps> = ({
  isMobile,
  navCollapsed,
  selectedModule,
  onSelectModule,
  onCloseMobile
}) => {
  const navItems: INavLink[] = HSEQ_NAV_ITEMS.map((item, index) => ({
    name: item.label,
    url: '',
    iconProps: { iconName: item.iconName },
    key: `nav-${index}`,
    onClick: () => onSelectModule(item)
  }));

  return (
    <>
      {isMobile && !navCollapsed && (
        <button
          type="button"
          className="mobileOverlay"
          aria-label="Close navigation"
          onClick={onCloseMobile}
        />
      )}
      <nav className={`sidebar ${isMobile ? 'mobileSidebar' : ''} ${navCollapsed ? 'collapsed' : ''}`}>
        <div className="navContainer">
          <Nav
            groups={[{ links: navItems }]}
            selectedKey={`nav-${HSEQ_NAV_ITEMS.indexOf(selectedModule || HSEQ_NAV_ITEMS[0])}`}
            styles={{
              root: { width: '100%' },
              link: { padding: '8px 12px' }
            }}
          />
        </div>
      </nav>
    </>
  );
};
