import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Map = ({ lat, lng, markerText }) => {
  const mapStyles = {
    height: "100%",
    width: "100%"
  };
  
  const defaultCenter = {
    lat: lat,
    lng: lng 
  };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={15}
        center={defaultCenter}
      >
        <Marker 
          position={defaultCenter}
          title={markerText}
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;