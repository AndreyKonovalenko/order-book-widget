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

import { getSnapshot } from "../fetures/orderbook/orderbookSlice";
import { setClosePrice } from "../fetures/closePrice/closePriceSlice";

import { formatToCurrency, findMax } from "../utils/utils";

const Widget = () => {
  const dispatch = useDispatch();
  const { isMobile, isLandscape, isMobileDevice } = useDeviceDetect();
  const { bids, asks, lastUpdateId } = useSelector((state) => state.orderbook);
  const { closePrice } = useSelector((state) => state.closePrice);
  const socketUrl = "wss://stream.binance.com:9443/ws/btcusdt@depth";

  const depth = useWebSocket(socketUrl, {
    onOpen: () => console.log("opened"),
    onClose: () => console.log("WebSocket connection closed."),
    shouldReconnect: (closeEvent) => true,
    onMessage: (event) => processMessages(event),
  });

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
      dispatch(setClosePrice(response.k.c));
    }
    // if (response.e === "depthUpdate") {
    //   console.log(response);
    // }

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
    if (lastUpdateId === 0) {
      dispatch(getSnapshot());
    }
    console.log(depth.getWebSocket());
    console.log(candlestickStream.getWebSocket());
    // const subscribeMessage = {};
    // sendJsonMessage(subscribeMessage);
  }, [dispatch]);

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
        <LastSell value={closePrice} />
      </OrderBook>
    </Layout>
  );
  return widget;
};

export default Widget;

// function createConnectionAndPingServer(key) {
//   serverList[key].socket = new WebSocket(serverList[key].url + "?" + serverOpts.query);

//   addSocketMethods(serverList[key].socket);
//   receivePingHandler(key);

//   serverList[key].socket.onopen = function() {
//       serverList[key].socket.emit('ping_from_client', Date.now());
//   };
// }
