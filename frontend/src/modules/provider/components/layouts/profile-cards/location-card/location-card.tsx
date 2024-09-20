import React, { ReactElement, useEffect, useState, KeyboardEvent } from 'react';
import Card from '../card';
import GoogleMap from '../../../../../../common/components/google-map';
import getGeoLocation from '../../../../../../helpers/get-geo-location';
import GoogleApi from '../../../../../../services/api/google';
import { Coordinates } from '../../../../../../common/components/google-map/google-map';
import { TextField } from '../../../../../../common/ui/text-field';
import { useFormikContext } from 'formik';
import { IProvider } from '../../../../../../services/api/provider/dto/provider.dto';
import { Compass } from '../../../../../../common/ui/icon';
import { Box, Skeleton, Slider, styled, Typography } from '@mui/material';
import { colors } from '../../../../../../config/theme/colors';
import CardSection from '../card-section';
import { ErrorWarning } from '../../../../../../common/ui/icon-v2';

const StyledSlider = styled(Slider)({
  color: colors.primary[60],
  height: 6,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-rail': {
    opacity: 0.5,
    backgroundColor: '#bfbfbf',
  },
  '& .MuiSlider-thumb': {
    height: 18,
    width: 18,
    backgroundColor: colors.background.BG_1,
    boxShadow: '0 0 3px 0 rgb(0 0 0 / 33%)',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'primary',
    },
  },
});

const LocationErrorMessage = styled(Box)(
  () => `
    position: absolute;
    width: 240px;
    height: min-content;
    padding: 12px;
    border-radius: 8px;
    background: #1D1D23;
    box-shadow: 0px 7px 15px 0px rgba(0, 0, 0, 0.10), 
                0px 26px 26px 0px rgba(0, 0, 0, 0.09),
                0px 59px 36px 0px rgba(0, 0, 0, 0.05), 
                0px 106px 42px 0px rgba(0, 0, 0, 0.01), 
                0px 165px 46px 0px rgba(0, 0, 0, 0.00);
    backdrop-filter: blur(7.5px);
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
`,
);

const Link = styled('a')(
  () => `
    color: ${colors.primary[60]};
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
`,
);

interface Props {
  loading?: boolean;
}

const LocationCard = ({ loading }: Props): ReactElement => {
  const { values, setFieldValue } = useFormikContext<IProvider>();
  const [userLocationError, setUserLocationError] = useState<boolean>(false);

  const setCoordinatesToForm = (coordinates: Coordinates) => {
    setFieldValue('details.latitude', coordinates.lat);
    setFieldValue('details.longitude', coordinates.lng);
  };

  const setAddressByCoordinates = async (coordinates: Coordinates) => {
    try {
      const location = await GoogleApi.getAddressByCoordinates(coordinates.lat, coordinates.lng);
      setFieldValue('details.address', location.results[0].formatted_address);
    } catch (e) {
      console.error(e);
    }
  };

  const setCoordinatesByAddress = async (address: string) => {
    try {
      const response = await GoogleApi.getCoordinatesByAddress(address);
      setCoordinatesToForm(response?.results[0].geometry.location);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    (async () => {
      if (!values.details.address.length && !loading) {
        try {
          const userLocation = await getGeoLocation();
          setCoordinatesToForm(userLocation);
          await setAddressByCoordinates(userLocation);
        } catch (e) {
          setUserLocationError(true);
        }
      }
    })();
  }, [loading]);

  const handlePositionSelect = (coordinates: Coordinates) => {
    setCoordinatesToForm(coordinates);
    setAddressByCoordinates(coordinates).then();
  };

  const handleRadiusChange = (e: Event, newRadius: number | number[]) => {
    if (typeof newRadius === 'number') {
      setFieldValue('details.radius', newRadius);
    }
  };

  const handlePressEnter = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement | HTMLDivElement>) => {
    if (e.code === 'Enter') {
      setCoordinatesByAddress(values.details.address);
    }
  };

  return (
    <Card icon={userLocationError ? <ErrorWarning sx={{ mr: 1 }} size={24} /> : undefined} title="Location">
      <CardSection>
        <Typography sx={{ mt: 1, mb: 2 }} fontSize={14} color={colors.secondary[50]}>
          Set the range in km
        </Typography>
        {loading ? (
          <Skeleton sx={{ borderRadius: 2, mt: 2 }} variant="rectangular" width="100%" height={400} />
        ) : (
          <GoogleMap
            selectedPosition={{ lat: values.details.latitude, lng: values.details.longitude }}
            selectedRadius={values.details.radius}
            onPositionSelect={handlePositionSelect}
            zoom={11}
            ContainerProps={{
              sx: {
                width: '100%',
                height: 400,
                borderRadius: 2,
              },
            }}
          />
        )}
        {userLocationError && (
          <LocationErrorMessage>
            <Typography variant="subtitle2" color={colors.background.BG_1}>
              The map doesn’t work correctly because you have disabled access to geolocation. Grant access to your
              geolocation in your browser settings.
            </Typography>
            <Link href="https://support.google.com/chrome/answer/142065?hl=en" rel="noreferrer" target="_blank">
              Click here to see how
            </Link>
          </LocationErrorMessage>
        )}
        <StyledSlider
          sx={{ mt: 2 }}
          value={values.details.radius}
          min={1000}
          max={50000}
          step={100}
          onChange={handleRadiusChange}
          valueLabelDisplay="on"
          valueLabelFormat={(value) => `${value / 1000} KM`}
          disabled={loading}
        />
        <Typography fontSize={14} color={colors.secondary[50]}>
          Enter your address in case if the client isn’t at home.
        </Typography>
        <TextField
          sx={{ mt: 1 }}
          name="details.address"
          startIcon={<Compass size={16} />}
          onKeyDown={handlePressEnter}
          loading={loading}
          fullWidth
        />
      </CardSection>
    </Card>
  );
};

export default LocationCard;
