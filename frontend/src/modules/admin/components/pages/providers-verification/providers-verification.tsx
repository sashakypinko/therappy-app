import { type ReactElement, useState } from 'react';
import PageContainer from '../../ui/page-container';
import ProvidersVerificationList from './providers-verification-list';

const ProvidersVerification = (): ReactElement => {
  const [search, setSearch] = useState<string>('');

  return (
    <PageContainer title="SP Management" onSearch={setSearch}>
      <ProvidersVerificationList search={search} />
    </PageContainer>
  );
};

export default ProvidersVerification;
