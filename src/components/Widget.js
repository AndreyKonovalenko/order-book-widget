import React, { useEffect } from "react";
import useWebSocket from "react-use-websocket";
import { useSelector, useDispatch } from "react-redux";
import useDeviceDetect from "../hooks/useDeviceDetect";
import Header from "./orderbook/Header";
import Layout from "./Layout";
import LastSell from "./orderbook/dataTable/LastSell";
import ColumnContainer from "./orderbook/dataTable/ColumnContainer";
import DataTable from "./orderbook/dataTable/DataTable";
import OrderBook from "./orderbook/OrderBook";
import Line from "./orderbook/dataTable/Line";
import { getSnapshot } from "../fetures/orderBook/orderBookSlice";
import { setClosePrice } from "../fetures/closePrice/closePriceSlice";

const MomoizedColumnContainer = React.memo(ColumnContainer);
const endpoint = "wss://stream.binance.com:9443/stream?streams=";

const Widget = () => {
  const dispatch = useDispatch();
  const { isMobile, isLandscape, isMobileDevice } = useDeviceDetect();
  const { bids, asks, isLoading, lastUpdateId } = useSelector(
    (state) => state.orderBook
  );
  const { closePrice } = useSelector((state) => state.closePrice);

  const { sendJsonMessage, getWebSocket, readyState } = useWebSocket(endpoint, {
    onOpen: () => console.log("opened"),
    onClose: () => console.log("WebSocket connection closed."),
    shouldReconnect: (closeEvent) => true,
    onMessage: (event) => processMessages(event),
  });
  const processMessages = (event) => {
    const response = JSON.parse(event.data);
    if (response.stream === "btcusdt@kline_1s") {
      dispatch(setClosePrice(response.data.k.c));
    }
  };
  useEffect(() => {
    console.log("mount");
    const connect = () => {
      const subscribeMessage = {
        method: "SUBSCRIBE",
        params: ["btcusdt@depth", "btcusdt@kline_1s"],
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
    return () => console.log("unmount");
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
      isMobileDevice={isMobileDevice}
    >
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
