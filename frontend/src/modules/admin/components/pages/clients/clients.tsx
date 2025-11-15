import { type ReactElement, useState } from 'react';
import PageContainer from '../../ui/page-container';
import ClientsList from './clients-list';

const Clients = (): ReactElement => {
  const [search, setSearch] = useState<string>('');

  return (
    <PageContainer title="User Management" onSearch={setSearch}>
      <ClientsList search={search} />
    </PageContainer>
  );
};

export default Clients;
