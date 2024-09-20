import { type ReactElement, useState } from 'react';
import PageContainer from '../../ui/page-container';
import BookingsList from './bookings-list';

const Bookings = (): ReactElement => {
  const [search, setSearch] = useState<string>('');

  return (
    <PageContainer title="Booking Management" onSearch={setSearch}>
      <BookingsList search={search} />
    </PageContainer>
  );
};

export default Bookings;
