import { useState, useEffect } from "react";
import debounce from "lodash.debounce";

export const useViewportWidth = () => {
  const [vw, setVw] = useState(window.innerWidth);

  const viewportWidth = () => setVw(window.innerWidth);
  const debouncedViewportWidth = debounce(viewportWidth, 200);

  useEffect(() => {
    window.addEventListener("resize", debouncedViewportWidth);
    return () => window.removeEventListener("resize", debouncedViewportWidth);
  }, []);

  return vw;
};
