import {type ReactElement, useState} from 'react';
import PageContainer from '../../ui/page-container';
import RefundsList from './refunds-list';

const Refunds = (): ReactElement => {
  const [search, setSearch] = useState<string>('');
  
  return (
    <PageContainer title="Refund Management" onSearch={setSearch}>
      <RefundsList search={search}/>
    </PageContainer>
  );
};

export default Refunds;
