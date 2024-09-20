import { Box, Grid, Skeleton, styled, Typography } from '@mui/material';
import { ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import { CategoryImages, CategoryLabels, ServiceCategoriesEnum } from '../../../../enums/service-categories.enum';
import { colors } from '../../../../config/theme/colors';
import Button from '../../../ui/button';
import { EastRounded, WestRounded } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { selectServices } from '../../../../store/selectors';
import { IService } from '../../../../services/api/service/dto/service.dto';

const Image = styled('img')(
  () => `
    width: 100%;
    border-radius: 12px;
    cursor: pointer;
  `,
);

const ButtonContainer = styled(Box)(
  () => `
    position: absolute;
    display: flex;
    justify-content: end;
    padding: 24px;
    width: 100%;
    bottom: 0;
    left: 0;
  `,
);

const CategoryButton = styled(Button)(
  () => `
    border-radius: 14px;
    opacity: 0.85;
    color: ${colors.primary[70]};
    font-size: 24px;
    font-weight: 700;
    padding: 28px;
    text-wrap: wrap;
  `,
);

const SwitchCountBlock = styled(Box)(
  () => `
    position: relative;
    border-radius: 12px;
    border: 1px solid ${colors.secondary[30]};
    padding: 14px;
    background: ${colors.background.BG_1};
  `,
);

interface CategoryItemProps {
  name: string;
  itemId: ServiceCategoriesEnum;
  selectedId: number;
  onCategorySelect: (categoryId: number) => void;
}

const CategoryItem = ({ name, itemId, selectedId, onCategorySelect }: CategoryItemProps): ReactElement => {
  const [loading, setLoading] = useState<boolean>(true);
  const [resizeObserver, setResizeObserver] = useState<ResizeObserver | null>(null);

  const imageLoaded = () => {
    setLoading(false);
  };

  useEffect(() => {
    if (loading) {
      const categoryCard = document.getElementById(`categorySkeleton${itemId}`);

      if (categoryCard) {
        const observer = new ResizeObserver(() => {
          categoryCard.style.height = `${categoryCard.clientWidth * 1.2}px`;
        });

        resizeObserver && resizeObserver.disconnect();
        setResizeObserver(observer);
        observer.observe(categoryCard);
      }
    } else {
      resizeObserver && resizeObserver.disconnect();
    }
  }, [loading]);

  return (
    <Box position="relative" onClick={() => onCategorySelect(itemId)}>
      <Skeleton
        id={`categorySkeleton${itemId}`}
        sx={{
          display: loading ? 'block' : 'none',
          borderRadius: 3,
          height: 'calc()',
        }}
        variant="rectangular"
        width="100%"
        height="100%"
      />
      <Image
        sx={{
          display: loading ? 'none' : 'block',
          ...(selectedId === itemId && { border: `2px solid ${colors.primary[70]}` }),
        }}
        src={CategoryImages[itemId]}
        onLoad={imageLoaded}
      />
      <ButtonContainer>
        <CategoryButton variant="contained" color="secondary" fullWidth>
          {name}
        </CategoryButton>
      </ButtonContainer>
    </Box>
  );
};

interface Props {
  categoryId: number;
  onCategorySelect: (categoryId: number) => void;
}

const CategorySelector = ({ categoryId, onCategorySelect }: Props): ReactElement => {
  const [showAll, setShowAll] = useState<boolean>(false);
  const { services, loading } = useSelector(selectServices);

  const filteredCategories = useMemo(() => {
    if (loading) return [];

    return Object.entries(CategoryLabels)
      .filter(([id]) => !!services.data.find((service: IService) => service.category_id === parseInt(id)))
      .slice(0, showAll ? Object.entries(CategoryLabels).length : 7);
  }, [services, showAll]);

  return (
    <Grid container justifyContent="center" spacing={3}>
      {filteredCategories.map(([id, name]) => {
        const itemId = parseInt(id) as ServiceCategoriesEnum;
        return (
          <Grid key={id} item xs={12} sm={6} md={4} lg={3} xl={2.3}>
            <CategoryItem name={name} itemId={itemId} selectedId={categoryId} onCategorySelect={onCategorySelect} />
          </Grid>
        );
      })}
      {
        filteredCategories.length >= 7 && (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2.3}>
            <SwitchCountBlock height="100%">
              <Typography sx={{ m: 2 }} variant="h3" fontSize={35} color={colors.primary[70]}>
                {showAll ? 'Show Less' : 'Show All Services'}
              </Typography>
              <ButtonContainer>
                <Button sx={{ borderRadius: 16 }} variant="contained" onClick={() => setShowAll(!showAll)}>
                  {showAll ? <WestRounded /> : <EastRounded />}
                </Button>
              </ButtonContainer>
            </SwitchCountBlock>
          </Grid>
        )
      }
    </Grid>
  );
};

export default CategorySelector;
