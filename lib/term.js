function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const {
  CSSTransition
} = require('react-transition-group');

const {
  FontAwesomeIcon
} = require("@fortawesome/react-fontawesome");

const {
  faArrowUp,
  faArrowDown,
  faSearch,
  faCheck
} = require("@fortawesome/free-solid-svg-icons");

const enterKey = 13;

module.exports = (Term, {
  React
}) => class extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.onDecorated = this.onDecorated.bind(this);
    this.searchTerm = '';
    this.state = {
      caseSensitive: false,
      wholeWord: false,
      regex: false
    };
  }

  onDecorated(term) {
    if (term) {
      this.searchAddon = term.searchAddon;

      this.closeSearchBox = () => term.closeSearchBox.apply(term);

      term.search = () => this.searchNext.apply(this);

      term.searchNext = () => this.searchNext.apply(this);

      term.searchPrevious = () => this.searchPrevious.apply(this);
    }

    const {
      onDecorated
    } = this.props;

    if (onDecorated) {
      onDecorated(term);
    }
  }

  handleChange = event => {
    this.searchTerm = event.currentTarget.value;

    if (event.keyCode === enterKey) {
      this.searchNext();
    }
  };
  searchNext = () => {
    if (this.props.search) {
      this.searchAddon.findNext(this.searchTerm, this.state);
    }
  };
  searchPrevious = () => {
    if (this.props.search) {
      this.searchAddon.findPrevious(this.searchTerm, this.state);
    }
  };

  render() {
    const {
      customChildrenBefore = [],
      search,
      ...props
    } = this.props;
    const {
      caseSensitive,
      wholeWord,
      regex
    } = this.state;

    const toggleSearchOption = key => this.setState(state => ({
      [key]: !state[key]
    }));

    return /*#__PURE__*/React.createElement(Term, _extends({}, props, {
      search: false,
      onDecorated: this.onDecorated,
      customChildrenBefore: [...customChildrenBefore, /*#__PURE__*/React.createElement(CSSTransition, {
        in: search,
        timeout: 200,
        classNames: "search_box",
        key: "search_box",
        unmountOnExit: true
      }, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        className: "search_box"
      }, /*#__PURE__*/React.createElement("div", {
        className: "search_box_input"
      }, /*#__PURE__*/React.createElement("input", {
        type: "text",
        placeholder: "Search...",
        onKeyUp: this.handleChange,
        ref: input => input && input.focus()
      }), /*#__PURE__*/React.createElement("i", {
        className: "label"
      }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
        icon: faSearch
      })), /*#__PURE__*/React.createElement("i", {
        className: `caseSensitive button ${caseSensitive ? 'active' : ''}`,
        onClick: () => toggleSearchOption('caseSensitive')
      }, "Cc"), /*#__PURE__*/React.createElement("i", {
        className: `wholeWord button ${wholeWord ? 'active' : ''}`,
        onClick: () => toggleSearchOption('wholeWord')
      }, "W"), /*#__PURE__*/React.createElement("i", {
        className: `regex button ${regex ? 'active' : ''}`,
        onClick: () => toggleSearchOption('regex')
      }, ".*")), /*#__PURE__*/React.createElement("div", {
        className: "search_box_actions"
      }, /*#__PURE__*/React.createElement("div", {
        className: "buttonGroup"
      }, /*#__PURE__*/React.createElement("i", {
        className: "button",
        onClick: this.searchPrevious
      }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
        icon: faArrowUp
      })), /*#__PURE__*/React.createElement("i", {
        className: "button",
        onClick: this.searchNext
      }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
        icon: faArrowDown
      }))), /*#__PURE__*/React.createElement("i", {
        className: "button",
        onClick: this.closeSearchBox
      }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
        icon: faCheck
      })))), /*#__PURE__*/React.createElement("style", null, `
                            .search_box-enter {
                              opacity: 0;
                              margin-top: -36px;
                            }
                            .search_box-enter-active {
                              opacity: 1;
                              margin-top: 0;
                              transition: all 200ms ease;
                            }
                            .search_box-exit {
                              opacity: 1;
                              margin-top: 0;
                            }
                            .search_box-exit-active {
                              opacity: 0;
                              margin-top: -36px;
                              transition: opacity 100ms ease, margin-top 200ms ease;
                            }
                        `)))]
    }));
  }

};