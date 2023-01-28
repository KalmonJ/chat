import { useEffect, useState } from "react";

export const useMediaQuery = (media: string) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleSize = () => {
      const match = window.matchMedia(media);
      setIsMobile(match.matches);
    };

    window.addEventListener("resize", handleSize);

    return () => window.removeEventListener("resize", handleSize);
  }, [media]);

  return isMobile;
};
