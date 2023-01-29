import Layout from './Layout';
import OrderBook from './orderbook/OrderBook';
import useDeviceDetect from '../hooks/useDeviceDetect';
const Widget = () => {
  const { isMobile, isLandscape, isMobileDevice } = useDeviceDetect();

  const widget = (
    <Layout
      isMobile={isMobile}
      isLandscape={isLandscape}
      isMobileDevice={isMobileDevice}>
      <OrderBook isMobile={isMobile}></OrderBook>
    </Layout>
  );
  return widget;
};

export default Widget;
