const OrderBook = (props) => {
  const { children, isMobile } = props;
  const styles = {
    orderBook: {
      display: 'felx',
      flexDirection: 'column',
      padding: '15px',
      gap: '10px',
      position: 'absolute',
      width: '342px',
      height: '340px',
      left: isMobile ? '17px' : '30px',
      top: isMobile ? '40px' : '25px',
      background: 'rgba(0, 0, 0, 0.7)',
      borderRadius: '10px',
      backdropFilter: 'blur(10px)',
    },
  };

  return <div style={styles.orderBook}>{children}</div>;
};
export default OrderBook;
