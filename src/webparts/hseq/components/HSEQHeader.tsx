import * as React from 'react';
import { Stack, IconButton, Text } from '@fluentui/react';

interface IHSEQHeaderProps {
  isMobile: boolean;
  navCollapsed: boolean;
  onToggleNav: () => void;
  selectedModuleLabel: string;
}

export const HSEQHeader: React.FC<IHSEQHeaderProps> = ({
  isMobile,
  navCollapsed,
  onToggleNav,
  selectedModuleLabel
}) => {
  return (
    <div className="header">
      <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 12 }}>
        <IconButton
          iconProps={{
            iconName: isMobile ? 'GlobalNavButton' : (navCollapsed ? 'ChevronRight' : 'ChevronLeft')
          }}
          title="Toggle Sidebar"
          onClick={onToggleNav}
          styles={{ root: { fontSize: '18px' } }}
        />
        <Text variant="xLarge" block style={{ fontWeight: 600 }} className="headerTitle">
          {selectedModuleLabel || 'HSEQ Dashboard'}
        </Text>
      </Stack>
    </div>
  );
};
