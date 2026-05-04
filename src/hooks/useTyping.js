import { useEffect, useRef, useState } from "react";

export function useTyping(target, { enabled = true, deleteSpeed = 15, typeSpeed = 20 } = {}) {
  const [displayed, setDisplayed] = useState("");
  const previousRef = useRef("");

  useEffect(() => {
    if (!enabled || !target) {
      setDisplayed(target || "");
      return;
    }

    const prevTarget = previousRef.current;
    let common = 0;

    while (
      common < prevTarget.length &&
      common < target.length &&
      prevTarget[common] === target[common]
    ) {
      common += 1;
    }

    previousRef.current = target;

    const typeForward = (startIndex) => {
      let index = startIndex;
      const interval = setInterval(() => {
        index += 1;
        setDisplayed(target.slice(0, index));
        if (index >= target.length) {
          clearInterval(interval);
        }
      }, typeSpeed);
      return () => clearInterval(interval);
    };

    if (prevTarget.length > common) {
      let index = prevTarget.length;
      const interval = setInterval(() => {
        index -= 1;
        setDisplayed(prevTarget.slice(0, index));
        if (index <= common) {
          clearInterval(interval);
          typeForward(index);
        }
      }, deleteSpeed);
      return () => clearInterval(interval);
    }

    setDisplayed(target.slice(0, common));
    return typeForward(common);
  }, [target, enabled, deleteSpeed, typeSpeed]);

  return displayed;
}