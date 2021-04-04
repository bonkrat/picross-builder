import { useEffect, useState } from "react";

export default function useMouseDown(
  onMouseDown = () => {},
  onMouseUp = () => {}
) {
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    document.body.onmousedown = function (e) {
      setIsMouseDown(true);
      onMouseDown();
    };

    document.body.onmouseleave = function () {
      setIsMouseDown(false);
    };

    document.body.onmouseup = function () {
      setIsMouseDown(false);
      onMouseUp();
    };
  });

  return { isMouseDown };
}
