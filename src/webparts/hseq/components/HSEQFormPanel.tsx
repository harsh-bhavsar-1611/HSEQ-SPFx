import * as React from 'react';
import {
  Panel,
  PanelType,
  Pivot,
  PivotItem,
  TextField,
  Dropdown,
  SpinButton,
  Checkbox,
  PrimaryButton,
  DefaultButton,
  Stack,
  Text,
  IDropdownOption
} from '@fluentui/react';
import type { IHseqRecord } from './models';
import {
  STATUS_OPTIONS,
  PRIORITY_OPTIONS,
  CATEGORY_OPTIONS,
  CLASSIFICATION_OPTIONS,
  REGARDING_OPTIONS
} from './constants';

interface IHSEQFormPanelProps {
  isOpen: boolean;
  editingId: number | undefined;
  formData: IHseqRecord;
  onDismiss: () => void;
  onSave: () => void;
  onFormChange: (field: keyof IHseqRecord, value: any) => void;
}

export const HSEQFormPanel: React.FC<IHSEQFormPanelProps> = ({
  isOpen,
  editingId,
  formData,
  onDismiss,
  onSave,
  onFormChange
}) => {
  const [activeTab, setActiveTab] = React.useState<'general' | 'internal'>('general');

  const dropdownMapper = (options: string[]): IDropdownOption[] =>
    options.map((o) => ({ key: o, text: o }));

  return (
    <Panel
      isOpen={isOpen}
      onDismiss={onDismiss}
      type={PanelType.custom}
      customWidth="50vw"
      headerText={editingId ? 'Edit Task' : 'New Task'}
      className="formPanel"
      isLightDismiss
    >
      <div className="panelContent">
        <Pivot
          selectedKey={activeTab}
          onLinkClick={(item) => setActiveTab((item?.props.itemKey as any) || 'general')}
          className="formTabs"
        >
          <PivotItem headerText="General Information" itemKey="general">
            <div className="tabBody">
              <div className="formGrid">
                <div className="formField formFullWidth">
                  <TextField
                    required
                    label="Subject"
                    value={formData.subject}
                    onChange={(_, v) => onFormChange('subject', v || '')}
                  />
                </div>
                <div className="formField formFullWidth">
                  <TextField
                    label="Description"
                    multiline
                    rows={3}
                    value={formData.description}
                    onChange={(_, v) => onFormChange('description', v || '')}
                  />
                </div>
                <div className="formField">
                  <Dropdown
                    label="Regarding"
                    selectedKey={formData.regarding}
                    options={dropdownMapper(REGARDING_OPTIONS)}
                    onChange={(_, o) => onFormChange('regarding', o?.key || '')}
                  />
                </div>
                <div className="formField">
                  <Dropdown
                    label="Category"
                    selectedKey={formData.category}
                    options={dropdownMapper(CATEGORY_OPTIONS)}
                    onChange={(_, o) => onFormChange('category', o?.key || '')}
                  />
                </div>
                <div className="formField">
                  <Dropdown
                    label="Classification"
                    selectedKey={formData.classification}
                    options={dropdownMapper(CLASSIFICATION_OPTIONS)}
                    onChange={(_, o) => onFormChange('classification', o?.key || '')}
                  />
                </div>
                <div className="formField">
                  <TextField
                    label="Task Owner (External)"
                    value={formData.taskOwner}
                    onChange={(_, v) => onFormChange('taskOwner', v || '')}
                  />
                </div>
                <div className="formField">
                  <Dropdown
                    label="Priority"
                    selectedKey={formData.priority}
                    options={dropdownMapper(PRIORITY_OPTIONS)}
                    onChange={(_, o) => onFormChange('priority', o?.key || '')}
                  />
                </div>
                <div className="formField">
                  <Dropdown
                    label="Status"
                    selectedKey={formData.status}
                    options={dropdownMapper(STATUS_OPTIONS)}
                    onChange={(_, o) => onFormChange('status', o?.key || '')}
                  />
                </div>
              </div>
            </div>
          </PivotItem>
          <PivotItem headerText="Internal & Timeline" itemKey="internal">
             <div className="tabBody">
              <div className="formGrid">
                <div className="formField">
                  <TextField
                    label="Start Date"
                    type="date"
                    value={formData.startDate}
                    onChange={(_, v) => onFormChange('startDate', v || '')}
                  />
                </div>
                <div className="formField">
                   <SpinButton
                      label="% Completed"
                      value={formData.percentCompleted.toString()}
                      min={0}
                      max={100}
                      onChange={(_, v) => onFormChange('percentCompleted', parseInt(v || '0', 10))}
                   />
                </div>
                <div className="formField formFullWidth">
                  <TextField
                    label="Resolution"
                    multiline
                    rows={4}
                    value={formData.resolution}
                    onChange={(_, v) => onFormChange('resolution', v || '')}
                  />
                </div>
                <div className="formField formFullWidth">
                   <Checkbox
                      label="Email Notification"
                      checked={formData.emailNotification}
                      onChange={(_, c) => onFormChange('emailNotification', c || false)}
                   />
                </div>
              </div>
            </div>
          </PivotItem>
        </Pivot>
      </div>
      <Stack horizontal tokens={{ childrenGap: 8 }} className="formActions">
        <PrimaryButton text={editingId ? 'Update' : 'Save'} onClick={onSave} />
        <DefaultButton text="Cancel" onClick={onDismiss} />
      </Stack>
    </Panel>
  );
};
