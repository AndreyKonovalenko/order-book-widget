import React, { useState, useCallback, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useSelector, useDispatch } from 'react-redux';
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

import { getSnapshot } from '../fetures/orderBook/orderBookSlice';

const Widget = () => {
  const dispatch = useDispatch();
  const { snapshot } = useSelector((state) => state.orderBook);
  const { isMobile, isLandscape, isMobileDevice } = useDeviceDetect();
  const [lustSell, setLustSell] = useState(0);

  const socketUrl = 'wss://stream.binance.com:9443/ws/btcusdt@depth';

  // const depth = useWebSocket(socketUrl, {
  //   onOpen: () => console.log('opened'),
  //   onClose: () => console.log('WebSocket connection closed.'),
  //   shouldReconnect: (closeEvent) => true,
  //   onMessage: (event) => processMessages(event),
  // });

  const candlestickStream = useWebSocket(
    'wss://stream.binance.com:9443/ws/btcusdt@kline_1s',
    {
      onOpen: () => console.log('opened'),
      onClose: () => console.log('WebSocket connection closed.'),
      shouldReconnect: (closeEvent) => true,
      onMessage: (event) => processMessages(event),
    }
  );
  const processMessages = (event) => {
    const response = JSON.parse(event.data);
    if (response.e === 'kline') {
      setLustSell(response.k.c);
    }

    // if (response.numLevels) {
    //   dispatch(addExistingState(response));
    // } else {
    //   process(response);
    // }
  };

  // const process = (data) => {
  //   return data;
  // };
  // const socket = getWebSocket();

  useEffect(() => {
    console.log(snapshot);
    if (snapshot === null) {
      dispatch(getSnapshot());
    }
    // console.log(socket.bufferedAmount);
    // const subscribeMessage = {};
    // sendJsonMessage(subscribeMessage);
  }, [dispatch, snapshot]);

  const widget = (
    <Layout
      isMobile={isMobile}
      isLandscape={isLandscape}
      isMobileDevice={isMobileDevice}>
      <OrderBook isMobile={isMobile}>
        <Header />
        <DataTable>
          <ColumnContainer>
            <Column>
              <Item
                price={21241.65}
                amount={0.01072}
                isAsk={true}
                barLength={20}
              />
              <Item
                price={21241.65}
                amount={0.01072}
                isAsk={true}
                barLength={20}
              />
              <Item
                price={21241.65}
                amount={0.01072}
                isAsk={true}
                barLength={20}
              />
              <Item
                price={21241.65}
                amount={0.01072}
                isAsk={true}
                barLength={20}
              />
              <Item
                price={21241.65}
                amount={0.01072}
                isAsk={true}
                barLength={20}
              />
              <Item
                price={21241.65}
                amount={0.01072}
                isAsk={true}
                barLength={20}
              />
              <Item
                price={21241.65}
                amount={0.01072}
                isAsk={true}
                barLength={20}
              />
            </Column>
            <Column>
              <Item
                price={21241.65}
                amount={0.01072}
                isAsk={false}
                barLength={20}
              />
            </Column>
          </ColumnContainer>
          <Line />
        </DataTable>
        <LastSell value={lustSell} />
      </OrderBook>
    </Layout>
  );
  return widget;
};

export default Widget;
