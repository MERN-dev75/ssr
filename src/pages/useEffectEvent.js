import React, { useEffect, useState, useCallback } from 'react';

export default function ExampleWithUseEffectEvent() {
  const [width, setWidth] = useState(0);
  const [width1, setWidth1] = useState(0);

  // Stable event handler using useEffectEvent
  const handleResize1 = useCallback(() => {
    setWidth1(window.innerWidth);
  },[]);

  // This useEffect uses the stable handler from useEffectEvent
  useEffect(() => {
    window.addEventListener('resize', handleResize1);

    return () => {
      window.removeEventListener('resize', handleResize1);
    };
  }, [handleResize1]); // handleResize1 is stable due to useEffectEvent

  useEffect(() => {
    // Initial setup for width
    setWidth(window.innerWidth);

    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    // Attach regular resize event
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures this runs once on mount

  return <div>Window width: {width} == {width1}</div>;
}
