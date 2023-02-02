import React, { useState, useCallback, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useSelector, useDispatch } from "react-redux";
import uniqid from "uniqid";
import useDeviceDetect from "../hooks/useDeviceDetect";
import Header from "./orderbook/Header";
import Layout from "./Layout";
import LastSell from "./orderbook/dataTable/LastSell";
import ColumnContainer from "./orderbook/dataTable/ColumnContainer";
import Column from "./orderbook/dataTable/Column";
import DataTable from "./orderbook/dataTable/DataTable";
import OrderBook from "./orderbook/OrderBook";
import Line from "./orderbook/dataTable/Line";
import Item from "./orderbook/dataTable/Item";

import { getSnapshot } from "../fetures/orderBook/orderBookSlice";

const Widget = () => {
  const dispatch = useDispatch();
  const { snapshot } = useSelector((state) => state.orderBook);
  const { isMobile, isLandscape, isMobileDevice } = useDeviceDetect();
  const [lustSell, setLustSell] = useState(0);

  const socketUrl = "wss://stream.binance.com:9443/ws/btcusdt@depth";

  // const depth = useWebSocket(socketUrl, {
  //   onOpen: () => console.log('opened'),
  //   onClose: () => console.log('WebSocket connection closed.'),
  //   shouldReconnect: (closeEvent) => true,
  //   onMessage: (event) => processMessages(event),
  // });

  const candlestickStream = useWebSocket(
    "wss://stream.binance.com:9443/ws/btcusdt@kline_1s",
    {
      onOpen: () => console.log("opened"),
      onClose: () => console.log("WebSocket connection closed."),
      shouldReconnect: (closeEvent) => true,
      onMessage: (event) => processMessages(event),
    }
  );
  const processMessages = (event) => {
    const response = JSON.parse(event.data);
    if (response.e === "kline") {
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

  const findMax = (arr) => {
    const amountArr = arr.map((element) => parseFloat(element[1]));
    return Math.max(...amountArr);
  };

  const bids = snapshot !== null ? snapshot.bids.slice(0, 7) : null;
  const bidsTable =
    bids !== null
      ? bids.map((element) => {
          const price = parseFloat(element[0]).toFixed(2);
          const amount = parseFloat(element[1]).toFixed(5);
          const max = findMax(bids);
          const barLength = (amount / max) * 100;
          return (
            <Item
              key={uniqid()}
              price={price}
              amount={amount}
              isAsk={false}
              barLength={barLength < 1 ? 1 : barLength}
            />
          );
        })
      : null;

  const asks = snapshot !== null ? snapshot.asks.slice(0, 7) : null;
  const asksTable =
    asks !== null
      ? asks.map((element) => {
          const price = parseFloat(element[0]).toFixed(2);
          const amount = parseFloat(element[1]).toFixed(5);
          const max = findMax(asks);
          const barLength = (amount / max) * 100;
          return (
            <Item
              key={uniqid()}
              price={price}
              amount={amount}
              isAsk={true}
              barLength={barLength < 1 ? 1 : barLength}
            />
          );
        })
      : null;

  useEffect(() => {
    console.log(bids);

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
      isMobileDevice={isMobileDevice}
    >
      <OrderBook isMobile={isMobile}>
        <Header />
        <DataTable>
          <ColumnContainer>
            <Column>{bidsTable}</Column>
            <Column>{asksTable}</Column>
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
