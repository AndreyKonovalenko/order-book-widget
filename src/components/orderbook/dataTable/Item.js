import theme from "../../../theme/theme";
const Item = (props) => {
  const { colors, fonts } = theme;
  const { price, amount, isAsk, barLength } = props;

  const styles = {
    container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "146px",
      padding: "2px  0px",
      background: `linear-gradient(to right, ${
        isAsk ? colors.sellProgressBar : colors.buyProgressBar
      } ${barLength}%, rgba(0, 0, 0, 0) 0%)`,
      lineHeight: "120%",
    },
    price: {
      fontFamily: fonts.family.main,
      fontWeight: "400",
      fontStyle: "normal",
      fontSize: fonts.size.dataContainer.data,
      color: isAsk ? colors.sell : colors.buy,
      lineHeight: "120%",
      paddingLeft: "2px",
    },
    amaunt: {
      fontFamily: fonts.family.main,
      fontWeight: "400",
      fontStyle: "normal",
      fontSize: fonts.size.dataContainer.data,
      color: colors.text.main,
    },
  };
  return (
    <div style={styles.container}>
      <span style={styles.price}>{price}</span>
      <span style={styles.amaunt}>{amount}</span>
    </div>
  );
};
export default Item;
