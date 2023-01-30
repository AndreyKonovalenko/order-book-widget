import { IoLogoGithub } from "react-icons/io5";
import { IconContext } from "react-icons";
import theme from "../theme/theme";

const Layout = (props) => {
  const { fonts, colors } = theme;
  const { isMobile, children, isLandscape, isMobileDevice } = props;
  const styles = {
    layout: {
      backgroundColor: "#e08aff",
      backgroundImage:
        "linear-gradient(30deg, #d257ff 12%, transparent 12.5%, transparent 87%, #d257ff 87.5%, #d257ff), linear-gradient(150deg, #d257ff 12%, transparent 12.5%, transparent 87%, #d257ff 87.5%, #d257ff), linear-gradient(30deg, #d257ff 12%, transparent 12.5%, transparent 87%, #d257ff 87.5%, #d257ff), linear-gradient(150deg, #d257ff 12%, transparent 12.5%, transparent 87%, #d257ff 87.5%, #d257ff), linear-gradient(60deg, #d257ff77 25%, transparent 25.5%, transparent 75%, #d257ff77 75%, #d257ff77), linear-gradient(60deg, #d257ff77 25%, transparent 25.5%, transparent 75%, #d257ff77 75%, #d257ff77)",
      backgroundSize: "68px 119px",
      backgroundPosition: "0 0, 0 0, 34px 60px, 34px 60px, 0 0, 34px 60px",
      width: "100vw",
      height: "100vh",
    },
    linkContainer: {
      position: "absolute",
      right: "0px",
      bottom: isMobile ? "58px" : "0px",
      padding: "15px 10px",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: "2px",
    },
    text: {
      fontFamily: fonts.family.secondary,
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: isMobile ? fonts.size.link.mobile : fonts.size.link.desktop,
      lineHeight: "130%",
      color: colors.text.main,
    },
    link: {
      textDecoration: "none",
    },
  };

  const link =
    isLandscape && isMobileDevice ? null : (
      <div style={styles.linkContainer}>
        <span style={styles.text}>Andrey Konovalenko</span>
        <IconContext.Provider
          value={{
            color: colors.text.main,
            size: "1.3em",
            verticalAlign: "middle",
          }}
        >
          <a style={styles.link} href="https://github.com/AndreyKonovalenko">
            <IoLogoGithub />
          </a>
        </IconContext.Provider>
      </div>
    );

  return (
    <div style={styles.layout}>
      {children}
      {link}
    </div>
  );
};

export default Layout;
