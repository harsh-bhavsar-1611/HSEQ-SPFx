import type { IHseqNavItem, IHseqRecord } from './models';

export const HSEQ_NAV_ITEMS: IHseqNavItem[] = [
  { label: 'To Do', iconName: 'TaskList' },
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

export const STATUS_OPTIONS = ['In Progress', 'Complete', 'Overdue', 'Pending'];
export const PRIORITY_OPTIONS = ['Low', 'Medium', 'High', 'Critical'];
export const CATEGORY_OPTIONS = ['SAM - Essential', 'Managers/Support', 'Major Projects', 'SMR - Reporting'];
export const CLASSIFICATION_OPTIONS = ['Improvement Opportunity', 'Compliant', 'Non-Compliant'];
export const REGARDING_OPTIONS = ['Metering', 'Supply Workforce', 'Workplace Documentation', 'Electrical Services'];

export const LIST_COLUMNS = [
  { key: 'id', name: 'ID', fieldName: 'id', minWidth: 50, maxWidth: 70 },
  { key: 'subject', name: 'Subject', fieldName: 'subject', minWidth: 150, maxWidth: 250 },
  { key: 'status', name: 'Status', fieldName: 'status', minWidth: 80, maxWidth: 120 },
  { key: 'regarding', name: 'Regarding', fieldName: 'regarding', minWidth: 100, maxWidth: 150 },
  { key: 'category', name: 'Category', fieldName: 'category', minWidth: 120, maxWidth: 150 },
  { key: 'classification', name: 'Classification', fieldName: 'classification', minWidth: 120, maxWidth: 150 },
  { key: 'dueDate', name: 'Due Date', fieldName: 'dueDate', minWidth: 100, maxWidth: 130 },
  { key: 'priority', name: 'Priority', fieldName: 'priority', minWidth: 80, maxWidth: 100 },
  { key: 'taskOwner', name: 'Assigned (Internal)', fieldName: 'taskOwner', minWidth: 120, maxWidth: 150 }
];

export const EMPTY_RECORD: IHseqRecord = {
  id: 0,
  subject: '',
  description: '',
  regarding: '',
  category: '',
  classification: '',
  taskOwner: '',
  assigneeExternal: '',
  priority: 'Medium',
  status: 'In Progress',
  dueDate: '',
  emailNotification: false,
  businessProfile: '',
  startDate: '',
  completionDate: '',
  percentCompleted: 0,
  actualDuration: '',
  createdOn: new Date().toLocaleDateString(),
  createdBy: 'Current User',
  updatedOn: new Date().toLocaleDateString(),
  updatedBy: 'Current User',
  resolution: '',
  attachments: [],
  timeline: []
};
