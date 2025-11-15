import { Box, Grid, styled, Tooltip, Typography } from '@mui/material';
import React, { KeyboardEvent, ReactElement, useEffect, useState } from 'react';
import GoogleMap from '../../google-map';
import TextInput from '../../../ui/text-input';
import { NotesRounded } from '@mui/icons-material';
import { Coordinates } from '../../google-map/google-map';
import GoogleApi from '../../../../services/api/google';
import getGeoLocation from '../../../../helpers/get-geo-location';
import { ErrorWarning, LocationPrimary } from '../../../ui/icon-v2';
import { colors } from '../../../../config/theme/colors';
import { CreateAppointmentDto } from '../../../../services/api/appointment/dto/create-appointment.dto';
import { useAuthUser } from '../../../../hooks';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../../../store/selectors';

const AddressFieldContainer = styled(Box)(
  () => `
  display: flex;
  align-items: center;
  border-radius: 8px;
  box-shadow: 3px 2px 8px 0 rgba(0, 0, 0, 0.10),
              11px 8px 14px 0 rgba(0, 0, 0, 0.09),
              26px 17px 19px 0 rgba(0, 0, 0, 0.05),
              46px 31px 22px 0 rgba(0, 0, 0, 0.01),
              72px 48px 24px 0 rgba(0, 0, 0, 0.00);
  background: ${colors.background.BG_1};
  padding: 16px;
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

const Input = styled('input')(
  () => `
    border: none;
    width: 100%;
    font-size: 18px;
    font-weight: 400;
    line-height: 24px;
    
    &:focus {
      outline: none;
    }
`,
);

interface AddressFieldProps {
  address: string;
  onChange: (address: string) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement | HTMLDivElement>) => void;
  userLocationError: boolean;
}

const AddressField = ({ address, onChange, onKeyDown, userLocationError }: AddressFieldProps): ReactElement => {
  return (
    <Box sx={{ p: 3 }} position="absolute" zIndex={999} width="100%">
      <AddressFieldContainer>
        <LocationPrimary size={24} />
        <Box sx={{ ml: 1, width: '100%' }}>
          <Typography variant="subtitle2" color={colors.secondary[50]}>
            Your address
          </Typography>
          <Input value={address} onChange={(e) => onChange(e.target.value)} onKeyDown={onKeyDown} />
        </Box>
        {userLocationError && (
          <Tooltip
            title={
              <>
                <Typography variant="subtitle2" color={colors.background.BG_1}>
                  The map doesn’t work correctly because you have disabled access to geolocation. Grant access to your
                  geolocation in your browser settings.
                </Typography>
                <Link href="https://support.google.com/chrome/answer/142065?hl=en" rel="noreferrer" target="_blank">
                  Click here to see how
                </Link>
              </>
            }
          >
            <Box>
              <ErrorWarning sx={{ cursor: 'pointer' }} size={24} />
            </Box>
          </Tooltip>
        )}
      </AddressFieldContainer>
    </Box>
  );
};

interface Props {
  appointment: CreateAppointmentDto;
  setAppointment: (newAppointment: CreateAppointmentDto) => void;
}

const LocationSelector = ({ appointment, setAppointment }: Props): ReactElement => {
  const [coordinates, setCoordinates] = useState({ lat: appointment.latitude, lng: appointment.longitude });
  const [userLocationError, setUserLocationError] = useState<boolean>(false);
  const { authUser } = useSelector(selectAuth);

  const handleSetCoordinates = ({ lat, lng }: Coordinates) => {
    setCoordinates({ lat, lng });
    setAppointment({ ...appointment, latitude: lat, longitude: lng });
  };

  const setCoordinatesByAddress = async (address: string) => {
    try {
      const response = await GoogleApi.getCoordinatesByAddress(address);
      handleSetCoordinates(response?.results[0].geometry.location);
    } catch (e) {
      console.error(e);
    }
  };

  const setAddressByCoordinates = async (coordinates: Coordinates) => {
    try {
      const location = await GoogleApi.getAddressByCoordinates(coordinates.lat, coordinates.lng);
      setAppointment({
        ...appointment,
        address: location.results[0].formatted_address,
        latitude: coordinates.lat,
        longitude: coordinates.lng,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handlePositionSelect = (coordinates: Coordinates) => {
    handleSetCoordinates(coordinates);
    setAddressByCoordinates(coordinates).then();
  };
  const handleAddressChange = (address: string) => {
    setAppointment({
      ...appointment,
      address,
      latitude: coordinates.lat,
      longitude: coordinates.lng,
    });
  };

  const handleAddressApply = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement | HTMLDivElement>) => {
    if (e.code === 'Enter') {
      setCoordinatesByAddress(appointment.address).then();
    }
  };

  useEffect(() => {
    (async () => {
      if (authUser?.details?.latitude && authUser?.details?.longitude) {
        const userCoordinates = {
          lat: authUser.details.latitude,
          lng: authUser.details.longitude,
        };

        handleSetCoordinates(userCoordinates);
        await setAddressByCoordinates(userCoordinates);
      } else if (!appointment.address.length) {
        try {
          const userLocation = await getGeoLocation();
          handleSetCoordinates(userLocation);
          await setAddressByCoordinates(userLocation);
        } catch (e) {
          setUserLocationError(true);
        }
      } else {
        await setCoordinatesByAddress(appointment.address);
      }
    })();
  }, [authUser]);

  return (
    <Grid sx={{ mb: 3 }} container>
      <Grid sx={{ mt: 3 }} position="relative" item xs={12}>
        <AddressField
          address={appointment.address}
          onChange={handleAddressChange}
          onKeyDown={handleAddressApply}
          userLocationError={userLocationError}
        />
        <GoogleMap
          selectedPosition={coordinates}
          onPositionSelect={handlePositionSelect}
          zoom={11}
          ContainerProps={{
            sx: {
              width: '100%',
              height: 500,
              borderRadius: 2,
            },
          }}
          withFullMode={false}
        />
      </Grid>
      <Grid sx={{ mt: 3 }} item xs={12}>
        <TextInput
          sx={{ pt: 3, pl: 6 }}
          type="textarea"
          value={appointment.address_description}
          onChange={(e) => setAppointment({ ...appointment, address_description: e.target.value })}
          placeholder="Let us know any special instructions for parking? Do you have stairs? Do you have pets?"
          startIcon={<NotesRounded sx={{ mt: 2 }} color="primary" />}
        />
      </Grid>
    </Grid>
  );
};

export default LocationSelector;
