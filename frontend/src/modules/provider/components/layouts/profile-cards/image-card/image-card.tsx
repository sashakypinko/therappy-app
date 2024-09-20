import React, { ReactElement } from 'react';
import Card from '../card';
import { useFormikContext } from 'formik';
import { IProvider } from '../../../../../../services/api/provider/dto/provider.dto';
import CardSection from '../card-section';
import UserImage from '../../../../../../common/components/user-image';

interface Props {
  loading?: boolean;
}

const ImageCard = ({ loading }: Props): ReactElement => {
  const { values, setFieldValue } = useFormikContext<IProvider>();

  return (
    <Card title="Photo" subtitle="This will be displayed on your profile.">
      <CardSection>
        <UserImage user={values} onChange={(file) => setFieldValue('details.image', file)} loading={loading} />
      </CardSection>
    </Card>
  );
};

export default ImageCard;
