import { useState } from "react";

export const useOverlay = () => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const makeOverlayVisible = () => setIsOverlayVisible(true);
  const makeOverlayInvisible = () => setIsOverlayVisible(false);
  return { isOverlayVisible, makeOverlayVisible, makeOverlayInvisible };
};
