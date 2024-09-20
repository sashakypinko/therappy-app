import { Box, Grid, styled } from '@mui/material';
import { ReactElement, useState } from 'react';
import { IService } from '../../../../services/api/service/dto/service.dto';
import { useSelector } from 'react-redux';
import { selectServices } from '../../../../store/selectors';
import { getImagePath } from '../../../../helpers/image.helper';
import { ItemCard, ItemCardInfo } from '../../../ui/list/list-item/list-item';
import { colors } from '../../../../config/theme/colors';
import Button from '../../../ui/button';
import { ImageSizesEnum } from '../../../../enums/image-sizes.enum';
import { shortString } from "../../../../helpers/string.helper";

const GridContainer = styled(Grid)(
  () => `
    // align-items: center;
`,
);

const Actions = styled(Grid)(
  ({ theme }) => `
    align-items: end;
    display: flex;
    justify-content: end;
    padding-right: 8px;
    
    @media (max-width: ${theme.breakpoints.values.md}px) {
      padding-right: 0;
    }
`,
);

const Image = styled('img')(
  () => `
    object-fit: cover;
    border-radius: 4px;
    margin-right: 16px;
`,
);

const Title = styled('p')(
  () => `
    font-size: 18px;
    font-weight: 700;
    line-height: 22px;
    margin: 0;
`,
);

const Description = styled('p')(
  () => `
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    margin: 0;
`,
);

const StyledButton = styled(Button)(
  () => `
    height: 34px;
`,
);

interface ItemProps {
  service: IService;
  selected: boolean;
  onSelect: () => void;
}

const Item = ({ service, selected, onSelect }: ItemProps) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const imageUrl = getImagePath(service.image_id || 0, ImageSizesEnum.SMALL);

  const isTextTooLarge = service.description.length > 200;

  return (
    <ItemCard
      sx={{
        background: colors.background.BG_1,
        ...(selected && {
          border: `1px solid ${colors.primary[40]}`,
          boxShadow:
            '0px 0px 6.51852px 0px rgba(0, 111, 204, 0.06), 0px 0px 25.48148px 0px rgba(0, 111, 204, 0.09), 0px 0px 80px 0px rgba(0, 111, 204, 0.15)',
        }),
      }}
      onClick={onSelect}
    >
      <GridContainer container spacing={1}>
        <ItemCardInfo item lg={9} md={7} sm={12}>
          <Image sx={{ width: 100, height: 100 }} src={imageUrl} />
          <Box>
            <Title>{service.name}</Title>
            <Description>
              {expanded
                ? service.description
                : shortString(service.description, 200)}
            </Description>
          </Box>
        </ItemCardInfo>
        <Actions item lg={3} md={5} sm={12} xs={12}>
            {isTextTooLarge && (
              <StyledButton
                variant={'contained'}
                color={expanded ? 'inherit' : 'primary'}
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded(!expanded);
                }}
              >
                {expanded ? 'Show less' : 'Show more'}
              </StyledButton>
            )}
        </Actions>
      </GridContainer>
    </ItemCard>
  );
};

interface Props {
  categoryId: number;
  serviceId: number;
  onServiceSelect: (service: IService) => void;
}

const ServiceSelector = ({ categoryId, serviceId, onServiceSelect }: Props): ReactElement | null => {
  const { services, loading } = useSelector(selectServices);

  if (loading) {
    //    todo   create skeleton
    return null;
  }

  return (
    <Box>
      {services.data
        .filter(({ category_id }: IService) => category_id === categoryId)
        .map((service: IService) => {
          return (
            <Item
              key={service.id}
              service={service}
              selected={serviceId === service.id}
              onSelect={() => onServiceSelect(service)}
            />
          );
        })}
    </Box>
  );
};

export default ServiceSelector;
