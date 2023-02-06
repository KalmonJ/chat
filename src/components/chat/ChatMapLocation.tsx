import { Marker, Popup, TileLayer, MapContainer } from "react-leaflet";
import { Message } from "hooks/useMessages";
import { icon } from "leaflet";
import "leaflet/dist/leaflet.css";

export const ChatMapLocation = ({ location }: Pick<Message, "location">) => {
  return (
    <div className="h-[200px] w-[200px]">
      <MapContainer
        center={{ lat: location?.lat as number, lng: location?.lng as number }}
        zoom={13}
        scrollWheelZoom
        className="h-[200px]"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright%22%3EOpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          icon={icon({
            iconUrl: "https://img.icons8.com/color/256/map-pin.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          })}
          position={[location?.lat as number, location?.lng as number]}
          draggable={false}
        >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
