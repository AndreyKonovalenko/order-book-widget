import theme from "../../theme/theme";
const Header = () => {
  const { colors, fonts } = theme;
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      padding: "15px 0px 0px 15px",
      width: "185px",
      height: "44px",
      flex: "none",
      order: "0",
      flexGrow: "0",
    },
    textContainer: {
      padding: "0px",
      width: "100%",
    },
    head0: {
      fontFamily: fonts.family.main,
      fontWeight: "700",
      fontSize: fonts.size.head,
      color: colors.text.main,
      lineHeight: "116%",
      margin: "0px",
    },
    head1: {
      fontFamily: fonts.family.main,
      fontWeight: "400",
      fontSize: fonts.size.head,
      color: colors.buy,
      lineHeight: "116%",
      margin: "0px",
    },
    head2: {
      color: colors.sell,
    },
  };
  const text = "and selling";
  return (
    <div style={styles.container}>
      <div style={styles.textContainer}>
        <p style={styles.head0}>BTC/USDT Orderbook</p>
      </div>
      <div style={styles.textContainer}>
        <p style={styles.head1}>
          Buying <span style={styles.head2}>{text}</span>
        </p>
      </div>
    </div>
  );
};
export default Header;
