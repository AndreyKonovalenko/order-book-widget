import React, { useState, useCallback, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import useDeviceDetect from "../hooks/useDeviceDetect";
import Header from "./orderbook/Header";
import Layout from "./Layout";
import LastSell from "./orderbook/dataTable/LastSell";
import ColumnContainer from "./orderbook/dataTable/CoulmnContainer";
import DataTable from "./orderbook/dataTable/DataTable";
import OrderBook from "./orderbook/OrderBook";
import Line from "./orderbook/dataTable/Line";

const Widget = () => {
  const { isMobile, isLandscape, isMobileDevice } = useDeviceDetect();

  const socketUrl = "wss://stream.binance.com:9443/ws/btcusdt@depth";

  const { sendJsonMessage, getWebSocket } = useWebSocket(socketUrl, {
    onOpen: () => console.log("opened"),
    onClose: () => console.log("WebSocket connection closed."),
    shouldReconnect: (closeEvent) => true,
    onMessage: (event) => processMessages(event),
  });

  const processMessages = (event) => {
    const response = JSON.parse(event.data);
    process(response);
    console.log(process(response));
    // if (response.numLevels) {
    //   dispatch(addExistingState(response));
    // } else {
    //   process(response);
    // }
  };

  const process = (data) => {
    return data;
  };

  useEffect(() => {
    const subscribeMessage = {};
    sendJsonMessage(subscribeMessage);
  }, []);

  const widget = (
    <Layout
      isMobile={isMobile}
      isLandscape={isLandscape}
      isMobileDevice={isMobileDevice}
    >
      <OrderBook isMobile={isMobile}>
        <Header />
        <DataTable>
          <ColumnContainer></ColumnContainer>
          <Line />
        </DataTable>
        <LastSell value={"21,256.13"} />
      </OrderBook>
    </Layout>
  );
  return widget;
};

export default Widget;
