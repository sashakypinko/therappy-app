import { FC, ReactElement } from 'react';
import { PasswordRecoveryProps, RecoveryStepProps } from '../pasword-recovery';
import AuthImageSlider from '../../auth-image-slider';
import { useNavigate } from 'react-router-dom';
import AuthPage from '../../auth-page';
import Button from '../../../../ui/button';

const Done: FC<RecoveryStepProps & PasswordRecoveryProps> = ({
  signInLink,
  imageSrc,
}: PasswordRecoveryProps & RecoveryStepProps): ReactElement => {
  const navigate = useNavigate();

  return (
    <AuthPage
      title="All done!"
      description="Your password has been reset so now you can log in to your account"
      image={imageSrc}
      imageSlider={<AuthImageSlider />}
      paddingTop={30}
    >
      <Button sx={{ mt: 4 }} onClick={() => navigate(signInLink)} fullWidth variant="contained">
        Log in
      </Button>
    </AuthPage>
  );
};

export default Done;
