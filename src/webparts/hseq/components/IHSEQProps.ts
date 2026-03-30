import type { IWebPartContext } from '@microsoft/sp-webpart-base';

export interface IHSEQProps {
  context: IWebPartContext;
  description?: string;
  isDarkTheme: boolean;
}
