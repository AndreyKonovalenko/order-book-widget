# Order Book Widget

Order book widget helps buyers and sellers of the crypto exchange analyse the market depth and find a profitable offer. Data is requested via the Binance API and updated in real time via WebSocket.

![data_image](https://user-images.githubusercontent.com/16167616/221538801-0b3d9082-0f21-4412-835b-1a6e18afb401.gif)

For managing data in local order book I use Binance 9 Steps documentation "How to manage a local order book correctly"
https://binance-docs.github.io/apidocs/spot/en/#diff-depth-stream".

I use combined stream via /stream?streams instead of single raw stream /ws/bnbbtc@depth
this is due to the need to listen to the kline_1s stream for displaying Last Sell price
the close price from kline_1s data stream is taken for the Last Sell price to be displayed

[View Live](https://AndreyKonovalenko.github.io/order-book-widget)

## Features
- last sell price updates every second;
- orderbook data updates via Binace WebSocket depth stream in real-time.




