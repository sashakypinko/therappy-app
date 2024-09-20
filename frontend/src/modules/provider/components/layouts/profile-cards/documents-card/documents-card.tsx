import React, { ReactElement } from 'react';
import Card from '../card';
import CardSection from '../card-section';
import DocumentsLoader from '../../../../../../common/components/documents-loader';
import { useFormikContext } from 'formik';
import { IProvider } from '../../../../../../services/api/provider/dto/provider.dto';

interface Props {
  loading?: boolean;
}

const DocumentsCard = ({ loading }: Props): ReactElement => {
  const { values } = useFormikContext<IProvider>();

  return (
    <Card title="Uploaded Documents">
      <CardSection>
        <DocumentsLoader
          documents={values.additionals}
          loading={loading}
          columns={1}
          readOnly
        />
      </CardSection>
    </Card>
  );
};

export default DocumentsCard;
