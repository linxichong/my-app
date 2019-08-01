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
  NotificationsNone as NotificationsIcon,
  FormatSize as TypographyIcon,
  FilterNone as UIElementsIcon,
  BorderAll as TableIcon,
  QuestionAnswer as SupportIcon,
  LibraryBooks as LibraryIcon,
  HelpOutline as FAQIcon,
  ArrowBack as ArrowBackIcon
} from "@material-ui/icons";
import React from "react";
import SideBarLinkView from "./SideBarLinkView";
import classNames from "classnames";
import { LayoutProps } from "../types";
import { PATHS } from "../constants";
import Dot from "../common/components/Dot";

// const structure = [
//   { id: 0, label: "Top", link: PATHS.TOP, icon: <HomeIcon /> },
//   {
//     id: 1,
//     label: "About",
//     link: PATHS.ABOUT,
//     icon: <TypographyIcon />
//   },
//   { id: 2, label: "Novel List", link: PATHS.NOVELS, icon: <TableIcon /> }
// ];

const structure = [
  { id: 0, label: "Top", link: PATHS.TOP, icon: <HomeIcon /> },
  {
    id: 1,
    label: "About",
    link: PATHS.ABOUT,
    icon: <TypographyIcon />
  },
  // { id: 2, label: "Tables", link: "/app/tables", icon: <TableIcon /> },
  {
    id: 2,
    label: "Novel List",
    link: PATHS.NOVELS,
    icon: <NotificationsIcon />
  }
  // { id: 5, type: "divider" },
  // { id: 6, type: "title", label: "HELP" },
  // { id: 7, label: "Library", link: "", icon: <LibraryIcon /> },
  // { id: 8, label: "Support", link: "", icon: <SupportIcon /> },
  // { id: 9, label: "FAQ", link: "", icon: <FAQIcon /> },
  // { id: 10, type: "divider" },
  // { id: 11, type: "title", label: "PROJECTS" },
  // {
  //   id: 12,
  //   label: "My recent",
  //   link: "",
  //   icon: <Dot size="large" color="warning" />
  // },
  // {
  //   id: 13,
  //   label: "Starred",
  //   link: "",
  //   icon: <Dot size="large" color="primary" />
  // },
  // {
  //   id: 14,
  //   label: "Background",
  //   link: "",
  //   icon: <Dot size="large" color="secondary" />
  // }
];

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    // menuButton: {
    //   marginLeft: 12,
    //   marginRight: 36
    // },
    // hide: {
    //   display: "none"
    // },
    // test: {
    //   background: (props: SideBarViewProps) =>
    //     props.isPermanent
    //       ? "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
    //       : "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)"
    // },
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
  const { isPermanent, isSideBarOpened, toggleSideBar, location } = props;

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSideBarOpened,
        [classes.drawerClose]: !isSideBarOpened
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSideBarOpened,
          [classes.drawerClose]: !isSideBarOpened
        })
      }}
      open={isSideBarOpened}
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
            isSideBarOpened={isSideBarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  );
};

export default SideBarView;
