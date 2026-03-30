import * as React from 'react';
import {
  DefaultButton,
  Dropdown,
  Icon,
  MessageBar,
  MessageBarType,
  PrimaryButton,
  SearchBox,
  Spinner,
  SpinnerSize,
  Stack,
  TextField,
  type IDropdownOption
} from '@fluentui/react';

import type { IDemoProps } from './IDemoProps';
import { APP_CSS } from './appCss';
import { EMPTY_PROJECT_FORM, HSEQ_NAV_ITEMS, LIST_COLUMNS } from './constants';
import type { IProjectFormData, IProjectItem, IProjectsLoadResult } from './models';
import ProjectsService from './ProjectsService';
import { styles } from './styleNames';
import {
  type SortDirection,
  buildPrintMarkup,
  buildPrintStyles,
  compareValues,
  downloadFile,
  formatFileStamp,
  sanitizeCsvValue,
  toErrorMessage
} from './utils';

type AppView = 'list' | 'form';

const Demo: React.FC<IDemoProps> = (props) => {
  const serviceRef = React.useRef<ProjectsService | undefined>(undefined);

  const [loadResult, setLoadResult] = React.useState<IProjectsLoadResult | undefined>(undefined);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [saving, setSaving] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>('');
  const [successMessage, setSuccessMessage] = React.useState<string>('');
  const [activeView, setActiveView] = React.useState<AppView>('list');
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState<boolean>(false);
  const [sortColumn, setSortColumn] = React.useState<keyof IProjectItem>('projectName');
  const [sortDirection, setSortDirection] = React.useState<SortDirection>('asc');
  const [globalSearch, setGlobalSearch] = React.useState<string>('');
  const [columnFilters, setColumnFilters] = React.useState<Record<string, string>>({});
  const [page, setPage] = React.useState<number>(1);
  const [selectedId, setSelectedId] = React.useState<number | undefined>(undefined);
  const [formData, setFormData] = React.useState<IProjectFormData>(EMPTY_PROJECT_FORM);

  React.useEffect(() => {
    serviceRef.current = new ProjectsService(props.context, props.siteUrl, props.listName);
    loadData().catch(() => undefined);
  }, [props.context, props.listName, props.siteUrl]);

  React.useEffect(() => {
    setPage(1);
  }, [columnFilters, globalSearch, sortColumn, sortDirection]);

  const items = loadResult?.items ?? [];
  const projectTypeChoices = loadResult?.projectTypeChoices ?? ['Commarcial', 'Residental'];
  const projectTypeOptions = React.useMemo<IDropdownOption[]>(
    () => projectTypeChoices.map((choice) => ({ key: choice, text: choice })),
    [projectTypeChoices]
  );

  const filteredItems = React.useMemo(() => {
    const nextItems = items.filter((item) => LIST_COLUMNS.every((column) => {
      const filterValue = (columnFilters[column.key] || '').trim().toLowerCase();
      if (!filterValue) {
        return true;
      }

      return String(item[column.key] || '').toLowerCase().indexOf(filterValue) > -1;
    })).filter((item) => {
      const searchValue = globalSearch.trim().toLowerCase();
      if (!searchValue) {
        return true;
      }

      return LIST_COLUMNS.some((column) => String(item[column.key] || '').toLowerCase().indexOf(searchValue) > -1);
    });

    nextItems.sort((leftItem, rightItem) =>
      compareValues(String(leftItem[sortColumn] || ''), String(rightItem[sortColumn] || ''), sortDirection)
    );

    return nextItems;
  }, [columnFilters, items, sortColumn, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / 25));
  const currentPage = Math.min(page, totalPages);
  const pagedItems = filteredItems.slice((currentPage - 1) * 25, currentPage * 25);
  const selectedItem = items.find((item) => item.id === selectedId);

  async function loadData(): Promise<void> {
    setLoading(true);
    setErrorMessage('');

    try {
      const result = await serviceRef.current!.load();
      setLoadResult(result);

      if (result.items.length > 0) {
        const nextSelected = selectedId
          ? result.items.find((item) => item.id === selectedId) ?? result.items[0]
          : result.items[0];

        setSelectedId(nextSelected.id);
        if (activeView === 'form') {
          setFormData(toFormData(nextSelected));
        }
      } else {
        setSelectedId(undefined);
      }
    } catch (error) {
      setErrorMessage(toErrorMessage(error, props.listName, props.siteUrl));
    } finally {
      setLoading(false);
    }
  }

  function handleSelectRecord(item: IProjectItem): void {
    setSelectedId(item.id);
    setFormData(toFormData(item));
    setActiveView('form');
    setSuccessMessage('');
  }

  function handleNew(): void {
    setSelectedId(undefined);
    setFormData(EMPTY_PROJECT_FORM);
    setActiveView('form');
    setSuccessMessage('');
  }

  async function handleSave(): Promise<void> {
    if (!formData.projectName.trim()) {
      setErrorMessage('Project Name is required.');
      return;
    }

    if (!formData.projectType.trim()) {
      setErrorMessage('Project Type is required.');
      return;
    }

    if (!formData.location.trim()) {
      setErrorMessage('Location is required.');
      return;
    }

    if (!formData.estimatedEndDate.trim()) {
      setErrorMessage('Estimated End Date is required.');
      return;
    }

    setSaving(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const savedItem = await serviceRef.current!.save(formData);
      setSelectedId(savedItem.id);
      setFormData(toFormData(savedItem));
      setSuccessMessage(formData.id ? 'Project updated successfully.' : 'Project created successfully.');
      await loadData();
      setActiveView('list');
    } catch (error) {
      setErrorMessage(toErrorMessage(error, props.listName, props.siteUrl));
    } finally {
      setSaving(false);
    }
  }

  function handleExport(): void {
    const headers = LIST_COLUMNS.map((column) => column.label);
    const rows = filteredItems.map((item) =>
      LIST_COLUMNS.map((column) => sanitizeCsvValue(String(item[column.key] || ''))).join(',')
    );
    const csv = `\uFEFF${headers.join(',')}\n${rows.join('\n')}`;
    downloadFile(`${props.listName.toLowerCase()}-${formatFileStamp(new Date())}.csv`, csv, 'text/csv;charset=utf-8;');
  }

  function handlePrint(): void {
    const printWindow = window.open('', '_blank', 'width=1200,height=900');
    if (!printWindow) {
      return;
    }

    printWindow.document.write(`<!DOCTYPE html><html><head><title>${props.listName} Print</title>${buildPrintStyles()}</head><body>${buildPrintMarkup(filteredItems, selectedItem)}</body></html>`);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  }

  function handleToggleSort(columnKey: keyof IProjectItem): void {
    if (sortColumn === columnKey) {
      setSortDirection((current) => current === 'asc' ? 'desc' : 'asc');
      return;
    }

    setSortColumn(columnKey);
    setSortDirection('asc');
  }

  function updateFilter(columnKey: keyof IProjectItem, value: string): void {
    setColumnFilters((current) => ({
      ...current,
      [columnKey]: value
    }));
  }

  function updateForm(field: keyof IProjectFormData, value: string): void {
    setFormData((current) => ({
      ...current,
      [field]: value
    }));
  }

  function handleOpenFromKeyboard(event: React.KeyboardEvent<HTMLTableRowElement>, item: IProjectItem): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleSelectRecord(item);
    }
  }

  return (
    <div className={styles.shell}>
      <style>{APP_CSS}</style>

      <header className={styles.header}>
        <div className={styles.brandWrap}>
          <div className={styles.brandMark}>HQ</div>
          <div>
            <div className={styles.brandText}>HSEQ Projects</div>
            <div className={styles.headerMeta}>SharePoint-backed module for Skyline Builders</div>
          </div>
        </div>
        <div className={styles.headerMeta}>{props.siteUrl}</div>
      </header>

      <div className={`${styles.body} ${sidebarCollapsed ? styles.sidebarCollapsed : ''}`}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarTop}>
            <button type="button" className={styles.hamburger} onClick={() => setSidebarCollapsed((current) => !current)}>
              <Icon iconName="GlobalNavButton" />
            </button>
            {!sidebarCollapsed && <div className={styles.sidebarTitle}>HSEQ Module</div>}
            {!sidebarCollapsed && <div className={styles.modulePill}>Local + Live Data</div>}
          </div>

          <nav className={styles.navList}>
            {HSEQ_NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                type="button"
                className={`${styles.navItem} ${item.label === 'Projects' ? styles.navItemActive : ''}`}
              >
                <Icon iconName={item.iconName} className={styles.navIcon} />
                {!sidebarCollapsed && <span className={styles.navLabel}>{item.label}</span>}
              </button>
            ))}
          </nav>
        </aside>

        <main className={styles.content}>
          <section className={styles.hero}>
            <div className={styles.heroEyebrow}>HSEQ</div>
            <div className={styles.heroTitle}>Projects Register</div>
            <div className={styles.heroText}>
              A smoother HSEQ workflow for your custom SharePoint <strong>{props.listName}</strong> list. Use the grid to browse records, open any project in its own screen, or create a new project with the form.
            </div>
          </section>

          <section className={styles.toolbar}>
            <div className={styles.toolbarLeft}>
              <SearchBox
                className={styles.searchBox}
                placeholder="Search by project name, type, location, or date"
                value={globalSearch}
                onChange={(_, value) => setGlobalSearch(value || '')}
              />
            </div>
            <div className={styles.toolbarRight}>
              <Stack horizontal wrap tokens={{ childrenGap: 10 }} className={styles.commandStack}>
                <PrimaryButton
                  className={`${styles.actionButton} ${styles.actionButtonPrimary}`}
                  iconProps={{ iconName: 'Add' }}
                  text="New"
                  onClick={handleNew}
                />
                <DefaultButton
                  className={styles.actionButton}
                  iconProps={{ iconName: 'Refresh' }}
                  text="Refresh"
                  onClick={() => loadData().catch(() => undefined)}
                />
                <DefaultButton
                  className={styles.actionButton}
                  iconProps={{ iconName: 'ExcelDocument' }}
                  text="Export CSV"
                  onClick={handleExport}
                />
                <DefaultButton
                  className={styles.actionButton}
                  iconProps={{ iconName: 'Print' }}
                  text="Print"
                  onClick={handlePrint}
                />
              </Stack>
            </div>
          </section>

          <div className={styles.messageWrap}>
            {errorMessage && (
              <MessageBar messageBarType={MessageBarType.error} onDismiss={() => setErrorMessage('')}>
                {errorMessage}
              </MessageBar>
            )}
            {successMessage && (
              <MessageBar messageBarType={MessageBarType.success} onDismiss={() => setSuccessMessage('')}>
                {successMessage}
              </MessageBar>
            )}
          </div>

          {loading || saving ? (
            <Spinner size={SpinnerSize.large} label={saving ? 'Saving project...' : 'Loading projects...'} />
          ) : activeView === 'list' ? (
            <section className={styles.contentPanel}>
              <div className={styles.panelHeader}>
                <div>
                  <div className={styles.panelTitle}>Grid View</div>
                  <div className={styles.panelSubtitle}>Browse live records from your SharePoint `Projects` list and open any record in its own screen.</div>
                </div>
                <div className={styles.panelBadge}>{filteredItems.length} Records</div>
              </div>

              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <colgroup>
                    {LIST_COLUMNS.map((column) => (
                      <col key={`${column.key}-width`} style={{ width: column.width }} />
                    ))}
                  </colgroup>
                  <thead>
                    <tr>
                      {LIST_COLUMNS.map((column) => (
                        <th key={column.key}>
                          <button type="button" className={styles.sortable} onClick={() => handleToggleSort(column.key)}>
                            <span>{column.label}</span>
                            <Icon iconName={sortColumn === column.key ? (sortDirection === 'asc' ? 'ChevronUpSmall' : 'ChevronDownSmall') : 'Sort'} />
                          </button>
                        </th>
                      ))}
                    </tr>
                    <tr>
                      {LIST_COLUMNS.map((column) => (
                        <th key={`${column.key}-filter`}>
                          {column.filterable ? (
                            <input
                              className={styles.filterInput}
                              type="text"
                              placeholder="Filter..."
                              value={columnFilters[column.key] || ''}
                              onChange={(event) => updateFilter(column.key, event.currentTarget.value)}
                            />
                          ) : null}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {pagedItems.map((item) => (
                      <tr
                        key={item.id}
                        className={selectedId === item.id ? styles.selectedRow : ''}
                        onClick={() => handleSelectRecord(item)}
                        onKeyDown={(event) => handleOpenFromKeyboard(event, item)}
                        tabIndex={0}
                      >
                        <td>{item.projectName}</td>
                        <td>
                          <span className={`${styles.typePill} ${resolveTypeClass(item.projectType)}`}>
                            {item.projectType || '-'}
                          </span>
                        </td>
                        <td>{item.location || '-'}</td>
                        <td>{item.startDate || '-'}</td>
                        <td>{item.estimatedEndDate || '-'}</td>
                      </tr>
                    ))}
                    {pagedItems.length === 0 && (
                      <tr>
                        <td colSpan={LIST_COLUMNS.length} className={styles.emptyState}>
                          No records matched your current filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className={styles.footer}>
                <div className={styles.footerInfo}>
                  Page {currentPage} of {totalPages} | Selected: {selectedItem?.projectName || 'None'}
                </div>
                <div className={styles.footerControls}>
                  <DefaultButton
                    className={styles.pageButton}
                    disabled={currentPage === 1}
                    text="Previous"
                    onClick={() => setPage((value) => Math.max(1, value - 1))}
                  />
                  <DefaultButton
                    className={styles.pageButton}
                    disabled={currentPage === totalPages}
                    text="Next"
                    onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
                  />
                </div>
              </div>
            </section>
          ) : (
            <section className={styles.formScreen}>
              <div className={styles.formMain}>
                <article className={styles.card}>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardTitle}>{formData.id ? 'Edit Project' : 'New Project'}</div>
                    <div className={styles.cardText}>This form writes directly to the SharePoint `Projects` list when you click Save.</div>
                  </div>

                  <div className={styles.formGrid}>
                    <TextField
                      className={styles.formField}
                      label="Project Name"
                      placeholder="Enter project name"
                      value={formData.projectName}
                      onChange={(_, value) => updateForm('projectName', value || '')}
                    />

                    <Dropdown
                      className={styles.formField}
                      label="Project Type"
                      placeholder="Select project type"
                      options={projectTypeOptions}
                      selectedKey={formData.projectType || undefined}
                      onChange={(_, option) => updateForm('projectType', String(option?.key || ''))}
                    />

                    <TextField
                      className={`${styles.formField} ${styles.formFieldWide}`}
                      label="Location"
                      placeholder="Enter location"
                      multiline
                      autoAdjustHeight
                      value={formData.location}
                      onChange={(_, value) => updateForm('location', value || '')}
                    />

                    <TextField
                      className={styles.formField}
                      label="Start Date"
                      type="date"
                      value={formData.startDate}
                      onChange={(_, value) => updateForm('startDate', value || '')}
                    />

                    <TextField
                      className={styles.formField}
                      label="Estimated End Date"
                      type="date"
                      value={formData.estimatedEndDate}
                      onChange={(_, value) => updateForm('estimatedEndDate', value || '')}
                    />
                  </div>
                </article>
              </div>

              <div className={styles.formSide}>
                <article className={styles.card}>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardTitle}>Record Actions</div>
                    <div className={styles.cardText}>Open a record from the grid or create a new one here.</div>
                  </div>

                  <div className={styles.formGrid}>
                    <Stack horizontal wrap tokens={{ childrenGap: 10 }} className={styles.commandStack}>
                      <PrimaryButton
                        className={`${styles.actionButton} ${styles.actionButtonPrimary}`}
                        iconProps={{ iconName: 'Save' }}
                        text="Save"
                        onClick={() => { handleSave().catch(() => undefined); }}
                      />
                      <DefaultButton
                        className={styles.actionButton}
                        iconProps={{ iconName: 'Add' }}
                        text="New"
                        onClick={handleNew}
                      />
                      <DefaultButton
                        className={styles.actionButton}
                        iconProps={{ iconName: 'NavigateBack' }}
                        text="Back to Grid"
                        onClick={() => setActiveView('list')}
                      />
                    </Stack>
                  </div>
                </article>

                <article className={styles.card}>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardTitle}>Timeline</div>
                    <div className={styles.cardText}>Simple status notes for the current screen.</div>
                  </div>
                  <div className={styles.timeline}>
                    <div className={styles.timelineItem}>
                      <div className={styles.timelineDot} />
                      <div className={styles.timelineContent}>Grid row click opens the selected project in this separate screen.</div>
                    </div>
                    <div className={styles.timelineItem}>
                      <div className={styles.timelineDot} />
                      <div className={styles.timelineContent}>`New` opens a blank form for creating a new SharePoint record.</div>
                    </div>
                    <div className={styles.timelineItem}>
                      <div className={styles.timelineDot} />
                      <div className={styles.timelineContent}>`Save` creates or updates the project in the live `Projects` list.</div>
                    </div>
                  </div>
                </article>

                <article className={styles.card}>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardTitle}>Schema</div>
                    <div className={styles.cardText}>Locked to your provided SharePoint columns.</div>
                  </div>
                  <div className={styles.helperList}>
                    {renderHelperRow('Project Name', 'ProjectName')}
                    {renderHelperRow('Project Type', 'ProjectType')}
                    {renderHelperRow('Location', 'Location')}
                    {renderHelperRow('Start Date', 'StartDate')}
                    {renderHelperRow('Estimated End Date', 'EstimatedEndDate')}
                  </div>
                </article>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

function toFormData(item: IProjectItem): IProjectFormData {
  return {
    id: item.id,
    projectName: item.projectName,
    projectType: item.projectType,
    location: item.location,
    startDate: toDateInput(item.startDateValue),
    estimatedEndDate: toDateInput(item.estimatedEndDateValue)
  };
}

function toDateInput(rawValue: string | undefined): string {
  if (!rawValue) {
    return '';
  }

  const parsedDate = new Date(rawValue);
  if (Number.isNaN(parsedDate.getTime())) {
    return '';
  }

  return parsedDate.toISOString().slice(0, 10);
}

function resolveTypeClass(projectType: string): string {
  const normalized = projectType.toLowerCase();
  if (normalized.indexOf('resident') > -1) {
    return styles.typeResidential;
  }
  if (normalized.indexOf('commarcial') > -1 || normalized.indexOf('commercial') > -1) {
    return styles.typeCommercial;
  }
  return styles.typeDefault;
}

function renderHelperRow(label: string, value: string): JSX.Element {
  return (
    <div className={styles.helperRow}>
      <strong>{label}</strong>
      <span>{value}</span>
    </div>
  );
}

export default Demo;
