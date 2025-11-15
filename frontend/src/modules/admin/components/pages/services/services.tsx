import { type ReactElement, useState } from 'react';
import PageContainer from '../../ui/page-container';
import ServicesList from './services-list';

const Services = (): ReactElement => {
  const [search, setSearch] = useState<string>('');
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <PageContainer
      title="Services"
      onSearch={setSearch}
      addButtonTitle="+ Add Service"
      onAddButtonClick={() => setOpenModal(true)}
    >
      <ServicesList search={search} openModal={openModal} onModalClose={() => setOpenModal(false)} />
    </PageContainer>
  );
};

export default Services;
