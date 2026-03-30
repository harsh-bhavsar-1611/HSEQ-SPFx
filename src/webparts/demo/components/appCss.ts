export const APP_CSS = `
.hseq-shell {
  min-height: 100vh;
  background:
    radial-gradient(circle at top right, rgba(113, 183, 226, 0.24), transparent 28%),
    linear-gradient(180deg, #eef3f8 0%, #e3e8ef 100%);
  color: #223042;
  font-family: 'Segoe UI', Tahoma, Arial, sans-serif;
}

.hseq-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 20px;
  background: #0a1017;
  color: #fff;
  box-shadow: 0 8px 28px rgba(10, 16, 23, 0.28);
}

.hseq-brandWrap {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.hseq-brandMark {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 12px;
  background: linear-gradient(135deg, #4fb4ff 0%, #1e6bb8 100%);
  font-size: 13px;
  font-weight: 700;
}

.hseq-brandText {
  font-size: 18px;
  font-weight: 600;
}

.hseq-headerMeta {
  font-size: 12px;
  color: #b8c4d0;
  word-break: break-word;
}

.hseq-body {
  display: grid;
  grid-template-columns: 300px minmax(0, 1fr);
  min-height: calc(100vh - 64px);
  transition: grid-template-columns 0.18s ease;
}

.hseq-sidebarCollapsed {
  grid-template-columns: 88px minmax(0, 1fr);
}

.hseq-sidebar {
  padding: 18px;
  border-right: 1px solid rgba(132, 146, 166, 0.2);
  background: rgba(255, 255, 255, 0.76);
  backdrop-filter: blur(10px);
  min-width: 0;
}

.hseq-sidebarTop {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.hseq-hamburger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: 1px solid #d7dee7;
  border-radius: 16px;
  background: #fff;
  color: #314255;
  cursor: pointer;
  flex: 0 0 auto;
}

.hseq-sidebarTitle {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #6a7887;
}

.hseq-modulePill {
  margin-left: auto;
  padding: 8px 12px;
  border-radius: 999px;
  background: #d9eef9;
  color: #13649f;
  font-size: 11px;
  font-weight: 700;
}

.hseq-navList {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.hseq-navItem {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px 14px;
  border: 0;
  border-radius: 18px;
  background: transparent;
  color: #334357;
  font-size: 14px;
  text-align: left;
  cursor: pointer;
  transition: background 0.15s ease, transform 0.15s ease;
  min-width: 0;
}

.hseq-navItem:hover {
  background: #eef4f9;
  transform: translateX(2px);
}

.hseq-navItemActive {
  background: linear-gradient(135deg, #1d6798 0%, #2e84b8 100%);
  color: #fff;
  box-shadow: 0 10px 22px rgba(29, 103, 152, 0.28);
}

.hseq-navIcon {
  font-size: 15px;
  flex: 0 0 auto;
}

.hseq-navLabel {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.hseq-content {
  padding: 20px 22px;
  min-width: 0;
}

.hseq-hero {
  padding: 26px 28px;
  border-radius: 30px;
  background: linear-gradient(135deg, #20384d 0%, #2f6685 52%, #67a2bd 100%);
  box-shadow: 0 18px 42px rgba(38, 73, 97, 0.26);
  color: #fff;
}

.hseq-heroEyebrow {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #bfdff1;
}

.hseq-heroTitle {
  margin-top: 8px;
  font-size: 34px;
  font-weight: 700;
  line-height: 1.05;
}

.hseq-heroText {
  max-width: 760px;
  margin-top: 10px;
  font-size: 14px;
  line-height: 1.65;
  color: #eaf5fb;
}

.hseq-toolbar {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 18px;
  padding: 16px 18px;
  border: 1px solid rgba(209, 218, 230, 0.9);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.88);
  box-shadow: 0 12px 28px rgba(17, 24, 39, 0.05);
}

.hseq-toolbarLeft {
  flex: 1 1 320px;
  min-width: 0;
}

.hseq-toolbarRight {
  display: flex;
  flex: 1 1 420px;
  justify-content: flex-end;
  min-width: 0;
}

.hseq-commandStack {
  width: 100%;
  justify-content: flex-end;
}

.hseq-searchBox {
  width: 100%;
  min-width: 0;
}

.hseq-searchBox .ms-SearchBox {
  border-radius: 20px;
  border: 1px solid #d5deea;
  min-height: 54px;
  box-shadow: none;
}

.hseq-searchBox .ms-SearchBox-field {
  font-size: 15px;
}

.hseq-actionButton {
  min-width: 140px;
  height: 48px;
  border-radius: 16px;
  border: 1px solid #d1dae4;
  background: #fff;
}

.hseq-actionButton .ms-Button-flexContainer {
  gap: 8px;
}

.hseq-actionButton .ms-Button-label {
  font-size: 14px;
  font-weight: 600;
}

.hseq-actionButtonPrimary {
  border-color: #216a99;
  background: linear-gradient(135deg, #216a99 0%, #2f87b7 100%);
}

.hseq-actionButtonPrimary .ms-Button-label,
.hseq-actionButtonPrimary .ms-Button-icon {
  color: #fff;
}

.hseq-messageWrap {
  margin-top: 14px;
}

.hseq-contentPanel {
  margin-top: 18px;
  border: 1px solid rgba(209, 218, 230, 0.96);
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 16px 34px rgba(17, 24, 39, 0.05);
  overflow: hidden;
  min-width: 0;
}

.hseq-panelHeader {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  padding: 22px 24px 16px;
  border-bottom: 1px solid #e8edf3;
  flex-wrap: wrap;
}

.hseq-panelTitle {
  font-size: 24px;
  font-weight: 700;
  color: #253446;
}

.hseq-panelSubtitle {
  margin-top: 6px;
  font-size: 13px;
  line-height: 1.55;
  color: #708091;
}

.hseq-panelBadge {
  padding: 8px 12px;
  border-radius: 999px;
  background: #edf7fc;
  color: #216a99;
  font-size: 12px;
  font-weight: 700;
}

.hseq-tableWrap {
  overflow: auto;
}

.hseq-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 820px;
}

.hseq-table th,
.hseq-table td {
  padding: 14px 16px;
  border-bottom: 1px solid #edf2f6;
  font-size: 13px;
  text-align: left;
  vertical-align: middle;
}

.hseq-table th {
  background: #fbfcfd;
  color: #546374;
  font-weight: 700;
}

.hseq-table tbody tr {
  cursor: pointer;
  transition: background 0.15s ease;
}

.hseq-table tbody tr:hover {
  background: #f7fbfe;
}

.hseq-table tbody tr:focus {
  outline: 2px solid #2e84b8;
  outline-offset: -2px;
}

.hseq-sortable {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border: 0;
  background: transparent;
  color: inherit;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  gap: 8px;
}

.hseq-filterInput {
  width: 100%;
  padding: 9px 10px;
  border: 1px solid #d8e0e8;
  border-radius: 12px;
  background: #fff;
  font-size: 12px;
  min-width: 0;
}

.hseq-selectedRow {
  background: linear-gradient(90deg, #edf7fd 0%, #f5fbff 100%);
}

.hseq-typePill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 108px;
  padding: 7px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
}

.hseq-typeResidential {
  background: #daf0d0;
  color: #2e7222;
}

.hseq-typeCommercial {
  background: #ddeafe;
  color: #2f64b8;
}

.hseq-typeDefault {
  background: #ecf0f4;
  color: #5b6979;
}

.hseq-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 16px 20px;
  flex-wrap: wrap;
}

.hseq-footerInfo {
  font-size: 12px;
  color: #718091;
}

.hseq-footerControls {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.hseq-pageButton {
  border-radius: 12px;
}

.hseq-formScreen {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(320px, 0.8fr);
  gap: 18px;
  min-width: 0;
}

.hseq-formMain,
.hseq-formSide {
  display: flex;
  flex-direction: column;
  gap: 18px;
  min-width: 0;
}

.hseq-card {
  border: 1px solid rgba(209, 218, 230, 0.96);
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 16px 34px rgba(17, 24, 39, 0.05);
  overflow: hidden;
  min-width: 0;
}

.hseq-cardHeader {
  padding: 18px 20px;
  border-bottom: 1px solid #e8edf3;
}

.hseq-cardTitle {
  font-size: 18px;
  font-weight: 700;
  color: #253446;
}

.hseq-cardText {
  margin-top: 6px;
  font-size: 13px;
  line-height: 1.55;
  color: #708091;
}

.hseq-formGrid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
  padding: 20px;
}

.hseq-formLabel {
  align-self: center;
  font-size: 13px;
  font-weight: 600;
  color: #5e6d7e;
}

.hseq-formField {
  min-width: 0;
}

.hseq-formFieldWide {
  grid-column: 1 / -1;
}

.hseq-formField .ms-Label {
  margin-bottom: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #526274;
}

.hseq-formField .ms-TextField-fieldGroup,
.hseq-formField .ms-Dropdown-title {
  min-height: 50px;
  border-radius: 18px;
  border: 1px solid #d4dde7;
  background: #fff;
}

.hseq-formField .ms-Dropdown-title {
  display: flex;
  align-items: center;
}

.hseq-formField .ms-TextField-field {
  font-size: 15px;
}

.hseq-formField textarea.ms-TextField-field {
  min-height: 120px;
  padding-top: 12px;
  padding-bottom: 12px;
}

.hseq-input,
.hseq-textarea,
.hseq-select {
  width: 100%;
  min-width: 0;
}

.hseq-timeline {
  padding: 18px 20px;
}

.hseq-timelineItem {
  display: flex;
  gap: 10px;
  margin-bottom: 14px;
}

.hseq-timelineDot {
  width: 10px;
  height: 10px;
  margin-top: 5px;
  border-radius: 50%;
  background: #2a7aaa;
  flex: 0 0 auto;
}

.hseq-timelineContent {
  font-size: 13px;
  line-height: 1.55;
  color: #5f6f80;
}

.hseq-helperList {
  padding: 6px 20px 18px;
}

.hseq-helperRow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 10px 0;
  border-bottom: 1px solid #edf2f6;
  font-size: 13px;
  color: #5f6f80;
  flex-wrap: wrap;
}

.hseq-helperRow:last-child {
  border-bottom: 0;
}

.hseq-emptyState {
  padding: 44px 18px;
  text-align: center;
  font-size: 14px;
  color: #728191;
}

@media (max-width: 1360px) {
  .hseq-formScreen {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 1180px) {
  .hseq-body {
    grid-template-columns: 92px minmax(0, 1fr);
  }

  .hseq-modulePill,
  .hseq-navLabel,
  .hseq-sidebarTitle {
    display: none;
  }

  .hseq-toolbarRight {
    flex-basis: 100%;
    justify-content: stretch;
  }

  .hseq-commandStack {
    justify-content: stretch;
  }
}

@media (max-width: 960px) {
  .hseq-header {
    padding: 12px 14px;
  }

  .hseq-headerMeta:last-child {
    display: none;
  }

  .hseq-formGrid {
    grid-template-columns: 1fr;
  }

  .hseq-formFieldWide {
    grid-column: auto;
  }
}

@media (max-width: 760px) {
  .hseq-content {
    padding: 14px;
  }

  .hseq-hero {
    padding: 20px;
  }

  .hseq-heroTitle {
    font-size: 28px;
  }

  .hseq-toolbar,
  .hseq-panelHeader,
  .hseq-footer,
  .hseq-cardHeader,
  .hseq-formGrid {
    padding-left: 16px;
    padding-right: 16px;
  }

  .hseq-toolbar,
  .hseq-footer {
    flex-direction: column;
    align-items: stretch;
  }

  .hseq-toolbarLeft,
  .hseq-toolbarRight,
  .hseq-commandStack {
    width: 100%;
  }

  .hseq-actionButton {
    min-width: 0;
    width: 100%;
  }

  .hseq-table {
    min-width: 680px;
  }
}

@media (max-width: 560px) {
  .hseq-body {
    grid-template-columns: 1fr;
  }

  .hseq-sidebar {
    border-right: 0;
    border-bottom: 1px solid rgba(132, 146, 166, 0.24);
  }

  .hseq-sidebarCollapsed {
    grid-template-columns: 1fr;
  }

  .hseq-sidebarCollapsed .hseq-navList {
    display: none;
  }

  .hseq-sidebarCollapsed .hseq-modulePill,
  .hseq-sidebarCollapsed .hseq-sidebarTitle {
    display: none;
  }
}
`;
