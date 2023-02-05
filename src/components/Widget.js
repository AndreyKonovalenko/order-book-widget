import React, { useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import { useSelector, useDispatch } from 'react-redux';
import uniqid from 'uniqid';
import useDeviceDetect from '../hooks/useDeviceDetect';
import Header from './orderbook/Header';
import Layout from './Layout';
import LastSell from './orderbook/dataTable/LastSell';
import ColumnContainer from './orderbook/dataTable/ColumnContainer';
import Column from './orderbook/dataTable/Column';
import DataTable from './orderbook/dataTable/DataTable';
import OrderBook from './orderbook/OrderBook';
import Line from './orderbook/dataTable/Line';
import Item from './orderbook/dataTable/Item';

import { getSnapshot } from '../fetures/orderbook/orderbookSlice';
import { setClosePrice } from '../fetures/closePrice/closePriceSlice';
import { formatToCurrency, findMax } from '../utils/utils';

const endpoint = 'wss://stream.binance.com:9443/stream?streams=';

const Widget = () => {
  const dispatch = useDispatch();
  const options = {
    onOpen: () => console.log('opened'),
    onClose: () => console.log('WebSocket connection closed.'),
    shouldReconnect: (closeEvent) => true,
    onMessage: (event) => processMessages(event),
  };
  const { isMobile, isLandscape, isMobileDevice } = useDeviceDetect();
  const { bids, asks, isLoading, lastUpdateId } = useSelector(
    (state) => state.orderbook
  );
  const { closePrice } = useSelector((state) => state.closePrice);
  const { sendJsonMessage, getWebSocket, readyState } = useWebSocket(
    endpoint,
    options
  );

  const processMessages = (event) => {
    const response = JSON.parse(event.data);
    if (response.stream === 'btcusdt@kline_1s') {
      dispatch(setClosePrice(response.data.k.c));
    }
  };

  const columnConstructor = (arr, type) => {
    const slicedArr = arr.slice(0, 7);
    return slicedArr.map((element) => {
      const price = parseFloat(element[0]);
      const amount = parseFloat(element[1]);
      const max = findMax(slicedArr);
      const barLength = (amount / max) * 100;
      return (
        <Item
          key={uniqid()}
          price={formatToCurrency(price)}
          amount={amount.toFixed(5)}
          isAsk={type}
          barLength={barLength < 1 ? 1 : barLength}
        />
      );
    });
  };

  const bidsTable = bids !== null ? columnConstructor(bids, false) : null;
  const asksTable = asks !== null ? columnConstructor(asks, true) : null;

  useEffect(() => {
    const connect = () => {
      const subscribeMessage = {
        method: 'SUBSCRIBE',
        params: ['btcusdt@depth', 'btcusdt@kline_1s'],
        id: 1,
      };
      sendJsonMessage(subscribeMessage);
    };
    if (getWebSocket() !== null) {
      if (readyState !== 0) {
        connect();
      }
    }
    if (lastUpdateId === 0 && isLoading === false) {
      dispatch(getSnapshot());
      //need to handle ERR_CONNECTION_TIMED_OUT
    }
  }, [
    dispatch,
    sendJsonMessage,
    getWebSocket,
    readyState,
    isLoading,
    lastUpdateId,
  ]);

  const widget = (
    <Layout
      isMobile={isMobile}
      isLandscape={isLandscape}
      isMobileDevice={isMobileDevice}>
      <OrderBook isMobile={isMobile}>
        <Header />
        <DataTable>
          <ColumnContainer>
            <Column>{bidsTable}</Column>
            <Column>{asksTable}</Column>
          </ColumnContainer>
          <Line />
        </DataTable>
        <LastSell value={closePrice} />
      </OrderBook>
    </Layout>
  );
  return widget;
};

export default Widget;
