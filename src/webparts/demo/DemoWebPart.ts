import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import type { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'DemoWebPartStrings';
import Demo from './components/Demo';
import type { IDemoProps } from './components/IDemoProps';

export interface IDemoWebPartProps {
  description: string;
  listName: string;
  siteUrl: string;
}

export default class DemoWebPart extends BaseClientSideWebPart<IDemoWebPartProps> {
  private _isDarkTheme: boolean = false;

  protected async onInit(): Promise<void> {
    this.properties.listName = this.properties.listName || 'Projects';
    this.properties.siteUrl = this.properties.siteUrl || this.context.pageContext.web.absoluteUrl;
    this.properties.description = this.properties.description || 'Local testing dashboard for the Projects list.';
  }

  public render(): void {
    const element: React.ReactElement<IDemoProps> = React.createElement(Demo, {
      context: this.context,
      description: this.properties.description,
      listName: this.properties.listName,
      siteUrl: this.properties.siteUrl,
      isDarkTheme: this._isDarkTheme
    });

    ReactDom.render(element, this.domElement);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    this._isDarkTheme = !!currentTheme?.isInverted;
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('listName', {
                  label: strings.ListNameFieldLabel
                }),
                PropertyPaneTextField('siteUrl', {
                  label: strings.SiteUrlFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
