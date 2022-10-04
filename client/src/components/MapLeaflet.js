import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MapLeaflet = ({ ...locations }) => {
  var greenIcon = L.icon({
    iconUrl: '../images/pin.png',
    iconSize: [32, 40], // size of the icon
    iconAnchor: [16, 40], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -50], // point from which the popup should open relative to the iconAnchor
  });

  const points = [];
  const location = [];
  Object.values(locations).forEach(loc => {
    // Create points
    location.push(loc);
    points.push([loc.coordinates[1], loc.coordinates[0]]);
  });
  console.log(location);

  return (
    <MapContainer id='map' center={points[1]} zoom={7} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {location.map(loc => {
        return (
          <Marker position={[loc.coordinates[1], loc.coordinates[0]]} icon={greenIcon}>
            <Popup>{`Day ${loc.day}: ${loc.description}`}</Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapLeaflet;
