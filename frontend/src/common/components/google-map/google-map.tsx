import { Wrapper } from '@googlemaps/react-wrapper';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { BoxProps } from '@mui/material/Box/Box';

const DEFAULT_CENTER = { lat: -24.370286, lng: 133.874289 };
const DEFAULT_ZOOM = 4;
declare const google: any;

let marker: google.maps.Marker | null = null;
let circle: google.maps.Circle | null = null;

interface GoogleMapsWrapperProps {
  children: ReactNode;
}

export const GoogleMapsWrapper = ({ children }: GoogleMapsWrapperProps) => {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_KEY;

  if (!apiKey) {
    return <div />;
  }

  return <Wrapper apiKey={apiKey}>{children}</Wrapper>;
};

export type Coordinates = { lat: number; lng: number };

interface Props {
  ContainerProps: BoxProps;
  selectedPosition: Coordinates;
  selectedRadius?: number;
  zoom?: number;
  onPositionSelect: (position: Coordinates) => void;
  withFullMode?: boolean;
}

const GoogleMap = ({
  ContainerProps,
  selectedPosition,
  selectedRadius,
  zoom,
  onPositionSelect,
  withFullMode = true,
}: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);

  const initMap = () => {
    setTimeout(() => {
      if (ref.current && google) {
        setMapInstance(
          new google.maps.Map(ref.current, {
            center: selectedPosition || DEFAULT_CENTER,
            zoom: zoom || DEFAULT_ZOOM,
            zoomControl: false,
            scaleControl: false,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: withFullMode,
          }),
        );
      } else {
        initMap();
      }
    }, 400);
  };

  const changeMarker = (position: Coordinates, center = true) => {
    if (mapInstance) {
      if (marker) {
        marker.setPosition(position);
      } else {
        marker = new google.maps.Marker({
          position,
          map: mapInstance,
          title: 'Selected location',
          icon: '/img/map-marker.svg',
        });
      }
      if (center) {
        mapInstance.panTo(position);
        changeCircle(position);
      }
    }
  };

  const changeCircle = (position: Coordinates) => {
    if (selectedRadius && mapInstance) {
      if (circle) {
        circle.setRadius(selectedRadius);
        circle.setCenter(position);
      } else {
        circle = new google.maps.Circle({
          strokeOpacity: 0.2,
          strokeWeight: 0,
          fillColor: '#088CEF',
          fillOpacity: 0.35,
          map: mapInstance,
          center: position,
          radius: selectedRadius,
        });
      }
    }
  };

  useEffect(() => {
    if (mapInstance) {
      mapInstance.addListener('click', (event: google.maps.MouseEvent) => {
        if (event.latLng) {
          const position = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
          };

          changeMarker(position, false);
          changeCircle(position);

          onPositionSelect(position);
        }
      });
    }
  }, [mapInstance]);

  const setSelectedPosition = () => {
    if (mapInstance) {
      changeMarker(selectedPosition);
    }
  };

  useEffect(() => {
    setSelectedPosition();
  }, [selectedPosition, mapInstance]);

  useEffect(() => {
    changeCircle(selectedPosition);
  }, [selectedRadius, mapInstance]);

  useEffect(() => {
    initMap();
  }, [ref]);

  useEffect(() => {
    return () => {
      marker = null;
      circle = null;
    };
  }, []);

  return (
    <GoogleMapsWrapper>
      <Box {...ContainerProps} ref={ref} />
    </GoogleMapsWrapper>
  );
};

export default GoogleMap;
