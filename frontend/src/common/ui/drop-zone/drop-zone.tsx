import { ReactElement, useState } from 'react';
import { Box, Paper, styled, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import Button from '../button';
import { colors } from '../../../config/theme/colors';

const DropZoneContainer = styled(Paper)(
  () => `
    width: 100%;
    min-height: 40;
    display: flex;
    align-items: center;
    padding-left: 16px;
    cursor: pointer;  
    border-radius: 8px;
    border: 1px solid ${colors.secondary[30]};
    color: ${colors.secondary[30]};
    font-size: 18px;
    font-weight: 400;
    line-height: 24px;
`,
);

interface Props {
  placeholder: string;
  onLoad: (files: File[], callback: () => void) => void;
  disabled?: boolean;
}

const DropZone = ({ placeholder, onLoad, disabled }: Props): ReactElement => {
  const [loading, setLoading] = useState<boolean>(false);

  const onDrop = (acceptedFiles: File[] = []) => {
    setLoading(true);
    setTimeout(async () => {
      if (acceptedFiles.length) {
        onLoad(acceptedFiles, () => setLoading(false));
        setLoading(false);
      } else {
        setLoading(false);
      }
    }, 0);
  };

  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    accept: {},
    onDrop,
    disabled: loading,
  });

  if (disabled)
    return (
      <DropZoneContainer sx={{ border: 'none' }} variant="outlined">
        <Typography sx={{ pt: 1, pb: 1 }}>This file is not loaded</Typography>
      </DropZoneContainer>
    );

  return (
    <Box display="flex">
      <DropZoneContainer variant="outlined" {...getRootProps()}>
        <input {...getInputProps()} />
        {loading && <Typography align="center">Loading...</Typography>}
        {!loading && !isDragReject && <Box sx={{ display: 'block' }}>{placeholder}</Box>}
      </DropZoneContainer>
      <Button {...getRootProps()} sx={{ ml: 1, minWidth: '135px' }} variant="contained">
        Browse Files
      </Button>
    </Box>
  );
};

export default DropZone;
