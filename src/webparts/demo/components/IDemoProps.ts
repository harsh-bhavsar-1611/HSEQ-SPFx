import type { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IDemoProps {
  context: WebPartContext;
  description: string;
  listName: string;
  siteUrl: string;
  isDarkTheme: boolean;
}
