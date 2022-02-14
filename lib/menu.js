module.exports = (menu) => {
    const edit = menu.find(m => m.label === 'Edit');
    const search = edit.submenu.find(m => m.label === 'Search');
    edit.submenu[edit.submenu.indexOf(search)] = {
        label: 'Search',
        submenu: [
            {
                label: 'Search...',
                accelerator: 'command+f',
                click: search.click,
            },
            {
                label: 'Search next',
                accelerator: 'command+g',
                click(item, focusedWindow) {
                    if (focusedWindow) {
                        focusedWindow.rpc.emit('editor:search-next');
                    }
                },
            },
            {
                label: 'Search previous',
                accelerator: 'command+shift+g',
                click(item, focusedWindow) {
                    if (focusedWindow) {
                        focusedWindow.rpc.emit('editor:search-prev');
                    }
                },
            },
        ],
    };
    return menu;
}