import { SPHttpClient, type ISPHttpClientOptions } from '@microsoft/sp-http';
import type { WebPartContext } from '@microsoft/sp-webpart-base';

import type { IProjectFormData, IProjectItem, IProjectsLoadResult } from './models';

interface IFieldResponse {
  d?: {
    results?: Array<{
      Choices?: {
        results?: string[];
      };
    }>;
  };
  value?: Array<{
    Choices?: string[];
  }>;
}

interface IEntityTypeResponse {
  d?: {
    ListItemEntityTypeFullName?: string;
  };
  ListItemEntityTypeFullName?: string;
}

interface IItemsResponse {
  d?: {
    results?: Array<Record<string, unknown>>;
  };
  value?: Array<Record<string, unknown>>;
}

interface ICreateItemResponse {
  d?: {
    Id?: number;
  };
  Id?: number;
}

export default class ProjectsService {
  private readonly _siteUrl: string;
  private _entityTypeName?: string;

  public constructor(
    private readonly _context: WebPartContext,
    siteUrl: string,
    private readonly _listName: string
  ) {
    this._siteUrl = siteUrl.replace(/\/$/, '');
  }

  public async load(): Promise<IProjectsLoadResult> {
    const [items, projectTypeChoices] = await Promise.all([
      this._getItems(),
      this._getProjectTypeChoices()
    ]);

    return {
      items,
      projectTypeChoices
    };
  }

  public async save(formData: IProjectFormData): Promise<IProjectItem> {
    const payload = await this._buildPayload(formData);
    const itemId = formData.id
      ? await this._updateItem(formData.id, payload)
      : await this._createItem(payload);

    const savedItem = await this._getItemById(itemId);
    return savedItem;
  }

  private async _getProjectTypeChoices(): Promise<string[]> {
    const response = await this._context.spHttpClient.get(
      `${this._listApiBase()}/fields/getByInternalNameOrTitle('ProjectType')?$select=Choices`,
      SPHttpClient.configurations.v1
    );

    if (!response.ok) {
      return ['Commarcial', 'Residental'];
    }

    const json = await response.json() as IFieldResponse;
    if (json.value && json.value[0]?.Choices) {
      return json.value[0].Choices;
    }

    if (json.d?.results?.[0]?.Choices?.results) {
      return json.d.results[0].Choices.results;
    }

    return ['Commarcial', 'Residental'];
  }

  private async _getItems(): Promise<IProjectItem[]> {
    const response = await this._context.spHttpClient.get(
      `${this._listApiBase()}/items?$top=500&$orderby=Id desc&$select=Id,ProjectName,ProjectType,Location,StartDate,EstimatedEndDate`,
      SPHttpClient.configurations.v1
    );

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const json = await response.json() as IItemsResponse;
    const items = json.value ?? json.d?.results ?? [];
    return items.map((item) => this._toProjectItem(item));
  }

  private async _getItemById(itemId: number): Promise<IProjectItem> {
    const response = await this._context.spHttpClient.get(
      `${this._listApiBase()}/items(${itemId})?$select=Id,ProjectName,ProjectType,Location,StartDate,EstimatedEndDate`,
      SPHttpClient.configurations.v1
    );

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const json = await response.json() as Record<string, unknown> & { d?: Record<string, unknown> };
    return this._toProjectItem((json.d ?? json) as Record<string, unknown>);
  }

  private _toProjectItem(item: Record<string, unknown>): IProjectItem {
    const startDateValue = readText(item.StartDate);
    const estimatedEndDateValue = readText(item.EstimatedEndDate);

    return {
      id: Number(item.Id),
      projectName: readText(item.ProjectName) || readText(item.Title),
      projectType: readText(item.ProjectType),
      location: readText(item.Location),
      startDate: formatDate(startDateValue),
      estimatedEndDate: formatDate(estimatedEndDateValue),
      startDateValue,
      estimatedEndDateValue
    };
  }

  private async _buildPayload(formData: IProjectFormData): Promise<Record<string, unknown>> {
    const entityTypeName = await this._getEntityTypeName();

    return {
      __metadata: {
        type: entityTypeName
      },
      ProjectName: formData.projectName.trim(),
      ProjectType: formData.projectType.trim(),
      Location: formData.location.trim(),
      StartDate: formData.startDate ? new Date(formData.startDate).toISOString() : null,
      EstimatedEndDate: formData.estimatedEndDate ? new Date(formData.estimatedEndDate).toISOString() : null
    };
  }

  private async _createItem(payload: Record<string, unknown>): Promise<number> {
    const options: ISPHttpClientOptions = {
      headers: {
        'Content-Type': 'application/json;odata=verbose;charset=utf-8'
      },
      body: JSON.stringify(payload)
    };

    const response = await this._context.spHttpClient.post(
      `${this._listApiBase()}/items`,
      SPHttpClient.configurations.v1,
      options
    );

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const json = await response.json() as ICreateItemResponse;
    return json.Id ?? json.d?.Id ?? 0;
  }

  private async _updateItem(itemId: number, payload: Record<string, unknown>): Promise<number> {
    const options: ISPHttpClientOptions = {
      headers: {
        'Content-Type': 'application/json;odata=verbose;charset=utf-8',
        'IF-MATCH': '*',
        'X-HTTP-Method': 'MERGE'
      },
      body: JSON.stringify(payload)
    };

    const response = await this._context.spHttpClient.post(
      `${this._listApiBase()}/items(${itemId})`,
      SPHttpClient.configurations.v1,
      options
    );

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return itemId;
  }

  private async _getEntityTypeName(): Promise<string> {
    if (this._entityTypeName) {
      return this._entityTypeName;
    }

    const response = await this._context.spHttpClient.get(
      `${this._listApiBase()}?$select=ListItemEntityTypeFullName`,
      SPHttpClient.configurations.v1
    );

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const json = await response.json() as IEntityTypeResponse;
    this._entityTypeName = json.ListItemEntityTypeFullName ?? json.d?.ListItemEntityTypeFullName ?? '';
    return this._entityTypeName;
  }

  private _listApiBase(): string {
    const safeListName = this._listName.replace(/'/g, "''");
    return `${this._siteUrl}/_api/web/lists/getByTitle('${safeListName}')`;
  }
}

function readText(value: unknown): string {
  if (value === undefined || value === null) {
    return '';
  }

  return String(value);
}

function formatDate(rawValue: string): string {
  if (!rawValue) {
    return '';
  }

  const parsedDate = new Date(rawValue);
  if (Number.isNaN(parsedDate.getTime())) {
    return rawValue;
  }

  return new Intl.DateTimeFormat('en-GB').format(parsedDate);
}
