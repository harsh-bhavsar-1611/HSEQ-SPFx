export const HSEQ_CSS = `
.hseqContainer {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background: #fff;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #e1e1e1;
  background: #f3f2f1;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.headerTitle {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.contentWrapper {
  display: flex;
  flex: 1;
  overflow: hidden;
  position: relative;
}

.sidebar {
  flex: 0 0 250px;
  width: 250px;
  border-right: 1px solid #e1e1e1;
  overflow-y: auto;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: #faf9f8;
  white-space: nowrap;
}

.collapsed {
  flex: 0 0 0;
  width: 0;
  border-right: none;
  opacity: 0;
  pointer-events: none;
}

.navContainer {
  padding: 8px 0;
}

.mainContent {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  background: #fff;
  min-width: 0;
}

.sectionHeader {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: #f3f2f1;
  border-top: 1px solid #e1e1e1;
  border-bottom: 1px solid #e1e1e1;
  cursor: pointer;
  user-select: none;
  transition: background 0.2s ease;
}

.commandBar .ms-CommandBar {
  padding: 8px 0;
  background: transparent;
  border-bottom: 1px solid #e1e1e1;
}

.pageSection {
  padding: 16px;
}

.detailsListWrap {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  border: 1px solid #edebe9;
  border-radius: 6px;
  background: #fff;
}

.detailsListWrap .ms-DetailsList {
  min-width: 760px;
}

.mobileOverlay {
  display: none;
}

.formPanel .ms-Panel-main {
  margin-left: auto;
  width: 64vw !important;
  max-width: 1120px;
  min-width: 760px;
  box-shadow: -8px 0 28px rgba(0, 0, 0, 0.18);
}

.formPanel .ms-Panel-header {
  padding: 26px 28px 10px;
}

.formPanel .ms-Panel-headerText {
  font-size: 32px;
  font-weight: 600;
  line-height: 1.1;
  color: #323130;
}

.formPanel .ms-Panel-commands {
  padding-top: 16px;
  padding-right: 18px;
}

.formPanel .ms-Panel-contentInner {
  padding: 0;
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.formPanel .ms-Panel-content {
  padding: 0;
}

.formPanel .ms-Panel-scrollableContent {
  overflow-y: auto;
}

.panelContent {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  background: #fff;
}

.formTabs {
  flex: 1 1 auto;
}

.formTabs .ms-Pivot {
  margin: 0;
  padding: 0 28px;
  border-bottom: 1px solid #edebe9;
  background: #fff;
}

.formTabs .ms-Pivot-link {
  height: 48px;
  padding: 0 14px;
  font-weight: 500;
}

.formTabs .ms-Pivot-text {
  font-size: 14px;
}

.tabBody {
  padding: 28px;
  overflow: visible;
}

.formGrid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px 24px;
  align-items: start;
}

.formField {
  min-width: 0;
}

.formField .ms-Label {
  margin-bottom: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #323130;
}

.formField .ms-TextField-fieldGroup,
.formField .ms-Dropdown-title {
  min-height: 40px;
  border-radius: 2px;
  border: 1px solid #c8c6c4;
  background: #fff;
  box-shadow: none;
}

.formField .ms-TextField-fieldGroup:hover,
.formField .ms-Dropdown-title:hover {
  border-color: #605e5c;
}

.formField .ms-TextField-fieldGroup:focus-within,
.formField .ms-Dropdown-title:focus-within {
  border-color: #03787c;
  box-shadow: 0 0 0 1px #03787c;
}

.formField .ms-TextField-field {
  font-size: 14px;
  color: #323130;
}

.formField textarea.ms-TextField-field {
  min-height: 96px;
  padding-top: 10px;
  padding-bottom: 10px;
  resize: vertical;
}

.formField .ms-Dropdown-title {
  display: flex;
  align-items: center;
  padding-top: 0;
  padding-bottom: 0;
}

.formField .ms-Checkbox {
  padding-top: 4px;
}

.formField .ms-SpinButton {
  max-width: 100%;
}

.formFullWidth {
  grid-column: 1 / -1;
}

.formActions {
  flex: 0 0 auto;
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  padding: 18px 28px 24px;
  border-top: 1px solid #edebe9;
  background: #fff;
  position: sticky;
  bottom: 0;
  z-index: 2;
  box-shadow: 0 -8px 20px rgba(0, 0, 0, 0.06);
}

.formActions .ms-Button {
  min-width: 100px;
}

.formActions .ms-Button--primary {
  background: #03787c;
  border-color: #03787c;
}

.formActions .ms-Button--primary:hover {
  background: #02666a;
  border-color: #02666a;
}

@media (max-width: 1200px) {
  .formPanel .ms-Panel-main {
    width: 72vw !important;
    max-width: 980px;
    min-width: 620px;
  }
}

@media (max-width: 1024px) {
  .formPanel .ms-Panel-main {
    width: 82vw !important;
    max-width: 900px;
    min-width: 0;
  }

  .formGrid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .formFullWidth {
    grid-column: auto;
  }
}

@media (max-width: 768px) {
  .header {
    padding: 10px 12px;
  }

  .headerTitle {
    font-size: 20px;
  }

  .pageSection {
    padding: 12px;
  }

  .sidebar {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    z-index: 100;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
  }

  .mobileSidebar {
    width: min(84vw, 300px);
    left: 0;
    transform: translateX(0);
    transition: transform 0.25s ease;
  }

  .mobileSidebar.collapsed {
    left: 0;
    width: min(84vw, 300px);
    transform: translateX(-100%);
    border-right: 1px solid #e1e1e1;
  }

  .mainContent {
    width: 100%;
  }

  .mobileOverlay {
    display: block;
    position: absolute;
    inset: 0;
    border: 0;
    background: rgba(15, 23, 42, 0.32);
    z-index: 90;
  }

  .commandBar .ms-CommandBar-primaryCommand {
    display: flex;
    flex-wrap: wrap;
    row-gap: 8px;
  }

  .commandBar .ms-CommandBarItem-link {
    min-height: 38px;
  }

  .detailsListWrap {
    margin: 0 -4px;
  }

  .formPanel .ms-Panel-main {
    width: 100vw !important;
    max-width: none;
    min-width: 0;
  }

  .formPanel .ms-Panel-header {
    padding: 18px 18px 8px;
  }

  .formPanel .ms-Panel-headerText {
    font-size: 26px;
  }

  .panelContent {
    height: 100%;
  }

  .formTabs .ms-Pivot {
    padding: 0 18px;
  }

  .tabBody {
    padding: 18px;
  }

  .formActions {
    padding: 16px 18px 20px;
    flex-wrap: wrap;
  }

  .formActions .ms-Button {
    flex: 1 1 140px;
  }
}

@media (max-width: 480px) {
  .headerTitle {
    font-size: 18px;
  }

  .formTabs .ms-Pivot {
    overflow-x: auto;
    white-space: nowrap;
  }

  .formTabs .ms-Pivot-link {
    padding: 0 10px;
  }

  .tabBody {
    padding: 14px;
  }

  .formActions {
    padding: 14px;
  }
}
`;
