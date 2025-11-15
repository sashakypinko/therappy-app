import { ChangeEvent, ReactElement, ReactNode, useState } from 'react';
import { Box, Container, styled, Typography } from '@mui/material';
import SearchField from '../../../../../common/ui/search-field';
import FilterModal from '../filter-modal';
import { Filter, FilterOption } from '../filter-modal/filter-modal';
import Button from '../../../../../common/ui/button';

const StyledContainer = styled(Container)(
  () => `
    padding: 0 130px 0 38px !important;
    margin: 0;
`,
);

const Header = styled(Box)(
  () => `
  display: flex;
  justify-content: space-between;
  padding: 48px 0 !important;
  align-items: center;
`,
);

const PageToolsContainer = styled(Box)(
  () => `
  display: flex;
  justify-content: space-between;
`,
);

const Title = styled(Typography)(
  () => `
  font-size: 20px;
  margin: 0;
`,
);

const StyledSearchField = styled(SearchField)(
  () => `
  width: 300px;
`,
);

const AddButton = styled(Button)(
  ({ theme }) => `
    background: #fff;
    border: 1px solid #d8d9df;
    stroke: ${theme.palette.primary.main};
    height: 40px;
    margin-left: 40px;
`,
);

type Timeout = ReturnType<typeof setTimeout>;

interface Props {
  title: string;
  children: ReactNode;
  onSearch: (value: string) => void;
  addButtonTitle?: string;
  onAddButtonClick?: () => void;
  filterOptions?: FilterOption[];
  onFilter?: (filter: Filter) => void;
}

const PageContainer = ({
  title,
  children,
  filterOptions,
  addButtonTitle,
  onAddButtonClick,
  onSearch,
  onFilter,
}: Props): ReactElement => {
  const [search, setSearch] = useState<string>('');
  const [timer, setTimer] = useState<Timeout | null>(null);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setSearch(value);

    if (timer) {
      clearTimeout(timer);
    }

    const newTimer: Timeout = setTimeout(() => {
      onSearch(value);
    }, 1000);

    setTimer(newTimer);
  };

  return (
    <StyledContainer maxWidth="xl">
      <Header>
        <Title variant="h5">{title}</Title>
        <PageToolsContainer>
          <StyledSearchField value={search} onChange={handleSearchChange} />
          {addButtonTitle && onAddButtonClick && (
            <AddButton variant="outlined" onClick={onAddButtonClick}>
              {addButtonTitle}
            </AddButton>
          )}
          {filterOptions && <FilterModal filterOptions={filterOptions} onFilter={onFilter} />}
        </PageToolsContainer>
      </Header>
      {children}
    </StyledContainer>
  );
};

export default PageContainer;
