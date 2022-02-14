const util = require('util');
const exec = util.promisify(require('child_process').exec);

const isMac = () => /Mac/.test(navigator.userAgent);

let uid, pid;

const cwd = () => async (dispatch) => exec(`lsof -p ${pid} | awk '$4=="cwd"' | tr -s ' ' | cut -d ' ' -f9- | sed "s;$HOME;~;"`).then(
    (stdout) => dispatch({ type: 'SESSION_SET_XTERM_TITLE', uid, title: stdout.trim() })
);

module.exports = (store) => (next) => (action) => {
    if (isMac()) {
        switch (action.type) {
            case 'SESSION_SET_ACTIVE':
                ({ uid } = action);
                ({ pid } = store.getState().sessions.sessions[uid]);
                break;

            case 'SESSION_ADD':
                ({ uid, pid } = action);
                store.dispatch(cwd());
                break;

            case 'SESSION_ADD_DATA':
                if (action.data.indexOf('\n') > 0) {
                    store.dispatch(cwd());
                }
                break;

        }
    }
    next(action);
};