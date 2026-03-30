import type { IProjectFormData, IProjectItem } from './models';

export interface IHseqNavItem {
  label: string;
  iconName: string;
}

export interface IListColumn {
  key: keyof IProjectItem;
  label: string;
  width: string;
  filterable: boolean;
}

export const LIST_COLUMNS: IListColumn[] = [
  { key: 'projectName', label: 'Project Name', width: '28%', filterable: true },
  { key: 'projectType', label: 'Project Type', width: '18%', filterable: true },
  { key: 'location', label: 'Location', width: '24%', filterable: true },
  { key: 'startDate', label: 'Start Date', width: '15%', filterable: true },
  { key: 'estimatedEndDate', label: 'Estimated End Date', width: '15%', filterable: true }
];

export const HSEQ_NAV_ITEMS: IHseqNavItem[] = [
  { label: 'Projects', iconName: 'TaskList' },
  { label: 'Compliance Register', iconName: 'PageChecklist' },
  { label: 'Training & Inductions', iconName: 'ReadingMode' },
  { label: 'Audit & Inspections', iconName: 'ClipboardList' },
  { label: 'Incidents', iconName: 'Warning' },
  { label: 'Permits', iconName: 'Permissions' },
  { label: 'Toolbox Meetings', iconName: 'People' },
  { label: 'Alerts & Notices', iconName: 'Ringer' },
  { label: 'SWMS Register', iconName: 'BulletedList' },
  { label: 'Activity & Task Register', iconName: 'TaskManager' },
  { label: 'ITP Register', iconName: 'FileCode' },
  { label: 'Change Register', iconName: 'SwitcherStartEnd' },
  { label: 'Reports', iconName: 'ReportDocument' }
];

export const EMPTY_PROJECT_FORM: IProjectFormData = {
  projectName: '',
  projectType: '',
  location: '',
  startDate: '',
  estimatedEndDate: ''
};
