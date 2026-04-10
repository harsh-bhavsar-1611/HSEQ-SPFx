import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import type { IReadonlyTheme } from '@microsoft/sp-component-base';

import SiteNavigation from './components/SiteNavigation';
import type { ISiteNavigationProps } from './components/ISiteNavigationProps';

export default class SiteNavigationWebPart extends BaseClientSideWebPart<Record<string, never>> {
  private _isDarkTheme: boolean = false;

  public render(): void {
    const element: React.ReactElement<ISiteNavigationProps> = React.createElement(SiteNavigation, {
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
}
