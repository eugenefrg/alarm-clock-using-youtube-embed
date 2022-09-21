import React, { useState, useEffect, useRef } from "react";

/**
 * I currently do not fully understand this code. I copypasta from:
 * https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 */

function useInterval(callback: unknown, delay: unknown) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    // @ts-ignore
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      // @ts-ignore
      savedCallback.current();
    }
    if (delay !== null) {
      // @ts-ignore
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default useInterval;
