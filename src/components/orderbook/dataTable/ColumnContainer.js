import uniqid from 'uniqid';

import Column from './Column';
import Item from './Item';

import { formatToCurrency, findMax } from '../../../utils/utils';

const ColumnContainer = (props) => {
  const { bids, asks } = props;
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: '20px',
      isolation: 'isolate',
      width: '312px',
      height: '183px',
      flex: 'none',
      order: '0',
      flexGrow: '0',
    },
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

  const bidsTable = columnConstructor(bids, false);
  const asksTable = columnConstructor(asks, true);

  return (
    <div style={styles.container}>
      <Column>{bidsTable}</Column>
      <Column>{asksTable}</Column>
    </div>
  );
};

export default ColumnContainer;
