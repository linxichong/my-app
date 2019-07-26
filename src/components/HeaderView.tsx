import * as React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  Theme,
  makeStyles,
  createStyles
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  ArrowBack as ArrowBackIcon,
  Language as LanguageIcon
} from "@material-ui/icons";
import { useTranslation } from "react-i18next";
import { LayoutProps } from "../types";
import classNames from "classnames";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logotype: {
      color: "white",
      marginLeft: theme.spacing(2.5),
      marginRight: theme.spacing(2.5),
      fontWeight: 500,
      fontSize: 18,
      whiteSpace: "nowrap",
      [theme.breakpoints.down("xs")]: {
        display: "none"
      }
    },
    appBar: {
      width: "100vw",
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    toolbar: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    },
    // hide: {
    //   display: "none"
    // },
    grow: {
      flexGrow: 1
    },
    // search: {
    //   position: "relative",
    //   borderRadius: 25,
    //   paddingLeft: theme.spacing.unit * 2.5,
    //   width: 36,
    //   backgroundColor: fade(theme.palette.common.black, 0),
    //   transition: theme.transitions.create(["background-color", "width"]),
    //   "&:hover": {
    //     cursor: "pointer",
    //     backgroundColor: fade(theme.palette.common.black, 0.08)
    //   }
    // },
    // searchFocused: {
    //   backgroundColor: fade(theme.palette.common.black, 0.08),
    //   width: "100%",
    //   [theme.breakpoints.up("md")]: {
    //     width: 250
    //   }
    // },
    // searchIcon: {
    //   width: 36,
    //   right: 0,
    //   height: "100%",
    //   position: "absolute",
    //   display: "flex",
    //   alignItems: "center",
    //   justifyContent: "center",
    //   transition: theme.transitions.create("right"),
    //   "&:hover": {
    //     cursor: "pointer"
    //   }
    // },
    // searchIconOpened: {
    //   right: theme.spacing.unit * 1.25
    // },
    // inputRoot: {
    //   color: "inherit",
    //   width: "100%"
    // },
    // inputInput: {
    //   height: 36,
    //   padding: 0,
    //   paddingRight: 36 + theme.spacing.unit * 1.25,
    //   width: "100%"
    // },
    // messageContent: {
    //   display: "flex",
    //   flexDirection: "column"
    // },
    headerMenu: {
      marginTop: theme.spacing(7)
    },
    headerMenuList: {
      display: "flex",
      flexDirection: "column"
    },
    headerMenuItem: {
      "&:hover, &:focus": {
        backgroundColor: theme.palette.primary.main,
        color: "white"
      }
    },
    headerMenuButton: {
      marginLeft: theme.spacing(2),
      padding: theme.spacing(.5)
    },
    headerMenuButtonCollapse: {
      marginRight: theme.spacing(2)
    },
    headerIcon: {
      fontSize: 28,
      color: "rgba(255, 255, 255, 0.35)"
    },
    headerIconCollapse: {
      color: "white"
    },
    // profileMenu: {
    //   minWidth: 265
    // },
    // profileMenuUser: {
    //   display: "flex",
    //   flexDirection: "column",
    //   padding: theme.spacing.unit * 2
    // },
    // profileMenuItem: {
    //   color: theme.palette.text.hint
    // },
    // profileMenuIcon: {
    //   marginRight: theme.spacing.unit * 2,
    //   color: theme.palette.text.hint
    // },
    // profileMenuLink: {
    //   fontSize: 16,
    //   textDecoration: "none",
    //   "&:hover": {
    //     cursor: "pointer"
    //   }
    // },
    // messageNotification: {
    //   height: "auto",
    //   display: "flex",
    //   alignItems: "center",
    //   "&:hover, &:focus": {
    //     backgroundColor: theme.palette.background.light
    //   }
    // },
    // messageNotificationSide: {
    //   display: "flex",
    //   flexDirection: "column",
    //   alignItems: "center",
    //   marginRight: theme.spacing.unit * 2
    // },
    // messageNotificationBodySide: {
    //   alignItems: "flex-start",
    //   marginRight: 0
    // },
    // sendMessageButton: {
    //   margin: theme.spacing.unit * 4,
    //   marginTop: theme.spacing.unit * 2,
    //   marginBottom: theme.spacing.unit * 2,
    //   textTransform: "none"
    // },
    // sendButtonIcon: {
    //   marginLeft: theme.spacing.unit * 2
    // }
  })
);

type HeaderViewProps = {
  langMenu: null | HTMLElement;
  openLangMenu: (event: React.MouseEvent<HTMLButtonElement>) => void;
  closeLangMenu: () => void;
} & LayoutProps;

const HeaderView: React.SFC<HeaderViewProps> = props => {
  const { i18n } = useTranslation();
  const classes = useStyles(props);
  const { isSidebarOpened, toggleSideBar } = props;

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          color="inherit"
          onClick={toggleSideBar}
          className={classNames(
            classes.headerMenuButton,
            classes.headerMenuButtonCollapse
          )}
        >
          {isSidebarOpened ? (
            <ArrowBackIcon
              classes={{
                root: classNames(classes.headerIcon, classes.headerIconCollapse)
              }}
            />
          ) : (
            <MenuIcon
              classes={{
                root: classNames(classes.headerIcon, classes.headerIconCollapse)
              }}
            />
          )}
        </IconButton>
        <Typography variant="h6" className={classes.logotype}>
          My App
        </Typography>
        <div className={classes.grow} />
        <IconButton
          color="inherit"
          onClick={props.openLangMenu}
          className={classes.headerMenuButton}
        >
          <LanguageIcon classes={{ root: classes.headerIcon }} />
        </IconButton>
        <Menu
          id="lang-menu"
          open={Boolean(props.langMenu)}
          onClose={props.closeLangMenu}
          anchorEl={props.langMenu}
          className={classes.headerMenu}
          MenuListProps={{ className: classes.headerMenuList }}
        >
          {["cn", "en"].map((lng, idx) => (
            <MenuItem
              key={idx}
              onClick={() => {
                props.closeLangMenu();
                i18n.changeLanguage(lng);
              }}
              className={classes.headerMenuItem}
            >
              {lng}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderView;
