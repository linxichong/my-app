import React from "react";
import {
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { Inbox as InboxIcon } from "@material-ui/icons";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import classNames from "classNames";
import { Typography } from "../common/components/Wrappers";
import Dot from "../common/components/Dot";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      textDecoration: "none",
      paddingLeft: theme.spacing(4.5),
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      "&:hover, &:focus": {
        backgroundColor: theme.palette.background.light
      }
    },
    linkActive: {
      backgroundColor: theme.palette.background.light
    },
    linkNested: {
      paddingLeft: 0,
      paddingTop: theme.spacing(),
      paddingBottom: theme.spacing(),
      "&:hover, &:focus": {
        backgroundColor: "#FFFFFF"
      }
    },
    linkIcon: {
      marginRight: theme.spacing(),
      color: theme.palette.text.secondary + "99",
      transition: theme.transitions.create("color"),
      width: 24,
      display: "flex",
      justifyContent: "center"
    },
    linkIconActive: {
      color: theme.palette.primary.main
    },
    linkText: {
      padding: 0,
      color: theme.palette.text.secondary + "CC",
      transition: theme.transitions.create(["opacity", "color"]),
      fontSize: 16
    },
    linkTextActive: {
      color: theme.palette.text.primary
    },
    linkTextHidden: {
      opacity: 0
    },
    nestedList: {
      paddingLeft: theme.spacing(4.5) + 40
    },
    sectionTitle: {
      marginLeft: theme.spacing(4.5),
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    },
    divider: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(4),
      height: 1,
      backgroundColor: "#D8D8D880"
    }
  })
);

const SideBarLinkView = props => {
  const classes = useStyles(props);
  const {
    link,
    icon,
    label,
    // children,
    // location,
    isSideBarOpened,
    nested,
    type,
    isOpen
    // toggleCollapse
  } = props;

  const isLinkActive = link;

  if (type === "title")
    return (
      <Typography
        className={classNames(classes.linkText, classes.sectionTitle, {
          [classes.linkTextHidden]: !isSideBarOpened
        })}
      >
        {label}
      </Typography>
    );

  if (type === "divider") return <Divider className={classes.divider} />;

  // if (!children)
  return (
    <ListItem
      button
      component={link && Link}
      to={link}
      className={classes.link}
      classes={{
        root: classNames(classes.linkRoot, {
          [classes.linkActive]: isLinkActive && !nested,
          [classes.linkNested]: nested
        })
      }}
      disableRipple
    >
      <ListItemIcon
        className={classNames(classes.linkIcon, {
          [classes.linkIconActive]: isLinkActive
        })}
      >
        {nested ? <Dot color={isLinkActive && "primary"} /> : icon}
      </ListItemIcon>
      <ListItemText
        classes={{
          primary: classNames(classes.linkText, {
            [classes.linkTextActive]: isLinkActive,
            [classes.linkTextHidden]: !isSideBarOpened
          })
        }}
        primary={label}
      />
    </ListItem>
  );

  // return (
  //   <React.Fragment>
  //     <ListItem
  //       button
  //       component={link && Link}
  //       onClick={toggleCollapse}
  //       className={classes.link}
  //       to={link}
  //       disableRipple
  //     >
  //       <ListItemIcon
  //         className={classNames(classes.linkIcon, {
  //           [classes.linkIconActive]: isLinkActive
  //         })}
  //       >
  //         {icon ? icon : <InboxIcon />}
  //       </ListItemIcon>
  //       <ListItemText
  //         classes={{
  //           primary: classNames(classes.linkText, {
  //             [classes.linkTextActive]: isLinkActive,
  //             [classes.linkTextHidden]: !isSideBarOpened
  //           })
  //         }}
  //         primary={label}
  //       />
  //     </ListItem>
  //     {children && (
  //       <Collapse
  //         in={isOpen && isSideBarOpened}
  //         timeout="auto"
  //         unmountOnExit
  //         className={classes.nestedList}
  //       >
  //         <List component="div" disablePadding>
  //           {children.map(childrenLink => (
  //             <SideBarLinkView
  //               key={childrenLink && childrenLink.link}
  //               location={location}
  //               isSideBarOpened={isSideBarOpened}
  //               classes={classes}
  //               nested
  //               {...childrenLink}
  //             />
  //           ))}
  //         </List>
  //       </Collapse>
  //     )}
  //   </React.Fragment>
  // );
};

export default SideBarLinkView;
