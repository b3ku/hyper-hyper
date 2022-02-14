const mapHyperState = (store, map) => ({ ...map,
  sessionCount: Object.keys(store.sessions.sessions).length
});

const updateHyperSessions = (hyper, sessionCount) => {
  if (sessionCount > 1) {
    hyper.setAttribute('data-has-sessions', '');
  } else {
    hyper.removeAttribute('data-has-sessions');
  }
};

const decorateHyper = (Hyper, {
  React
}) => class extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    const {
      sessionCount,
      onThemeUpdated
    } = this.props;
    this.hyperMain = document.getElementsByClassName('hyper_main')[0];
    updateHyperSessions(this.hyperMain, sessionCount);
    window.rpc.on('theme:updated', ({
      theme,
      focus
    }) => onThemeUpdated(theme, focus));
  }

  componentDidUpdate() {
    updateHyperSessions(this.hyperMain, this.props.sessionCount);
  }

  render() {
    return /*#__PURE__*/React.createElement(Hyper, this.props);
  }

};

module.exports = {
  mapHyperState,
  decorateHyper
};