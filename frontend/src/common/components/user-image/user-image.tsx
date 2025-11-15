import React, { ReactElement, useMemo } from 'react';
import { Box, IconButton, Skeleton, styled } from '@mui/material';
import { colors } from '../../../config/theme/colors';
import { getImagePath } from '../../../helpers/image.helper';
import CustomTooltip from '../../ui/custom-tooltip';
import FileField from '../../ui/file-field';
import { InfoCircle } from '../../ui/icon';
import { IClient } from '../../../services/api/client/dto/client.dto';
import { IProvider } from '../../../services/api/provider/dto/provider.dto';
import { ImageSizesEnum } from '../../../enums/image-sizes.enum';

const Image = styled('img')(
  () => `
    width: 140px;
    height: 140px;
    object-fit: cover;
    border-radius: 80px;
`,
);

const InfoButton = styled(IconButton)(
  () => `
    width: 25px;
    height: 25px;
    background: ${colors.secondary[10]};
    position: absolute;
    bottom: 5px;
    right: 5px;
    
    &:hover {
       background: ${colors.secondary[30]};
    }
    
    &:active {
       background: ${colors.secondary[50]};
    }
`,
);

interface Props {
  loading?: boolean;
  user: IClient | IProvider;
  onChange: (file: File) => void;
}

const UserImage = ({ user, onChange, loading }: Props): ReactElement => {
  const avatarUrl = useMemo(() => {
    if (typeof user.details.image === 'string') return user.details.image;
    if (user.details.image) return URL.createObjectURL(user.details.image);
    if (user.details.image_id) return getImagePath(user.details.image_id, ImageSizesEnum.MEDIUM);

    return '/img/default-avatar.svg';
  }, [user.details.image]);

  return (
    <Box display="flex" justifyContent="center">
      <Box sx={{ mt: 3 }}>
        {loading ? (
          <Skeleton sx={{ borderRadius: '50%' }} variant="rectangular" width={140} height={140} />
        ) : (
          <Box sx={{ position: 'relative', width: 140, height: 140 }}>
            <Image src={avatarUrl} />
            <CustomTooltip
              title={
                <>
                  Pick a headshot that represents you and only you as a friendly, smiling professional. Sorry but avoid
                  pics with pets, family or kids. Make sure: you are in natural light, low res image, avoid black and
                  white. We recommend no sunglasses, or anything that covers your face.
                </>
              }
            >
              <InfoButton>
                <InfoCircle />
              </InfoButton>
            </CustomTooltip>
          </Box>
        )}
        <Box width="100%" textAlign="center">
          <FileField variant="text" onChange={onChange} disabled={loading}>
            Change
          </FileField>
        </Box>
      </Box>
    </Box>
  );
};

export default UserImage;
