import theme from '../../../theme/theme';
const Column = (props) => {
  const { fonts, colors } = theme;
  const { children } = props;
  const styles = {
    column: {
      display: 'flex',
      alignItems: 'flex-start',
      flexDirection: 'column',
      width: '146px',
      height: '183px',
    },
    headContainer: {
      display: 'flex',
      width: '146px',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: '4px',
      lineHeight: '115%',
    },
    head: {
      fontFamily: fonts.family.main,
      fontWeight: '600',
      fontStyle: 'normal',
      fontSize: fonts.size.dataContainer.head,
      color: colors.text.secondary,
    },
  };

  return (
    <div style={styles.column}>
      <div style={styles.headContainer}>
        <span style={styles.head}>Price</span>
        <span style={styles.head}>Amount</span>
      </div>
      {children}
    </div>
  );
};

export default Column;
