import theme from "./../../../theme/theme";

const LastSell = (props) => {
  const { colors, fonts } = theme;
  const { value } = props;
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      padding: "0 0 0 15px",
      flex: "none",
      order: "2",
      flexGrow: "0",
    },
    textContainer: {
      padding: "0px",
    },
    head: {
      fontFamily: fonts.family.main,
      fontWeight: "400",
      fontSize: fonts.size.lastSell.head,
      color: colors.text.secondary,
      lineHeight: "115%",
    },
    data: {
      fontWeight: "300",
      fontSize: fonts.size.lastSell.data,
      color: colors.text.main,
      lineHeight: "100%",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.textContainer}>
        <span style={styles.head}>Last sell</span>
      </div>
      <div style={styles.textContainer}>
        <span style={styles.data}>{value}</span>
      </div>
    </div>
  );
};

export default LastSell;
