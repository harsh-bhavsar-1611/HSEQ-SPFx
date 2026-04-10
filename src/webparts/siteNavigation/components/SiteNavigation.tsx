import * as React from 'react';
import { FontIcon } from '@fluentui/react';
import type { ISiteNavigationProps } from './ISiteNavigationProps';
import { SITE_NAVIGATION_CSS } from './siteNavigationCss';

const NAV_LINKS = [
  {
    key: 'hseq',
    label: 'HSEQ',
    description: 'Open the HSEQ site page',
    shortLabel: 'HQ',
    iconName: 'CheckList',
    url: 'https://futurrizontech.sharepoint.com/sites/SkylineBuilders2/SitePages/HSEQ.aspx'
  },
  {
    key: 'skyline',
    label: 'Skyline',
    description: 'Open the Skyline home page',
    shortLabel: 'SK',
    iconName: 'Home',
    url: 'https://futurrizontech.sharepoint.com/sites/SkylineBuilders2/SitePages/Home.aspx'
  }
] as const;

const SiteNavigation: React.FC<ISiteNavigationProps> = ({ isDarkTheme }) => {
  const [isCollapsed, setIsCollapsed] = React.useState<boolean>(false);

  const activeUrl = typeof window !== 'undefined' ? window.location.href.toLowerCase() : '';

  return (
    <div className="siteNavigationRoot">
      <style>{SITE_NAVIGATION_CSS}</style>
      <section className={`siteNavigationShell ${isDarkTheme ? 'dark' : ''}`}>
        <aside className={`siteNavigationSidebar ${isCollapsed ? 'collapsed' : ''}`}>
          <div className="siteNavigationTop">
            <div className="siteNavigationIdentity">
              <p className="siteNavigationEyebrow">Quick Access</p>
              <h2 className="siteNavigationTitle">Site Navigation</h2>
              <p className="siteNavigationSubtitle">Move between the HSEQ page and the Skyline landing page.</p>
            </div>
            <button
              type="button"
              className="siteNavigationCollapseButton"
              aria-label={isCollapsed ? 'Expand side navigation' : 'Collapse side navigation'}
              onClick={() => setIsCollapsed((previous) => !previous)}
            >
              <FontIcon iconName={isCollapsed ? 'DoubleChevronRight' : 'DoubleChevronLeft'} />
            </button>
          </div>

          <nav className="siteNavigationLinks" aria-label="Site page links">
            {NAV_LINKS.map((link) => {
              const isActive = activeUrl === link.url.toLowerCase();

              return (
                <a
                  key={link.key}
                  className={`siteNavigationLink ${isActive ? 'active' : ''}`}
                  href={link.url}
                  target="_self"
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="siteNavigationIcon" aria-hidden="true">
                    {isCollapsed ? link.shortLabel : <FontIcon iconName={link.iconName} />}
                  </span>
                  <span className="siteNavigationLinkText">
                    <span className="siteNavigationLinkLabel">{link.label}</span>
                    <span className="siteNavigationLinkMeta">{link.description}</span>
                  </span>
                </a>
              );
            })}
          </nav>
        </aside>

        <div className="siteNavigationBody">
          <div>
            <span className="siteNavigationBadge">SharePoint</span>
            <h3 className="siteNavigationHeading">Collapsible sidebar for Skyline Builders</h3>
            <p className="siteNavigationDescription">
              Use the left navigation to open the requested SharePoint pages. The bar can be collapsed to save
              space and expanded again whenever you need it.
            </p>
          </div>

          <div className="siteNavigationInfoCard">
            <p className="siteNavigationInfoTitle">Available links</p>
            <p className="siteNavigationInfoText">
              `HSEQ` opens the HSEQ site page and `Skyline` opens the Skyline home page in the same browser tab.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SiteNavigation;
