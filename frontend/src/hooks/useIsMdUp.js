import { useEffect, useState } from "react";

export function useIsMdUp() {
  const [isMdUp, setIsMdUp] = useState(
    typeof window !== "undefined"
      ? window.matchMedia("(min-width: 768px)").matches
      : false
  );

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const listener = () => setIsMdUp(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  return isMdUp;
}
