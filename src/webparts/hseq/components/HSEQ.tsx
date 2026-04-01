import * as React from 'react';
import { MessageBar, MessageBarType } from '@fluentui/react';
import type { IHSEQProps } from './IHSEQProps';
import { HSEQ_NAV_ITEMS, EMPTY_RECORD } from './constants';
import type { IHseqRecord, IHseqNavItem } from './models';
import { HSEQ_CSS } from './hseqCss';

// Sub-components
import { HSEQHeader } from './HSEQHeader';
import { HSEQSidebar } from './HSEQSidebar';
import { HSEQMainList } from './HSEQMainList';
import { HSEQFormPanel } from './HSEQFormPanel';

const MOBILE_BREAKPOINT = 768;

const HSEQ: React.FC<IHSEQProps> = (props) => {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);
  const [navCollapsed, setNavCollapsed] = React.useState<boolean>(false);
  const [selectedModule, setSelectedModule] = React.useState<IHseqNavItem | undefined>(HSEQ_NAV_ITEMS[0]);
  const [records, setRecords] = React.useState<IHseqRecord[]>([]);
  const [formData, setFormData] = React.useState<IHseqRecord>(EMPTY_RECORD);
  const [showForm, setShowForm] = React.useState<boolean>(false);
  const [editingId, setEditingId] = React.useState<number | undefined>(undefined);
  const [successMessage, setSuccessMessage] = React.useState<string>('');

  React.useEffect(() => {
    const handleResize = (): void => {
      const nextIsMobile = window.innerWidth <= MOBILE_BREAKPOINT;
      setIsMobile(nextIsMobile);
      setNavCollapsed(nextIsMobile);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSave = (): void => {
    if (editingId) {
      setRecords(prev => prev.map(r => r.id === editingId ? { ...formData } : r));
      setSuccessMessage('Record updated');
    } else {
      setRecords(prev => [{ ...formData, id: Date.now() }, ...prev]);
      setSuccessMessage('Record added');
    }
    setShowForm(false);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="hseqContainer">
      <style>{HSEQ_CSS}</style>
      <HSEQHeader
        isMobile={isMobile}
        navCollapsed={navCollapsed}
        onToggleNav={() => setNavCollapsed(!navCollapsed)}
        selectedModuleLabel={selectedModule?.label || ''}
      />
      <div className="contentWrapper">
        <HSEQSidebar
          isMobile={isMobile}
          navCollapsed={navCollapsed}
          selectedModule={selectedModule}
          onSelectModule={(item) => {
            setSelectedModule(item);
            if (isMobile) setNavCollapsed(true);
          }}
          onCloseMobile={() => setNavCollapsed(true)}
        />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {successMessage && <MessageBar messageBarType={MessageBarType.success}>{successMessage}</MessageBar>}
          <HSEQMainList
            records={records}
            selectedModule={selectedModule}
            onAddNew={() => { setEditingId(undefined); setFormData(EMPTY_RECORD); setShowForm(true); }}
            onEdit={(r) => { setEditingId(r.id); setFormData(r); setShowForm(true); }}
            onDelete={(id) => setRecords(prev => prev.filter(r => r.id !== id))}
            onExportCsv={() => alert('Exporting CSV...')}
            onExportExcel={() => alert('Exporting Excel...')}
            onPrint={() => window.print()}
          />
        </div>
      </div>
      <HSEQFormPanel
        isOpen={showForm}
        editingId={editingId}
        formData={formData}
        onDismiss={() => setShowForm(false)}
        onSave={handleSave}
        onFormChange={(f, v) => setFormData(prev => ({ ...prev, [f]: v }))}
      />
    </div>
  );
};

export default HSEQ;
