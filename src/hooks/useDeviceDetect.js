import { useState, useEffect } from 'react';

const getIsMobile = () => window.innerWidth <= 600;
const getIsRetina = () => window.matchMedia('(min-resolution: 2dppx)').matches;
const getIsMobileLandscape = () => window.innerHeight <= 400;
const checkDevice = () => {
  const userAgent =
    typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
  const mobile = Boolean(
    userAgent.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )
  );
  return mobile;
};
const useDeviceDetect = () => {
  const [isMobile, setIsMobile] = useState(getIsMobile());
  const [isRetina, setIsRetina] = useState(getIsRetina());
  const [isLandscape, setIsLandscape] = useState(getIsMobileLandscape());
  const [isMobileDevice, setIsMobileDevice] = useState(checkDevice());

  useEffect(() => {
    //  console.log("hook activated");
    const onResize = () => {
      setIsMobile(getIsMobile());
      setIsRetina(getIsRetina());
      setIsLandscape(getIsMobileLandscape());
      setIsMobileDevice(checkDevice());
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return { isMobile, isRetina, isLandscape, isMobileDevice };
};
export default useDeviceDetect;
