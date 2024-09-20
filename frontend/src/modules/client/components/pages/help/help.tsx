import { ReactElement, useState } from 'react';
import { Container } from '@mui/material';
import ContactForm from './contact-form';
import FaqPage from './faq-page';

const Help = (): ReactElement => {
  return (
    <Container maxWidth="lg">
      <FaqPage />
    </Container>
  );
};

export default Help;
