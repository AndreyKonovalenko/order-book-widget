import Layout from './Layout';
import useDeviceDetect from '../hooks/useDeviceDetect';
const Widget = () => {
  const { isMobile, isLandscape, isMobileDevice } = useDeviceDetect();
  return (
    <Layout
      isMobile={isMobile}
      isLandscape={isLandscape}
      isMobileDevice={isMobileDevice}>
      hello world
    </Layout>
  );
};

export default Widget;
