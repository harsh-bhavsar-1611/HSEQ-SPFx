declare interface IDemoWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  ListNameFieldLabel: string;
  SiteUrlFieldLabel: string;
}

declare module 'DemoWebPartStrings' {
  const strings: IDemoWebPartStrings;
  export = strings;
}
