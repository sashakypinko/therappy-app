import { type ReactElement, useState } from 'react';
import PageContainer from '../../ui/page-container';
import ProvidersList from './providers-list';

const Providers = (): ReactElement => {
  const [search, setSearch] = useState<string>('');

  return (
    <PageContainer title="SP Management" onSearch={setSearch}>
      <ProvidersList search={search} />
    </PageContainer>
  );
};

export default Providers;
