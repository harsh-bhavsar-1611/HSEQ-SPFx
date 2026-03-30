import type { IProjectItem } from './models';

export type SortDirection = 'asc' | 'desc';

export function compareValues(left: string, right: string, direction: SortDirection): number {
  const normalizedLeft = left.toLowerCase();
  const normalizedRight = right.toLowerCase();

  if (normalizedLeft < normalizedRight) {
    return direction === 'asc' ? -1 : 1;
  }

  if (normalizedLeft > normalizedRight) {
    return direction === 'asc' ? 1 : -1;
  }

  return 0;
}

export function sanitizeCsvValue(value: string): string {
  return `"${value.replace(/"/g, '""')}"`;
}

export function downloadFile(fileName: string, content: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.click();
  window.URL.revokeObjectURL(url);
}

export function formatFileStamp(date: Date): string {
  return date.toISOString().replace(/[:T]/g, '-').slice(0, 16);
}

export function buildPrintMarkup(items: IProjectItem[], selectedItem: IProjectItem | undefined): string {
  const rows = items.map((item) => `
    <tr>
      <td>${escapeHtml(item.projectName)}</td>
      <td>${escapeHtml(item.projectType)}</td>
      <td>${escapeHtml(item.location)}</td>
      <td>${escapeHtml(item.startDate)}</td>
      <td>${escapeHtml(item.estimatedEndDate)}</td>
    </tr>
  `).join('');

  const detailSection = selectedItem ? `
    <div class="print-card">
      <h2>${escapeHtml(selectedItem.projectName)}</h2>
      <div class="print-grid">
        <div><strong>Project Type</strong><span>${escapeHtml(selectedItem.projectType)}</span></div>
        <div><strong>Location</strong><span>${escapeHtml(selectedItem.location)}</span></div>
        <div><strong>Start Date</strong><span>${escapeHtml(selectedItem.startDate)}</span></div>
        <div><strong>Estimated End Date</strong><span>${escapeHtml(selectedItem.estimatedEndDate)}</span></div>
      </div>
    </div>
  ` : '';

  return `
    <h1>Projects</h1>
    ${detailSection}
    <table class="print-table">
      <thead>
        <tr>
          <th>Project Name</th>
          <th>Project Type</th>
          <th>Location</th>
          <th>Start Date</th>
          <th>Estimated End Date</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

export function buildPrintStyles(): string {
  return `
    <style>
      body { font-family: Segoe UI, Arial, sans-serif; margin: 24px; color: #1f1f1f; }
      h1 { margin-bottom: 18px; }
      h2 { margin: 0 0 16px; font-size: 20px; }
      .print-card { margin-bottom: 20px; padding: 16px; border: 1px solid #d8d8d8; background: #fbfbfb; }
      .print-grid { display: grid; grid-template-columns: repeat(2, minmax(220px, 1fr)); gap: 14px 20px; }
      .print-grid div { display: flex; flex-direction: column; gap: 4px; }
      .print-table { width: 100%; border-collapse: collapse; }
      .print-table th, .print-table td { border: 1px solid #d8d8d8; padding: 8px 10px; text-align: left; }
      .print-table th { background: #f4f4f4; }
    </style>
  `;
}

export function toErrorMessage(error: unknown, listName: string, siteUrl: string): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return `Unable to load or save the "${listName}" list from ${siteUrl}.`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
