import AppView from "../components/AppView";
import { compose } from "recompose";
import { connect } from "react-redux";
import { AppStateType } from "../redux/store/configureStore";

export default compose(
  connect((state: AppStateType) => ({
    isSideBarOpened: state.layout.isSideBarOpened
  }))
)(AppView);
