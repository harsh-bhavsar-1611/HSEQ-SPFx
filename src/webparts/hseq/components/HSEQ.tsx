import * as React from 'react';
import {
  Stack,
  IconButton,
  Nav,
  INavLink,
  Text,
  TextField,
  PrimaryButton,
  DefaultButton,
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
  CommandBar,
  ICommandBarItemProps,
  MessageBar,
  MessageBarType,
  Dropdown,
  IDropdownOption,
  Checkbox,
  SpinButton,
  Pivot,
  PivotItem,
  Panel,
  PanelType
} from '@fluentui/react';
import type { IHSEQProps } from './IHSEQProps';
import {
  HSEQ_NAV_ITEMS,
  STATUS_OPTIONS,
  PRIORITY_OPTIONS,
  CATEGORY_OPTIONS,
  CLASSIFICATION_OPTIONS,
  REGARDING_OPTIONS,
  LIST_COLUMNS,
  EMPTY_RECORD
} from './constants';
import type { IHseqRecord } from './models';
import { HSEQ_CSS } from './hseqCss';

type SelectedModule = typeof HSEQ_NAV_ITEMS[number] | undefined;

const HSEQ: React.FC<IHSEQProps> = (props) => {
  const [navCollapsed, setNavCollapsed] = React.useState<boolean>(false);
  const [selectedModule, setSelectedModule] = React.useState<SelectedModule>(HSEQ_NAV_ITEMS[0]);
  const [records, setRecords] = React.useState<IHseqRecord[]>([
    {
      id: 3462,
      subject: 'Alert - Bluecement Defective Metering Isolation Links',
      description: 'Tech update',
      regarding: 'Metering',
      category: 'SAM - Essential',
      classification: 'Improvement Opportunity',
      taskOwner: 'Doug Casanough',
      assigneeExternal: '',
      priority: 'High',
      status: 'Complete',
      dueDate: '4/09/2025',
      emailNotification: false,
      businessProfile: '',
      startDate: '03/09/2025',
      completionDate: '4/09/2025',
      percentCompleted: 100,
      actualDuration: '0:00:00',
      createdOn: '03/09/2025 05:18 PM',
      createdBy: 'Pam Whittaker',
      updatedOn: '07/10/2025 11:40 AM',
      updatedBy: 'Pam Whittaker',
      resolution: '',
      attachments: [],
      timeline: []
    }
  ]);
  const [formData, setFormData] = React.useState<IHseqRecord>(EMPTY_RECORD);
  const [showForm, setShowForm] = React.useState<boolean>(false);
  const [editingId, setEditingId] = React.useState<number | undefined>(undefined);
  const [successMessage, setSuccessMessage] = React.useState<string>('');
  const [activeFormTab, setActiveFormTab] = React.useState<'general' | 'internal'>('general');

  const resetForm = (): void => {
    setFormData(EMPTY_RECORD);
    setEditingId(undefined);
    setActiveFormTab('general');
    setShowForm(false);
  };

  const handleFormChange = (field: keyof IHseqRecord, value: string | number | boolean): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddRecord = (): void => {
    const newRecord: IHseqRecord = {
      ...formData,
      id: Math.max(...records.map((r) => r.id), 0) + 1
    };
    setRecords((prev) => [newRecord, ...prev]);
    setSuccessMessage(`${selectedModule?.label} record added successfully!`);
    resetForm();
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleUpdateRecord = (): void => {
    if (editingId !== undefined) {
      setRecords((prev) =>
        prev.map((record) =>
          record.id === editingId ? { ...formData } : record
        )
      );
      setSuccessMessage(`${selectedModule?.label} record updated successfully!`);
      resetForm();
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleDeleteRecord = (id: number): void => {
    setRecords((prev) => prev.filter((record) => record.id !== id));
  };

  const handleEditRecord = (record: IHseqRecord): void => {
    setFormData(record);
    setEditingId(record.id);
    setActiveFormTab('general');
    setShowForm(true);
  };

  // Export to CSV function
  const handleExportToCSV = (): void => {
    if (records.length === 0) {
      alert('No records to export');
      return;
    }

    const headers = Object.keys(records[0]);
    const csvContent = [
      headers.join(','),
      ...records.map((record) =>
        headers.map((header) => {
          const value = (record as unknown as Record<string, unknown>)[header];
          // Handle array and object fields
          if (Array.isArray(value)) {
            return `"${value.length}"`;
          } else if (typeof value === 'object' && value !== null) {
            return '""';
          }
          // Escape quotes in strings
          return typeof value === 'string' && value.includes(',')
            ? `"${value.replace(/"/g, '""')}"`
            : value;
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${selectedModule?.label || 'HSEQ'}_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export to Excel function
  const handleExportToExcel = (): void => {
    if (records.length === 0) {
      alert('No records to export');
      return;
    }

    const headers = Object.keys(records[0]);
    const xlsxContent = [
      headers.join('\t'),
      ...records.map((record) =>
        headers.map((header) => {
          const value = (record as unknown as Record<string, unknown>)[header];
          if (Array.isArray(value)) {
            return value.length;
          } else if (typeof value === 'object' && value !== null) {
            return '';
          }
          return value || '';
        }).join('\t')
      )
    ].join('\n');

    const blob = new Blob([xlsxContent], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${selectedModule?.label || 'HSEQ'}_${new Date().toISOString().slice(0, 10)}.xls`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Print function
  const handlePrint = (): void => {
    if (records.length === 0) {
      alert('No records to print');
      return;
    }

    const printWindow = window.open('', '', 'height=600,width=800');
    if (!printWindow) {
      alert('Failed to open print window');
      return;
    }

    const tableHTML = `
      <html>
        <head>
          <title>${selectedModule?.label || 'HSEQ'} Records</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { padding: 8px; text-align: left; border: 1px solid #ccc; }
            th { background-color: #f2f2f2; font-weight: bold; }
            tr:nth-child(even) { background-color: #f9f9f9; }
            .print-date { text-align: right; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <h1>${selectedModule?.label || 'HSEQ'} Records Report</h1>
          <table>
            <tr>
              ${Object.keys(records[0]).map((key) => `<th>${key}</th>`).join('')}
            </tr>
            ${records
              .map(
                (record) =>
                  `<tr>${Object.keys(record)
                    .map((key) => {
                      const value = (record as unknown as Record<string, unknown>)[key];
                      if (Array.isArray(value)) {
                        return `<td>${value.length}</td>`;
                      } else if (typeof value === 'object' && value !== null) {
                        return '<td></td>';
                      }
                      return `<td>${value || ''}</td>`;
                    })
                    .join('')}</tr>`
              )
              .join('')}
          </table>
          <div class="print-date">Printed on: ${new Date().toLocaleString()}</div>
        </body>
      </html>
    `;

    printWindow.document.write(tableHTML);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  const statusOptions: IDropdownOption[] = STATUS_OPTIONS.map((s) => ({ key: s, text: s }));
  const priorityOptions: IDropdownOption[] = PRIORITY_OPTIONS.map((p) => ({ key: p, text: p }));
  const categoryOptions: IDropdownOption[] = CATEGORY_OPTIONS.map((c) => ({ key: c, text: c }));
  const classificationOptions: IDropdownOption[] = CLASSIFICATION_OPTIONS.map((c) => ({ key: c, text: c }));
  const regardingOptions: IDropdownOption[] = REGARDING_OPTIONS.map((r) => ({ key: r, text: r }));

  const navItems: INavLink[] = HSEQ_NAV_ITEMS.map((item, index) => ({
    name: item.label,
    url: '',
    iconProps: { iconName: item.iconName },
    key: `nav-${index}`,
    onClick: () => setSelectedModule(item)
  }));

  const commandItems: ICommandBarItemProps[] = [
    {
      key: 'addNew',
      text: 'Add New',
      iconProps: { iconName: 'Add' },
      onClick: () => {
        resetForm();
        setActiveFormTab('general');
        setShowForm(true);
      }
    },
    {
      key: 'export',
      text: 'Export',
      iconProps: { iconName: 'Download' },
      subMenuProps: {
        items: [
          {
            key: 'exportCsv',
            text: 'Export as CSV',
            iconProps: { iconName: 'FileCSV' },
            onClick: handleExportToCSV
          },
          {
            key: 'exportExcel',
            text: 'Export as Excel',
            iconProps: { iconName: 'ExcelDocument' },
            onClick: handleExportToExcel
          }
        ]
      }
    },
    {
      key: 'print',
      text: 'Print',
      iconProps: { iconName: 'Print' },
      onClick: handlePrint
    }
  ];

  const actionColumns = [
    ...LIST_COLUMNS,
    {
      key: 'actions',
      name: 'Actions',
      fieldName: 'actions',
      minWidth: 100,
      maxWidth: 120,
      onRender: (item: IHseqRecord) => (
        <Stack horizontal tokens={{ childrenGap: 4 }}>
          <IconButton
            iconProps={{ iconName: 'Edit' }}
            title="Edit"
            onClick={() => handleEditRecord(item)}
          />
          <IconButton
            iconProps={{ iconName: 'Delete' }}
            title="Delete"
            onClick={() => handleDeleteRecord(item.id)}
          />
        </Stack>
      )
    }
  ];

  return (
    <div className="hseqContainer">
      <style>{HSEQ_CSS}</style>
      {/* Header */}
      <div className="header">
        <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 12 }}>
          <IconButton
            iconProps={{ iconName: navCollapsed ? 'ChevronRight' : 'ChevronLeft' }}
            title="Toggle Sidebar"
            onClick={() => setNavCollapsed(!navCollapsed)}
            styles={{ root: { fontSize: '18px' } }}
          />
          <Text variant="xLarge" block style={{ fontWeight: 600 }}>
            {selectedModule?.label || 'HSEQ Dashboard'}
          </Text>
        </Stack>
      </div>

      <div className="contentWrapper">
        {/* Sidebar Navigation */}
        <nav className={`sidebar ${navCollapsed ? 'collapsed' : ''}`}>
          <div className="navContainer">
            <Nav
              groups={[
                {
                  links: navItems
                }
              ]}
              selectedKey={`nav-${HSEQ_NAV_ITEMS.indexOf(selectedModule || HSEQ_NAV_ITEMS[0])}`}
              styles={{
                root: {
                  width: '100%'
                },
                link: {
                  padding: '8px 12px'
                }
              }}
            />
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="mainContent">
          {successMessage && (
            <MessageBar messageBarType={MessageBarType.success} onDismiss={() => setSuccessMessage('')}>
              {successMessage}
            </MessageBar>
          )}

          <Stack tokens={{ childrenGap: 16 }} styles={{ root: { padding: '16px' } }}>
            {/* Header Info */}
            <div>
              <Text variant="large" block style={{ fontWeight: 500 }}>
                {selectedModule?.label}
              </Text>
              <Text variant="small" block style={{ color: '#666', marginTop: '4px' }}>
                Manage {selectedModule?.label} records
              </Text>
            </div>

            {/* Command Bar */}
            <CommandBar items={commandItems} />

            {/* Records List */}
            {records.length > 0 ? (
              <DetailsList
                items={records}
                columns={actionColumns}
                setKey="set-items"
                layoutMode={DetailsListLayoutMode.fixedColumns}
                selectionMode={SelectionMode.none}
                compact
              />
            ) : (
              <Stack
                horizontalAlign="center"
                verticalAlign="center"
                styles={{ root: { minHeight: '300px' } }}
              >
                <Text>No records yet. Click &quot;Add New&quot; to create one.</Text>
              </Stack>
            )}
          </Stack>

          <Panel
            isOpen={showForm}
            onDismiss={resetForm}
            type={PanelType.custom}
            customWidth="50vw"
            closeButtonAriaLabel="Close"
            isLightDismiss={true}
            headerText={editingId ? 'Edit Task' : 'New Task'}
            className="formPanel"
          >
            <div className="panelContent">
              <Pivot
                selectedKey={activeFormTab}
                className="formTabs"
                onLinkClick={(item) => setActiveFormTab((item?.props.itemKey as 'general' | 'internal') || 'general')}
              >
                <PivotItem headerText="General Information" itemKey="general">
                  <div className="tabBody">
                    <div className="formGrid">
                      <div className="formField formFullWidth">
                        <TextField
                          required
                          label="Subject"
                          value={formData.subject}
                          onChange={(_, newValue) => handleFormChange('subject', newValue || '')}
                        />
                      </div>

                      <div className="formField formFullWidth">
                        <TextField
                          label="Description"
                          multiline
                          rows={3}
                          value={formData.description}
                          onChange={(_, newValue) => handleFormChange('description', newValue || '')}
                        />
                      </div>

                      <div className="formField">
                        <Dropdown
                          label="Regarding"
                          selectedKey={formData.regarding}
                          options={regardingOptions}
                          onChange={(_, option) => handleFormChange('regarding', option?.key || '')}
                        />
                      </div>

                      <div className="formField">
                        <Dropdown
                          label="Category"
                          selectedKey={formData.category}
                          options={categoryOptions}
                          onChange={(_, option) => handleFormChange('category', option?.key || '')}
                        />
                      </div>

                      <div className="formField">
                        <Dropdown
                          label="Classification"
                          selectedKey={formData.classification}
                          options={classificationOptions}
                          onChange={(_, option) => handleFormChange('classification', option?.key || '')}
                        />
                      </div>

                      <div className="formField">
                        <TextField
                          label="Task Owner (External/Text)"
                          value={formData.taskOwner}
                          onChange={(_, newValue) => handleFormChange('taskOwner', newValue || '')}
                        />
                      </div>

                      <div className="formField">
                        <Dropdown
                          label="Priority"
                          selectedKey={formData.priority}
                          options={priorityOptions}
                          onChange={(_, option) => handleFormChange('priority', option?.key || '')}
                        />
                      </div>

                      <div className="formField">
                        <Dropdown
                          label="Status"
                          selectedKey={formData.status}
                          options={statusOptions}
                          onChange={(_, option) => handleFormChange('status', option?.key || '')}
                        />
                      </div>

                      <div className="formField">
                        <TextField
                          label="Due Date"
                          type="date"
                          value={formData.dueDate}
                          onChange={(_, newValue) => handleFormChange('dueDate', newValue || '')}
                        />
                      </div>

                      <div className="formField">
                        <TextField
                          label="SafetyField"
                          value={formData.businessProfile}
                          onChange={(_, newValue) => handleFormChange('businessProfile', newValue || '')}
                        />
                      </div>
                    </div>
                  </div>
                </PivotItem>

                <PivotItem headerText="Internal & Timeline" itemKey="internal">
                  <div className="tabBody">
                    <div className="formGrid">
                      <div className="formField">
                        <TextField
                          label="Start Date"
                          type="date"
                          value={formData.startDate}
                          onChange={(_, newValue) => handleFormChange('startDate', newValue || '')}
                        />
                      </div>

                      <div className="formField">
                        <TextField
                          label="Completion Date"
                          type="date"
                          value={formData.completionDate}
                          onChange={(_, newValue) => handleFormChange('completionDate', newValue || '')}
                        />
                      </div>

                      <div className="formField">
                        <SpinButton
                          label="% Completed"
                          value={formData.percentCompleted.toString()}
                          onValidate={(value) => {
                            const num = parseInt(value, 10);
                            return Number.isNaN(num) ? '0' : num.toString();
                          }}
                          onChange={(_, newValue) => handleFormChange('percentCompleted', parseInt(newValue || '0', 10))}
                          min={0}
                          max={100}
                        />
                      </div>

                      <div className="formField">
                        <TextField
                          label="Actual Duration (HH:mm)"
                          value={formData.actualDuration}
                          onChange={(_, newValue) => handleFormChange('actualDuration', newValue || '')}
                        />
                      </div>

                      <div className="formField formFullWidth">
                        <TextField
                          label="Resolution"
                          multiline
                          rows={4}
                          value={formData.resolution}
                          onChange={(_, newValue) => handleFormChange('resolution', newValue || '')}
                        />
                      </div>

                      <div className="formField formFullWidth">
                        <Checkbox
                          label="Email Notification"
                          checked={formData.emailNotification}
                          onChange={(_, checked) => handleFormChange('emailNotification', checked || false)}
                        />
                      </div>

                      <div className="formField">
                        <TextField label="Created On" disabled value={formData.createdOn} />
                      </div>
                      <div className="formField">
                        <TextField label="Created By" disabled value={formData.createdBy} />
                      </div>
                      <div className="formField">
                        <TextField label="Updated On" disabled value={formData.updatedOn} />
                      </div>
                      <div className="formField">
                        <TextField label="Updated By" disabled value={formData.updatedBy} />
                      </div>

                      <div className="formField formFullWidth">
                        {formData.timeline.length > 0 ? (
                          <Stack tokens={{ childrenGap: 10 }}>
                            {formData.timeline.map((entry) => (
                              <Stack key={entry.id} tokens={{ childrenGap: 2 }}>
                                <Text variant="small" style={{ fontWeight: 600 }}>{entry.action}</Text>
                                <Text variant="small" style={{ color: '#666' }}>
                                  by {entry.changedBy} on {entry.changedOn}
                                </Text>
                                <Text variant="small">{entry.details}</Text>
                              </Stack>
                            ))}
                          </Stack>
                        ) : (
                          <Text variant="small" style={{ color: '#666' }}>No timeline entries yet.</Text>
                        )}
                      </div>
                    </div>
                  </div>
                </PivotItem>
              </Pivot>
            </div>

            <Stack horizontal tokens={{ childrenGap: 8 }} horizontalAlign="start" className="formActions">
              <PrimaryButton
                text={editingId ? 'Update' : 'Save'}
                onClick={editingId ? handleUpdateRecord : handleAddRecord}
              />
              <DefaultButton text="Cancel" onClick={resetForm} />
            </Stack>
          </Panel>
        </main>
      </div>
    </div>
  );
};

export default HSEQ;
