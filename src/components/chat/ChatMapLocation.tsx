import { useLocation } from "hooks/useLocation";
import dynamic from "next/dynamic";

const MapContainer = dynamic(
  () => import("react-leaflet").then((res) => res.MapContainer),
  {
    ssr: false,
  }
);

const Marker = dynamic(
  () => import("react-leaflet").then((res) => res.Marker),
  {
    ssr: false,
  }
);

const Popup = dynamic(() => import("react-leaflet").then((res) => res.Popup), {
  ssr: false,
});

const TileLayer = dynamic(
  () => import("react-leaflet").then((res) => res.TileLayer),
  {
    ssr: false,
  }
);

import "leaflet/dist/leaflet.css";

export const ChatMapLocation = () => {
  const coords = useLocation((state) => state.coords);

  return (
    <div className="h-[200px] w-[200px]">
      <MapContainer
        center={{ lat: -14.235004, lng: -51.925282 }}
        zoom={13}
        scrollWheelZoom
        className="h-[200px]"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright%22%3EOpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[22, 12]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
