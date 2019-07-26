import * as React from "react";
// import { Link } from "react-router-dom";
import { PATHS } from "../constants";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Link } from "@material-ui/core";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    },
    link: {
      margin: theme.spacing(1)
    }
  })
);

const Header: React.SFC = props => {
  const classes = useStyles(props);
  const { i18n } = useTranslation();

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          My App
        </Typography>
        <Typography>
          <Link href={PATHS.TOP} color="inherit" className={classes.link}>
            Top
          </Link>
          <Link href={PATHS.ABOUT} color="inherit" className={classes.link}>
            About
          </Link>
          <Link href={PATHS.NOVELS} color="inherit" className={classes.link}>
            Novel List
          </Link>
        </Typography>
        <Typography>
          {["cn", "en"].map((lng, idx) => {
            return (
              <Link
                key={idx}
                href={"#"}
                color="inherit"
                className={classes.link}
                onClick={() => i18n.changeLanguage(lng)}
              >
                {lng}
              </Link>
            );
          })}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
