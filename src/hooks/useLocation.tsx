import create from "zustand";

interface Coords {
  lng: number;
  lat: number;
}

interface Uselocation {
  coords: Coords;
  setCoords: (coods: Coords) => void;
}

export const useLocation = create<Uselocation>((set) => ({
  coords: {} as Coords,
  setCoords: (coords) => {
    set(() => ({ coords }));
  },
}));
