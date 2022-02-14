const { FontAwesomeIcon } = require('@fortawesome/react-fontawesome');
const { faPlus } = require('@fortawesome/free-solid-svg-icons');

module.exports = (Tabs, { React }) => class extends React.PureComponent {
    createNewTab = () => {
        const { ui, sessions } = window.store.getState();
        const { cwd } = ui;
        window.rpc.emit('new', {
            isNewGroup: true,
            cwd,
            activeUid: sessions.activeUid
        });
    }

    render() {
        const { customChildren = [], ...props } = this.props;
        return <Tabs
            {...props}
            customChildren={[
                ...customChildren,
                <div className="tab_add" key="tab_add" onClick={this.createNewTab}>
                    <i className="tab_add_icon"><FontAwesomeIcon icon={faPlus} /></i>
                </div>
            ]}
        />;
    }
};
