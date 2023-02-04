import axios from 'axios';

const getSnapshot = async () => {
  const response = await axios.get(
    'https://api.binance.com/api/v3/depth?symbol=BTCUSDT&limit=1000'
  );
  return response.data;
};

const orderbookService = {
  getSnapshot,
};

export default orderbookService;
