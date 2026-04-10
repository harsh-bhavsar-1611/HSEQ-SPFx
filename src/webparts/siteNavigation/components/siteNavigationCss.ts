export const SITE_NAVIGATION_CSS = `
.siteNavigationRoot {
  width: 100%;
}

.siteNavigationShell {
  display: flex;
  min-height: 380px;
  width: 100%;
  border: 1px solid #d8d8d8;
  border-radius: 18px;
  overflow: hidden;
  background: linear-gradient(135deg, #f4f8fb 0%, #ffffff 58%, #edf5f3 100%);
  box-shadow: 0 14px 34px rgba(17, 24, 39, 0.08);
}

.siteNavigationShell.dark {
  background: linear-gradient(135deg, #14212b 0%, #0f1720 62%, #17322a 100%);
  border-color: #274052;
  box-shadow: 0 18px 38px rgba(0, 0, 0, 0.28);
}

.siteNavigationSidebar {
  width: 288px;
  padding: 18px 14px;
  background: rgba(11, 89, 93, 0.97);
  color: #ffffff;
  transition: width 0.28s ease, padding 0.28s ease;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.siteNavigationShell.dark .siteNavigationSidebar {
  background: rgba(8, 37, 48, 0.98);
}

.siteNavigationSidebar.collapsed {
  width: 86px;
  padding-left: 10px;
  padding-right: 10px;
}

.siteNavigationTop {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.siteNavigationIdentity {
  min-width: 0;
}

.siteNavigationEyebrow {
  margin: 0 0 6px;
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.72);
}

.siteNavigationTitle {
  margin: 0;
  font-size: 22px;
  line-height: 1.2;
  font-weight: 700;
}

.siteNavigationSubtitle {
  margin: 8px 0 0;
  font-size: 13px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.78);
}

.siteNavigationSidebar.collapsed .siteNavigationTitle,
.siteNavigationSidebar.collapsed .siteNavigationSubtitle,
.siteNavigationSidebar.collapsed .siteNavigationEyebrow,
.siteNavigationSidebar.collapsed .siteNavigationLinkLabel,
.siteNavigationSidebar.collapsed .siteNavigationLinkMeta {
  display: none;
}

.siteNavigationCollapseButton {
  width: 38px;
  height: 38px;
  border: 0;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.14);
  color: #ffffff;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease, transform 0.2s ease;
}

.siteNavigationCollapseButton:hover {
  background: rgba(255, 255, 255, 0.22);
  transform: translateY(-1px);
}

.siteNavigationLinks {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.siteNavigationLink {
  width: 100%;
  border: 1px solid transparent;
  border-radius: 16px;
  padding: 14px 12px;
  color: inherit;
  background: rgba(255, 255, 255, 0.08);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}

.siteNavigationLink:hover {
  background: rgba(255, 255, 255, 0.16);
  border-color: rgba(255, 255, 255, 0.18);
  transform: translateX(2px);
}

.siteNavigationLink.active {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.24);
}

.siteNavigationIcon {
  width: 42px;
  height: 42px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.14);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  font-weight: 700;
  flex-shrink: 0;
}

.siteNavigationLinkText {
  min-width: 0;
}

.siteNavigationLinkLabel {
  display: block;
  font-size: 15px;
  font-weight: 600;
  color: #ffffff;
}

.siteNavigationLinkMeta {
  display: block;
  margin-top: 4px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.74);
}

.siteNavigationBody {
  flex: 1;
  padding: 28px 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  color: #16303b;
}

.siteNavigationShell.dark .siteNavigationBody {
  color: #e7f0f5;
}

.siteNavigationBadge {
  display: inline-flex;
  width: fit-content;
  align-items: center;
  gap: 8px;
  padding: 7px 12px;
  border-radius: 999px;
  background: rgba(11, 89, 93, 0.1);
  color: #0b595d;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.siteNavigationShell.dark .siteNavigationBadge {
  background: rgba(141, 228, 213, 0.12);
  color: #8de4d5;
}

.siteNavigationHeading {
  margin: 14px 0 10px;
  font-size: 28px;
  line-height: 1.15;
}

.siteNavigationDescription {
  margin: 0;
  max-width: 560px;
  font-size: 15px;
  line-height: 1.7;
  color: #435a64;
}

.siteNavigationShell.dark .siteNavigationDescription {
  color: #bdd0d9;
}

.siteNavigationInfoCard {
  padding: 18px 20px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.74);
  border: 1px solid rgba(11, 89, 93, 0.12);
  backdrop-filter: blur(4px);
}

.siteNavigationShell.dark .siteNavigationInfoCard {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(141, 228, 213, 0.14);
}

.siteNavigationInfoTitle {
  margin: 0 0 6px;
  font-size: 16px;
  font-weight: 700;
}

.siteNavigationInfoText {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: #516974;
}

.siteNavigationShell.dark .siteNavigationInfoText {
  color: #c4d6de;
}

@media (max-width: 768px) {
  .siteNavigationShell {
    flex-direction: column;
  }

  .siteNavigationSidebar,
  .siteNavigationSidebar.collapsed {
    width: 100%;
    padding: 16px 14px;
  }

  .siteNavigationSidebar.collapsed .siteNavigationTitle,
  .siteNavigationSidebar.collapsed .siteNavigationSubtitle,
  .siteNavigationSidebar.collapsed .siteNavigationEyebrow,
  .siteNavigationSidebar.collapsed .siteNavigationLinkLabel,
  .siteNavigationSidebar.collapsed .siteNavigationLinkMeta {
    display: block;
  }

  .siteNavigationBody {
    padding: 22px 18px;
  }

  .siteNavigationHeading {
    font-size: 24px;
  }
}
`;
