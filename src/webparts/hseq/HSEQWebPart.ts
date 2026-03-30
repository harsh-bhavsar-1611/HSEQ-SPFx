import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import type { IReadonlyTheme } from '@microsoft/sp-component-base';

import { strings } from './loc/en-us';
import HSEQ from './components/HSEQ';
import type { IHSEQProps } from './components/IHSEQProps';

export interface IHSEQWebPartProps {
  description: string;
}

export default class HSEQWebPart extends BaseClientSideWebPart<IHSEQWebPartProps> {
  private _isDarkTheme: boolean = false;

  protected async onInit(): Promise<void> {
    this.properties.description = this.properties.description || 'HSEQ Module Dashboard';
  }

  public render(): void {
    const element: React.ReactElement<IHSEQProps> = React.createElement(HSEQ, {
      context: this.context,
      description: this.properties.description,
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
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
