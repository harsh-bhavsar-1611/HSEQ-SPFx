export interface IHseqNavItem {
  label: string;
  iconName: string;
}

export interface IHseqRecord {
  id: number;
  // General Information
  subject: string;
  description: string;
  regarding: string;
  category: string;
  classification: string;
  taskOwner: string;
  assigneeExternal: string;
  priority: string;
  status: string;
  dueDate: string;
  emailNotification: boolean;
  businessProfile: string;
  
  // Internal
  startDate: string;
  completionDate: string;
  percentCompleted: number;
  actualDuration: string;
  createdOn: string;
  createdBy: string;
  updatedOn: string;
  updatedBy: string;
  
  // Resolution
  resolution: string;
  
  // Attachments
  attachments: IAttachment[];
  
  // Timeline
  timeline: ITimelineEntry[];
}

export interface IAttachment {
  id: number;
  name: string;
  url: string;
  uploadedBy: string;
  uploadedOn: string;
}

export interface ITimelineEntry {
  id: number;
  action: string;
  changedBy: string;
  changedOn: string;
  details: string;
}
