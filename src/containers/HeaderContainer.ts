import HeaderView from "../components/HeaderView";
import { compose, withState, withHandlers } from "recompose";
import { connect } from "react-redux";
import { AppStateType } from "../redux/store/configureStore";
import { toggleSideBar } from "../redux/actions/layout";

// const mapStateToProps = (state: AppStateType) => {
//   return {
//     isSideBarOpened: state.layout.isSideBarOpened
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     toggleSideBar: () => {
//       dispatch(toggleSideBar())
//     }
//   }
// }

export default compose(
  connect(
    (state: AppStateType) => ({
      isSideBarOpened: state.layout.isSideBarOpened
    }),
    { toggleSideBar }
  ),
  withState("langMenu", "setLangMenu", null),
  withHandlers({
    openLangMenu: props => event => {
      props.setLangMenu(event.currentTarget);
    },
    closeLangMenu: props => () => {
      props.setLangMenu(null);
    }
  })
)(HeaderView);
