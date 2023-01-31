import theme from "../../../theme/theme";
const Item = (props) => {
  const { colors, fonts } = theme;
  const { price, amount, isAsk, barLength } = props;

  const styles = {
    container: {
      display: "flex",
      width: "146px",
      heiht: "19px",
      flexDirection: "row",
      justifyContent: "space-between",
      backdropFilter: "blur(10px)",
      background: `linear-gradient(to right, ${
        isAsk ? colors.buyProgressBar : colors.sellProgressBar
      } ${barLength}%, rgba(0, 0, 0, 0.7) 0%)`,
    },
    price: {
      fontFamily: fonts.family.main,
      fontWeight: "400",
      fontStyle: "normal",
      fontSize: fonts.size.dataContainer.data,
      color: isAsk ? colors.buy : colors.sell,
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
