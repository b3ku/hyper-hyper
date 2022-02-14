function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

module.exports = (Terms, {
  React
}) => class extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onDecorated = this.onDecorated.bind(this);
  }

  onDecorated(terms) {
    if (terms) {
      window.rpc.on('editor:search-next', () => {
        terms.getActiveTerm().searchNext();
      });
      window.rpc.on('editor:search-prev', () => {
        terms.getActiveTerm().searchPrevious();
      });
    }

    const {
      onDecorated
    } = this.props;

    if (onDecorated) {
      onDecorated(terms);
    }
  }

  render() {
    return /*#__PURE__*/React.createElement(Terms, _extends({}, this.props, {
      onDecorated: this.onDecorated
    }));
  }

};