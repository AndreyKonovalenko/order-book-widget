const DataTable = (props) => {
  const { children } = props;
  const styles = {
    table: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: '0px 15px 0px 15px',
      gap: '15px',
      width: '312px',
      height: '198px',
      flex: 'none',
      order: '1',
      flexGrow: '0',
    },
  };
  return <div style={styles.table}>{children}</div>;
};
export default DataTable;
