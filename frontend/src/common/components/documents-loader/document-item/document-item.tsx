import React, { ChangeEvent, KeyboardEvent, ReactElement, SyntheticEvent, useMemo, useState } from 'react';
import { Box, IconButton, styled, Typography } from '@mui/material';
import { bytesToMB, getFileImageByExtension } from '../../../../modules/admin/components/helpers';
import { EditSecondary } from '../../../ui/icon-v2';
import { colors } from '../../../../config/theme/colors';
import { Trash } from '../../../ui/icon';
import TextInput from '../../../ui/text-input';

const FileContainer = styled(Box)(
  () => `
    display: flex;
    justify-content: space-between;
    border-radius: 5px;
    border: 1px solid ${colors.secondary[30]};
    padding: 4px;
`,
);

const FileImage = styled('img')(
  () => `
    width: auto;
    height: 52px;
    object-fit: cover;
    border-radius: 4px;
    margin-right: 16px;
`,
);

const RemoveFileIconButton = styled(IconButton)(
  () => `
    padding: 14px;
`,
);

const StyledFileNameInput = styled('input')(
  () => `
    height: 24px;
    padding-left: 0;
    margin-bottom: 7px;
    font-size: 15px;
    border: 1px solid ${colors.primary[40]};
    border-radius: 2px;
`,
);

const FileName = styled('a')(
  () => `
    font-size: 15px;
    color: ${colors.secondary[70]};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
`,
);

interface FileNameInputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
}

const FileNameInput = ({ value, onChange, onBlur }: FileNameInputProps): ReactElement => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length > 50) return;
    onChange(value);
  };

  const handlePressEnter = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement | HTMLDivElement>) => {
    if (e.code === 'Enter') {
      onBlur();
    }
  };

  return (
    <StyledFileNameInput value={value} onChange={handleChange} onBlur={onBlur} onKeyDown={handlePressEnter} autoFocus />
  );
};

interface Props {
  name: string;
  extension: string;
  size: number;
  url: string | undefined;
  onEdit: (name: string) => void;
  onRemove: () => void;
  readOnly?: boolean;
}

const DocumentItem = ({ name, extension, size, url, onEdit, onRemove, readOnly }: Props): ReactElement => {
  const [editMode, setEditMode] = useState<boolean>(false);

  const shortName = useMemo(() => {
    if (name.length > 20) {
      return `${name.slice(0, 8)}...${name.slice(name.length - 8, name.length)}`;
    }
    return name;
  }, [name]);

  return (
    <FileContainer sx={readOnly ? { border: 'none' } : {}}>
      <Box sx={{ display: 'flex' }}>
        <FileImage
          src={getFileImageByExtension(extension)}
          onError={(e: SyntheticEvent<HTMLImageElement>) => {
            if (e.target instanceof HTMLImageElement) {
              e.target.src = '/img/file-doc.svg';
            }
          }}
        />
        <Box>
          {editMode ? (
            <FileNameInput value={name} onChange={onEdit} onBlur={() => setEditMode(false)} />
          ) : (
            <Box>
              <FileName {...(url && { href: url, target: '_blank' })}>{shortName}</FileName>
              {!readOnly && (
                <IconButton onClick={() => setEditMode(true)} size="small">
                  <EditSecondary size={16} />
                </IconButton>
              )}
            </Box>
          )}
          <Typography variant="subtitle2" sx={{ color: colors.secondary[40] }}>
            {extension.toUpperCase()} · {bytesToMB(size)}
          </Typography>
        </Box>
      </Box>
      {!readOnly && (
        <RemoveFileIconButton onClick={onRemove}>
          <Trash />
        </RemoveFileIconButton>
      )}
    </FileContainer>
  );
};

export default DocumentItem;
