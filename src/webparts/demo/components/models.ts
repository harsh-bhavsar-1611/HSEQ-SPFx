export interface IProjectItem {
  id: number;
  projectName: string;
  projectType: string;
  location: string;
  startDate: string;
  estimatedEndDate: string;
  startDateValue?: string;
  estimatedEndDateValue?: string;
}

export interface IProjectFormData {
  id?: number;
  projectName: string;
  projectType: string;
  location: string;
  startDate: string;
  estimatedEndDate: string;
}

export interface IProjectsLoadResult {
  items: IProjectItem[];
  projectTypeChoices: string[];
}
