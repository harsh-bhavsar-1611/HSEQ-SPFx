import * as React from 'react';
import {
  Stack,
  Text,
  CommandBar,
  ICommandBarItemProps,
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
  IconButton
} from '@fluentui/react';
import type { IHseqRecord, IHseqNavItem } from './models';
import { LIST_COLUMNS } from './constants';

interface IHSEQMainListProps {
  records: IHseqRecord[];
  selectedModule: IHseqNavItem | undefined;
  onAddNew: () => void;
  onEdit: (record: IHseqRecord) => void;
  onDelete: (id: number) => void;
  onExportCsv: () => void;
  onExportExcel: () => void;
  onPrint: () => void;
}

export const HSEQMainList: React.FC<IHSEQMainListProps> = ({
  records,
  selectedModule,
  onAddNew,
  onEdit,
  onDelete,
  onExportCsv,
  onExportExcel,
  onPrint
}) => {
  const commandItems: ICommandBarItemProps[] = [
    {
      key: 'addNew',
      text: 'Add New',
      iconProps: { iconName: 'Add' },
      onClick: onAddNew
    },
    {
      key: 'export',
      text: 'Export',
      iconProps: { iconName: 'Download' },
      subMenuProps: {
        items: [
          { key: 'exportCsv', text: 'CSV', iconProps: { iconName: 'FileCSV' }, onClick: onExportCsv },
          { key: 'exportExcel', text: 'Excel', iconProps: { iconName: 'ExcelDocument' }, onClick: onExportExcel }
        ]
      }
    },
    { key: 'print', text: 'Print', iconProps: { iconName: 'Print' }, onClick: onPrint }
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
          <IconButton iconProps={{ iconName: 'Edit' }} onClick={() => onEdit(item)} />
          <IconButton iconProps={{ iconName: 'Delete' }} onClick={() => onDelete(item.id)} />
        </Stack>
      )
    }
  ];

  return (
    <main className="mainContent">
      <Stack tokens={{ childrenGap: 16 }} className="pageSection">
        <div>
          <Text variant="large" block style={{ fontWeight: 500 }}>{selectedModule?.label}</Text>
          <Text variant="small" block style={{ color: '#666', marginTop: '4px' }}>
            Manage {selectedModule?.label} records
          </Text>
        </div>
        <div className="commandBar">
          <CommandBar items={commandItems} />
        </div>
        {records.length > 0 ? (
          <div className="detailsListWrap">
            <DetailsList
              items={records}
              columns={actionColumns}
              layoutMode={DetailsListLayoutMode.fixedColumns}
              selectionMode={SelectionMode.none}
              compact
            />
          </div>
        ) : (
          <Stack horizontalAlign="center" verticalAlign="center" styles={{ root: { minHeight: '300px' } }}>
            <Text>No records yet. Click &quot;Add New&quot; to create one.</Text>
          </Stack>
        )}
      </Stack>
    </main>
  );
};
