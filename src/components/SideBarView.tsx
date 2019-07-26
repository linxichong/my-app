import {
  Drawer,
  IconButton,
  List,
  Theme,
  makeStyles,
  createStyles
} from "@material-ui/core";
import {
  Home as HomeIcon,
  // NotificationsNone as NotificationsIcon,
  FormatSize as TypographyIcon,
  // FilterNone as UIElementsIcon,
  BorderAll as TableIcon,
  // QuestionAnswer as SupportIcon,
  // LibraryBooks as LibraryIcon,
  // HelpOutline as FAQIcon,
  ArrowBack as ArrowBackIcon
} from "@material-ui/icons";
import React from "react";
import SideBarLinkView from "./SideBarLinkView";
import classNames from "classnames";
import { LayoutProps } from "../types";
import { PATHS } from "../constants";

const structure = [
  { id: 0, label: "Top", link: PATHS.TOP, icon: <HomeIcon /> },
  {
    id: 1,
    label: "About",
    link: PATHS.ABOUT,
    icon: <TypographyIcon />
  },
  { id: 2, label: "Novel List", link: PATHS.NOVELS, icon: <TableIcon /> }
];

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginLeft: 12,
      marginRight: 36
    },
    hide: {
      display: "none"
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap"
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 40,
      [theme.breakpoints.down("sm")]: {
        width: drawerWidth
      }
    },
    toolbar: {
      ...theme.mixins.toolbar,
      [theme.breakpoints.down("sm")]: {
        display: "none"
      }
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    },
    sidebarList: {
      marginTop: theme.spacing(6)
    },
    mobileBackButton: {
      marginTop: theme.spacing(0.5),
      marginLeft: theme.spacing(3),
      [theme.breakpoints.only("sm")]: {
        marginTop: theme.spacing(0.625)
      },
      [theme.breakpoints.up("md")]: {
        display: "none"
      }
    }
  })
);

type SideBarViewProps = { isPermanent: boolean } & LayoutProps;

const SideBarView: React.SFC<SideBarViewProps> = props => {
  const classes = useStyles(props);
  const { isPermanent, isSidebarOpened, toggleSideBar, location } = props;

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened
        })
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={toggleSideBar}>
          <ArrowBackIcon />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map(link => (
          <SideBarLinkView
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  );
};

export default SideBarView;
