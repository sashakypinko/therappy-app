import { type ReactElement } from 'react';
import PageContainer from '../../ui/page-container';

const Reports = (): ReactElement => {
  return (
    <PageContainer title="Reports" onSearch={console.log}>
      <div></div>
    </PageContainer>
  );
};

export default Reports;
