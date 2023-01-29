import useDeviceDetect from '../hooks/useDeviceDetect';
import Header from './orderbook/Header';
import Layout from './Layout';
import LastSell from './orderbook/dataTable/LastSell';
import ColumnContainer from './orderbook/dataTable/CoulmnContainer';
import DataTable from './orderbook/dataTable/DataTable';
import OrderBook from './orderbook/OrderBook';
import Line from './orderbook/dataTable/Line';

const Widget = () => {
  const { isMobile, isLandscape, isMobileDevice } = useDeviceDetect();

  const widget = (
    <Layout
      isMobile={isMobile}
      isLandscape={isLandscape}
      isMobileDevice={isMobileDevice}>
      <OrderBook isMobile={isMobile}>
        <Header />
        <DataTable>
          <ColumnContainer></ColumnContainer>
          <Line />
        </DataTable>
        <LastSell value={'21,256.13'} />
      </OrderBook>
    </Layout>
  );
  return widget;
};

export default Widget;
