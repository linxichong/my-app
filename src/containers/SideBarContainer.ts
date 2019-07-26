import SideBarView from "../components/SideBarView";
import { compose, withState, withHandlers, lifecycle } from "recompose";
import { connect } from "react-redux";
import { AppStateType } from "../redux/store/configureStore";
import { toggleSideBar } from "../redux/actions/layout";
import { withTheme } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";

export default compose(
  withRouter,
  withTheme,
  connect(
    (state: AppStateType) => ({
      isSidebarOpened: state.layout.isSidebarOpened
    }),
    { toggleSideBar }
  ),
  withState("isPermanent", "setPermanent", false),
  withHandlers({
    handleWindowWidthChange: ({ isPermanent, setPermanent, theme }) => () => {

      console.log(theme)
      const windowWidth = window.innerWidth;
      const breakpointWidth = theme.breakpoints.values.md;
      const isSmallScreen = windowWidth < breakpointWidth;

      if (isSmallScreen && isPermanent) {
        setPermanent(false);
      } else if (!isSmallScreen && !isPermanent) {
        setPermanent(true);
      }
    }
  }),
  lifecycle({
    componentWillMount() {
      window.addEventListener("resize", this.props.handleWindowWidthChange);
      this.props.handleWindowWidthChange();
    },
    componentWillUnmount() {
      window.removeEventListener("resize", this.props.handleWindowWidthChange);
    }
  })
)(SideBarView);
