const ColumnContainer = (props) => {
  const { children } = props;
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
  return <div style={styles.container}>{children}</div>;
};

export default ColumnContainer;
