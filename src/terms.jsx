module.exports = (Terms, { React }) => class extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.onDecorated = this.onDecorated.bind(this);
    }

    onDecorated(terms) {
        if (terms) {
            window.rpc.on('editor:search-next',() => {
                terms.getActiveTerm().searchNext();
            });
            window.rpc.on('editor:search-prev',() => {
                terms.getActiveTerm().searchPrevious();
            });
        }
        const { onDecorated } = this.props;
        if (onDecorated) {
            onDecorated(terms);
        }
    }

    render() {
        return <Terms {...this.props} onDecorated={this.onDecorated} />;
    }
};