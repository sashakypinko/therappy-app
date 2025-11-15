import { ReactElement, useEffect, useState } from 'react';
import { Box, FormControl, FormControlLabel, Grid, Radio, RadioGroup, styled, Typography } from '@mui/material';
import AuthMessagePage from '../../ui/auth-message-page';
import { colors } from '../../../../../config/theme/colors';
import { useAuthUser } from '../../../../../hooks';
import { UserApi } from '../../../../../services/api/user';
import dayjs from 'dayjs';
import { ProviderApi } from '../../../../../services/api/provider';
import Modal from '../../../../../common/ui/modal';
import Button from '../../../../../common/ui/button';
import { IDiscoverQuestions } from '../../../../../services/api/user/dto/discover-questions.dto';
import useSnackbar from '../../../../../hooks/use-snackbar.hook';
import { AuthStorage } from '../../../../../services/storage/auth.storage';
import { UserStatusesEnum } from '../../../../../enums/user-statuses.enum';
import { ProviderRouteEnum } from '../../../routes/enums/route.enum';
import { DiscoverQuestionRequestDto } from '../../../../../services/api/user/dto/discover-question-request.dto';
import { logout } from '../../../../../store/actions/auth';
import { useDispatch } from 'react-redux';

const Title = styled(Typography)(
  ({ theme }) => `
    text-align: center;
    font-size: 35px;
    font-weight: 600;
    line-height: 41px;
    
    @media (max-width: ${theme.breakpoints.values.md}px) {
        font-size: 28px;
    }
`,
);

const Input = styled('input')(
  () => `
    border: none;
    border-bottom: 1px solid ${colors.secondary[40]};
`,
);

const ClickableText = styled('span')(
  () => `
    cursor: pointer;
    color: ${colors.primary[70]};
`,
);

interface ContentProps {
  onLogout: () => void;
}

const PendingStatusContent = ({ onLogout }: ContentProps) => {
  const user = useAuthUser();

  return (
    <AuthMessagePage
      title="Congratulations! Your application is under review"
      additionalInfo={`Submission time: ${dayjs(user?.created_at).format('DD MMMM YYYY, H:ma')}`}
      description={
        <Box textAlign="start">
          <Typography sx={{ mt: 2 }} fontSize={16}>
            Approximately it takes up to 2 working days. Once review is done, we’ll notify you about results to&nbsp;
            <ClickableText>{user?.email}</ClickableText>
          </Typography>
          <Typography sx={{ mt: 2 }} fontSize={16}>
            Forgot to submit something? <ClickableText onClick={onLogout}>Click here to get back</ClickableText> to the
            Sign up form
          </Typography>
        </Box>
      }
    />
  );
};

const DeclinedStatusContent = ({ onLogout }: ContentProps) => {
  const user = useAuthUser();

  return (
    <AuthMessagePage
      image="/img/declined-account.svg"
      title="Your request has been rejected"
      description={
        <Box textAlign="start">
          <Typography sx={{ mt: 2 }} fontSize={16}>
            Go to your email &nbsp;
            <ClickableText>{user?.email}</ClickableText>
            &nbsp; and receive further recommendations
          </Typography>
          <Typography sx={{ mt: 2 }} fontSize={16}>
            Forgot to submit something? <ClickableText onClick={onLogout}>Click here to get back</ClickableText> to the
            Sign up form
          </Typography>
        </Box>
      }
    />
  );
};

const AccountVerification = (): ReactElement => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [discoverAnswerData, setDiscoverAnswerData] = useState<DiscoverQuestionRequestDto>({
    answer: null,
    text: '',
  });
  const [discoverQuestions, setDiscoverQuestions] = useState<IDiscoverQuestions>({
    questions: [],
    answer: null,
  });
  const user = useAuthUser();
  const { successSnackbar, errorSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const getDiscoverQuestions = async () => {
    try {
      const newDiscoverQuestions = await UserApi.getDiscoverQuestions();
      setDiscoverQuestions(newDiscoverQuestions);
      if (!newDiscoverQuestions.answer) {
        setOpen(true);
      }
    } catch (e) {
      console.error('Error while getting discover questions');
    }
  };

  const answerDiscoverQuestions = async () => {
    if (discoverAnswerData.answer !== null) {
      setLoading(true);
      try {
        await UserApi.answerDiscoverQuestions(discoverAnswerData);
        setOpen(false);
        successSnackbar('Your answer sent successfully');
      } catch (e) {
        errorSnackbar('Error while sending your answer!');
      } finally {
        setLoading(false);
      }
    }
  };

  const checkIfUserVerified = async () => {
    if (user?.id) {
      try {
        const newUser = await ProviderApi.getById(user.id || 0);

        if (newUser.status === UserStatusesEnum.APPROVED) {
          AuthStorage.storeUser({
            ...newUser,
            withoutSidebar: true,
            redirect: ProviderRouteEnum.SETUP_ACCOUNT,
          });
          window.location.reload();
        } else {
          AuthStorage.storeUser({
            ...AuthStorage.getUser(),
            status: newUser.status,
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const checkVerifiedInterval = setInterval(() => {
      checkIfUserVerified().then();
    }, 15000);

    return () => {
      clearInterval(checkVerifiedInterval);
    };
  }, [user]);

  useEffect(() => {
    getDiscoverQuestions().then();
  }, []);

  return (
    <>
      {user?.status === UserStatusesEnum.DECLINED ? (
        <DeclinedStatusContent onLogout={handleLogout} />
      ) : (
        <PendingStatusContent onLogout={handleLogout} />
      )}
      <Modal open={open} onClose={() => setOpen(false)} maxWidth="xs">
        <Grid container>
          <Grid item md={12}>
            <Title>How did you discover Therappy?</Title>
          </Grid>
          <Grid sx={{ mt: 4, mb: 4 }} item md={12}>
            <FormControl>
              <RadioGroup
                value={discoverAnswerData.answer}
                onChange={(e) =>
                  setDiscoverAnswerData({
                    ...discoverAnswerData,
                    answer: parseInt(e.target.value),
                  })
                }
              >
                {discoverQuestions.questions.map((label, index) =>
                  label === 'Other' ? (
                    <Box key={index}>
                      <FormControlLabel value={index} control={<Radio />} label="Other" />
                      <Input
                        value={discoverAnswerData.text}
                        onChange={(e) =>
                          setDiscoverAnswerData({
                            ...discoverAnswerData,
                            text: e.target.value,
                          })
                        }
                        disabled={discoverAnswerData.answer !== index}
                      />
                    </Box>
                  ) : (
                    <FormControlLabel key={index} value={index} control={<Radio />} label={label} />
                  ),
                )}
              </RadioGroup>
            </FormControl>
          </Grid>
          <Button
            variant="contained"
            onClick={answerDiscoverQuestions}
            loading={loading}
            disabled={loading || discoverAnswerData.answer === null}
            fullWidth
          >
            Submit
          </Button>
        </Grid>
      </Modal>
    </>
  );
};

export default AccountVerification;

