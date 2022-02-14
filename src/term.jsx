const { CSSTransition } = require('react-transition-group');
const { FontAwesomeIcon } = require("@fortawesome/react-fontawesome");
const { faArrowUp, faArrowDown, faSearch, faCheck } = require("@fortawesome/free-solid-svg-icons");

const enterKey = 13;

module.exports = (Term, {React}) => class extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.onDecorated = this.onDecorated.bind(this);
        this.searchTerm = '';
        this.state = {
            caseSensitive: false,
            wholeWord: false,
            regex: false,
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
        const { onDecorated } = this.props;
        if (onDecorated) {
            onDecorated(term);
        }
    }

    handleChange = (event) => {
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
        const { customChildrenBefore = [], search, ...props } = this.props;
        const { caseSensitive, wholeWord, regex } = this.state;
        const toggleSearchOption = (key) => this.setState((state) => ({ [key]: !state[key] }));
        return <Term
            {...props}
            search={false}
            onDecorated={this.onDecorated}
            customChildrenBefore={[
                ...customChildrenBefore,
                <CSSTransition
                    in={search}
                    timeout={200}
                    classNames="search_box"
                    key="search_box"
                    unmountOnExit
                >
                    <>
                        <div className="search_box">
                            <div className="search_box_input">
                                <input type="text" placeholder="Search..." onKeyUp={this.handleChange}
                                       ref={(input) => input && input.focus()}/>
                                <i className="label"><FontAwesomeIcon icon={faSearch}/></i>
                                <i className={`caseSensitive button ${caseSensitive ? 'active' : ''}`}
                                   onClick={() => toggleSearchOption('caseSensitive')}>Cc</i>
                                <i className={`wholeWord button ${wholeWord ? 'active' : ''}`}
                                   onClick={() => toggleSearchOption('wholeWord')}>W</i>
                                <i className={`regex button ${regex ? 'active' : ''}`}
                                   onClick={() => toggleSearchOption('regex')}>.*</i>
                            </div>
                            <div className="search_box_actions">
                                <div className="buttonGroup">
                                    <i className="button" onClick={this.searchPrevious}><FontAwesomeIcon icon={faArrowUp}/></i>
                                    <i className="button" onClick={this.searchNext}><FontAwesomeIcon icon={faArrowDown}/></i>
                                </div>
                                <i className="button" onClick={this.closeSearchBox}><FontAwesomeIcon icon={faCheck}/></i>
                            </div>
                        </div>

                        <style>{`
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
                        `}</style>
                    </>
                </CSSTransition>
            ]}
        />
    }
}