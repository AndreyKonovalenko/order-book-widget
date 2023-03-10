import React, { useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import { useSelector, useDispatch } from 'react-redux';
import useDeviceDetect from '../hooks/useDeviceDetect';
import Header from './orderbook/Header';
import Layout from './Layout';
import LastSell from './orderbook/dataTable/LastSell';
import ColumnContainer from './orderbook/dataTable/ColumnContainer';
import DataTable from './orderbook/dataTable/DataTable';
import OrderBook from './orderbook/OrderBook';
import Line from './orderbook/dataTable/Line';
import {
  getSnapshot,
  updateSnapshot,
} from '../fetures/orderBook/orderBookSlice';
import {
  addToBuffer,
  setFinalUpdateIDinEvent,
  clearBuffer,
} from '../fetures/buffer/bufferSlice';
import { setClosePrice } from '../fetures/closePrice/closePriceSlice';

const MomoizedColumnContainer = React.memo(ColumnContainer);
//this is my implementation of managing data in local order book from Binance  exchange via websocket stream
//according 9 Steps of Binance documentation "How to manage a local order book correctly
// https://binance-docs.github.io/apidocs/spot/en/#diff-depth-stream

// step 1: Open a stream to wss://stream.binance.com:9443/ws/bnbbtc@depth.
// I use combined stream via /stream?streams instead of single raw stream /ws/bnbbtc@depth
// this is due to the need to listen to the kline_1s stream for displaing Last Sell price
// the close price from kline_1s data stream is taken for the Last Sell pirce to be displayed
const endpoint = 'wss://stream.binance.com:9443/stream?streams=';

// step 2: Buffer the events you receive from the stream.
// the buffering, is done by the browser

const Widget = () => {
  const dispatch = useDispatch();
  const { isMobile, isLandscape, isMobileDevice } = useDeviceDetect();
  const { bids, asks, isLoading, lastUpdateId } = useSelector(
    (state) => state.orderBook
  );
  const { buffer, u } = useSelector((state) => state.buffer);
  const { closePrice } = useSelector((state) => state.closePrice);
  const { sendJsonMessage, getWebSocket, readyState } = useWebSocket(endpoint, {
    onOpen: () => console.log('WebSocket connection opened'),
    onClose: () => console.log('WebSocket connection closed.'),
    shouldReconnect: (closeEvent) => true,
    onMessage: (event) => processMessages(event),
  });

  const processMessages = (event) => {
    const response = JSON.parse(event.data);
    if (response.stream === 'btcusdt@kline_1s') {
      dispatch(setClosePrice(response.data.k.c));
    }
    if (response.stream === 'btcusdt@depth') {
      dispatch(setFinalUpdateIDinEvent(response.data));
      if (lastUpdateId === 0) {
        // step 2: Buffer events you recieve from the stream.
        // Buffer evenst durearing snapshot loading
        dispatch(addToBuffer(response.data));
      }
      // step 3: Get a depth snapshot from https://api.binance.com/api/v3/depth?symbol=BNBBTC&limit=1000
      if (lastUpdateId === 0 && isLoading === false) {
        dispatch(getSnapshot());
      }

      if (lastUpdateId > 0) {
        // snyc cnapshot with unprocessed events
        if (buffer.length > 0) {
          proccessBuffer(buffer, lastUpdateId);
          dispatch(clearBuffer());
        }
        // step 4: Drop any event where u is <= lastUpdateId in the snapshot.
        if (response.data.u > lastUpdateId) {
          proccessUpdate(response.data);
        }
      }
      // step 6: While listening to the stream, each new event's U should be equal to the previous event's u+1.
      if (u) {
        if (response.data.U === u + 1) {
          //   console.log('updates is sync');
        } else {
          console.log('updates out of sync');
          //reset buffer state and order book state
        }
      }
    }
  };

  const proccessBuffer = (buffer, lastUpdateId) => {
    // console.log('process buffer');
    let newLastUpdateId = lastUpdateId;
    // step 5: The first processed event should have U <= lastUpdateId+1 AND u >= lastUpdateId+1.
    for (const event of buffer) {
      if (event.u >= newLastUpdateId + 1 && event.U <= newLastUpdateId + 1) {
        dispatch(updateSnapshot(event));
        newLastUpdateId = event.u;
      }
    }
  };

  const proccessUpdate = (update) => {
    dispatch(updateSnapshot(update));
    //console.log('update processed');
  };

  useEffect(() => {
    //console.log('mount');
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
    // return () => console.log('unmount');
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
          <MomoizedColumnContainer bids={bids} asks={asks} />
          <Line />
        </DataTable>
        <LastSell value={closePrice} />
      </OrderBook>
    </Layout>
  );
  return widget;
};

export default Widget;
