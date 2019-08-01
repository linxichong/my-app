import * as React from "react";
import { Route } from "react-router-dom";
import { history } from "../redux/store/configureStore";
import { PATHS } from "../constants";
import Top from "../containers/Top";
import { ConnectedRouter } from "connected-react-router";
import ErrorBoundary from "../containers/ErrorBoundary";
import { CssBaseline } from "@material-ui/core";
import HeaderContainer from "../containers/HeaderContainer";
import SideBarContainer from "../containers/SideBarContainer";
import {
  createMuiTheme,
  createStyles,
  makeStyles,
  Theme,
  MuiThemeProvider
} from "@material-ui/core/styles";
import classNames from "classnames";
import { LayoutProps } from "../types";
import themes, { overrides } from "../themes";

const About = React.lazy(() => import("../containers/About"));
const NovelContainer = React.lazy(() => import("../containers/NovelContainer"));

const theme = createMuiTheme({
  ...themes.default,
  ...overrides
});
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      maxWidth: "100vw",
      overflowX: "hidden"
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing() * 3,
      width: `calc(100vw - 240px)`,
      minHeight: "100vh"
    },
    contentShift: {
      width: `calc(100vw - ${240 + theme.spacing() * 6}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    fakeToolbar: {
      ...theme.mixins.toolbar
    }
  })
);

type AppViewProps = {} & LayoutProps;

const AppView: React.SFC<AppViewProps> = props => {
  const classes = useStyles(props);
  const { isSideBarOpened } = props;

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <ConnectedRouter history={history}>
        <ErrorBoundary>
          <div className={classes.root}>
            <HeaderContainer />
            <SideBarContainer />
            <div
              className={classNames(classes.content, {
                [classes.contentShift]: isSideBarOpened
              })}
            >
              <div className={classes.fakeToolbar} />
              <Route exact path={PATHS.TOP} component={Top} />
              <React.Suspense fallback={<div>Loading...</div>}>
                <Route exact path={PATHS.ABOUT} component={About} />
                <Route exact path={PATHS.NOVELS} component={NovelContainer} />
              </React.Suspense>
            </div>
          </div>
        </ErrorBoundary>
      </ConnectedRouter>
    </MuiThemeProvider>
  );
};

export default AppView;
