function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const {
  FontAwesomeIcon
} = require('@fortawesome/react-fontawesome');

const {
  faPlus
} = require('@fortawesome/free-solid-svg-icons');

module.exports = (Tabs, {
  React
}) => class extends React.PureComponent {
  createNewTab = () => {
    const {
      ui,
      sessions
    } = window.store.getState();
    const {
      cwd
    } = ui;
    window.rpc.emit('new', {
      isNewGroup: true,
      cwd,
      activeUid: sessions.activeUid
    });
  };

  render() {
    const {
      customChildren = [],
      ...props
    } = this.props;
    return /*#__PURE__*/React.createElement(Tabs, _extends({}, props, {
      customChildren: [...customChildren, /*#__PURE__*/React.createElement("div", {
        className: "tab_add",
        key: "tab_add",
        onClick: this.createNewTab
      }, /*#__PURE__*/React.createElement("i", {
        className: "tab_add_icon"
      }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
        icon: faPlus
      })))]
    }));
  }

};