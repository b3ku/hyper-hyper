const { nativeTheme } = require('electron');
const Color = require('color');

const withAlpha = (c, alpha = 1) => {
    if (alpha < 1) {
        const color = Color(c);
        c = `rgba(${color.red()}, ${color.green()}, ${color.blue()}, ${color.alpha() * alpha})`;
    }
    return c;
};

const ThemeType = {
    DARK: 'dark',
    LIGHT: 'light',
};

const macosColors = {
    defaults: {
        light: {
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            foregroundColor: '#333',
            borderColor: 'rgb(205, 203, 203)',
            borderColorAlt: 'rgb(0, 0, 0, 0.1)',
        },
        dark: {
            backgroundColor: 'rgb(43, 38, 37, 0.6)',
            foregroundColor: '#FFFFFF',
            borderColor: 'rgba(116,121,119,0.35)',
            borderColorAlt: 'rgb(255, 255, 255, 0.1)',
        },
    },
    vibrant: {
        light: {
            red: 'rgb(255, 49, 38)',
            orange: 'rgb(245, 139, 0)',
            yellow: 'rgb(245, 194, 0)',
            green: 'rgb(30, 195, 55)',
            mint: 'rgb(0, 189, 180)',
            teal: 'rgb(46, 167, 189)',
            cyan: 'rgb(65, 175, 220)',
            blue: 'rgb(0, 112, 245)',
            indigo: 'rgb(84, 82, 204)',
            purple: 'rgb(159, 75, 201)',
            pink: 'rgb(245, 35, 75)',
            brown: 'rgb(152, 122, 84)',
            gray: 'rgb(132, 132, 137)',
        },
        dark: {
            red: 'rgb(255, 79, 68)',
            orange: 'rgb(255, 169, 20)',
            yellow: 'rgb(255, 224, 20)',
            green: 'rgb(60, 225, 85)',
            mint: 'rgb(108, 224, 219)',
            teal: 'rgb(68, 212, 237)',
            cyan: 'rgb(90, 205, 250)',
            blue: 'rgb(20, 142, 255)',
            indigo: 'rgb(99, 97, 242)',
            purple: 'rgb(204, 101, 255)',
            pink: 'rgb(255, 65, 105)',
            brown: 'rgb(182, 152, 114)',
            gray: 'rgb(162, 162, 167)',
        },
    },
}

// TODO check colors (selection, light, paths...)
const createTheme = (theme, alpha = 1) => {
    const backgroundColor = withAlpha(macosColors.defaults[theme].backgroundColor, alpha);
    const borderColor = withAlpha(macosColors.defaults[theme].borderColor, alpha);
    const borderColorAlt = withAlpha(macosColors.defaults[theme].borderColorAlt, alpha);
    const foregroundColor = withAlpha(macosColors.defaults[theme].foregroundColor, alpha);
    const buttonColor = withAlpha(macosColors.vibrant[theme].gray, alpha);
    const accentColor = withAlpha(macosColors.vibrant[theme].blue, 0.8 * alpha);
    return {
        backgroundColor: theme === ThemeType.DARK ? 'rgba(0, 0, 0, 0.07)' : 'rgba(255, 255, 255, 0.07)',
        borderColor: 'transparent',
        cursorAccentColor: withAlpha('#FFFFFF', alpha),
        cursorColor: accentColor,
        selectionColor: withAlpha(macosColors.vibrant[theme].purple, 0.35 * alpha),
        foregroundColor,
        colors: {
            black: withAlpha('#333', alpha),
            white: withAlpha('#DFDFDF', alpha),
            red: withAlpha(macosColors.vibrant[theme].pink, alpha),
            green: withAlpha(macosColors.vibrant[theme].green, alpha),
            yellow: withAlpha(macosColors.vibrant[theme].orange, alpha),
            blue: withAlpha(macosColors.vibrant[theme].indigo, alpha),
            magenta: withAlpha(macosColors.vibrant[theme].purple, alpha),
            cyan: withAlpha(macosColors.vibrant[theme].cyan, alpha),
            lightBlack: withAlpha(macosColors.vibrant[theme].gray, alpha),
            lightWhite: withAlpha('#FFFFFF', alpha),
            lightRed: withAlpha(macosColors.vibrant[theme].red, alpha),
            lightGreen: withAlpha(macosColors.vibrant[theme].green, alpha),
            lightYellow: withAlpha(macosColors.vibrant[theme].yellow, alpha),
            lightBlue: withAlpha(macosColors.vibrant[theme].blue, alpha),
            lightMagenta: withAlpha(macosColors.vibrant[theme].purple, alpha),
            lightCyan: withAlpha(macosColors.vibrant[theme].mint, alpha),
            limeGreen: withAlpha(macosColors.vibrant[theme].green, alpha),
            lightCoral: withAlpha(macosColors.vibrant[theme].orange, alpha),
        },
        css: `
            .hyper_main {
                border: none;
            }
            .hyper_main::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
            }
            .hyper_main[data-has-sessions]::before {
                top: 37px
            }
            .header_header {
                top: 0;
                left: 0;
                right: 0;
            }
            .tabs_nav, .tabs_title {
                height: 37px;
                line-height: 37px;
            }
            .hyper_main::before, .tab_active, .tab_tab.tab_active:hover, div[data-has-sessions] .tabs_title {
                background-color: ${backgroundColor};
            }
            .tab_tab {
                border: none;
            }
            .tab_first {
                padding-left: 0;
            }
            .tabs_list {
                max-height: 37px;
                margin-right: 37px;
            }
            .tab_text, .tabs_title {
                height: 37px;
                color: ${withAlpha(foregroundColor, 0.5)};
                font-weight: bold;
            }
            .terms_terms {
                margin-top: 37px;
            }
            .tab_tab:hover {
                transition: background-color 0.1s ease;
                background-color: ${withAlpha(backgroundColor, 0.5)};
            }
            .tab_tab:hover > .tab_text {
                color: ${withAlpha(foregroundColor, 0.8)};
            }
            .tab_tab.tab_active > .tab_text, .tab_tab.tab_active:hover > .tab_text, .tabs_title {
                color: ${foregroundColor};
            }
            .tab_icon {
                top: 12px
                left: 7px;
                right: none;
                border-radius: 2px;
                color: ${foregroundColor};
            }
            .tab_icon:hover {
                background-color: ${borderColor};
            }
            .tab_add {
                position: absolute;
                right: 0;
                top: 0;
                height: 37px;
                width: 37px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: ${buttonColor};
            }
            .tab_add_icon {
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background-color 0.1s ease;
                border-radius: 4px;
            }
            .tab_add:hover .tab_add_icon {
                background-color: ${borderColor};
            }
            .splitpane_divider {
                background-color: ${borderColorAlt} !important;
            }
            .term_fit.term_active > .term_fit:not(.term_term) {
                opacity: 1;
                transition: opacity 0.2s ease;
                will-change: opacity;
            }
            .term_fit:not(.term_active) > .term_fit:not(.term_term) {
                opacity: 0.5;
            }
            .term_fit:not(.term_wrapper) {
                display: flex;
                flex-direction: column;
                overflow: hidden;
            }
            .term_fit:not(.term_wrapper) > .term_wrapper {
                flex-grow: 1;
            }
            .search_box {
                height: 36px;
                padding-bottom: 12px;
                z-index: 9999;
                display: flex;
                align-items: center;
            }
            .search_box_input {
                flex-grow: 1;
                position: relative;
            }
            .search_box_input > input {
                padding: 4px 88px 4px 30px;
                border: none;
                outline: none;
                border-radius: 4px;
                background-color: ${borderColorAlt};
                width: 100%;
                line-height: 16px
                color: ${foregroundColor};
            }
            .search_box_input > input::placeholder {
                color: ${buttonColor};
            }
            .search_box_input > input:focus {
                box-shadow: 0 0 0 3px ${accentColor};
            }
            .search_box_input > i {
                position: absolute;
                top: 3px
                color: ${buttonColor};
                font-style: normal;
                font-family: "SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif;
            }
            .search_box_input > i.label {
                left: 8px
            }
            .search_box_input > i.caseSensitive {
                right: 58px
            }
            .search_box_input > i.wholeWord {
                right: 30px
            }
            .search_box_input > i.regex {
                right: 8px
            }
            .search_box_input > .button {
                transition: all 0.1s ease;
                border-radius: 4px;
                padding: 0 4px;
            }
            .search_box_input > .button.active {
                color: ${accentColor} !important;
            }
            .search_box_input > .button:hover {
                background-color: ${buttonColor};
                color: ${backgroundColor};
            }
            .search_box_actions, .search_box_actions > .buttonGroup {
                display: flex;
                align-items: center;
                color: ${buttonColor};^
            }
            .search_box_actions .button {
                padding: 4px 6px;
                font-size: 14px;
                line-height: 12px;
                transition: background-color 0.1s ease;
            }
            .search_box_actions .button:hover {
                background-color: ${buttonColor};
            }
            .search_box_actions .button svg {
                transition: color 0.1s ease;
            }
            .search_box_actions .button:hover svg {
                color: ${backgroundColor};
            }
            .search_box_actions > .buttonGroup, .search_box_actions > .button {
                border: 1px solid ${buttonColor};
                border-radius: 4px;
                margin-left: 8px;
            }
            .search_box_actions > .buttonGroup > .button {
                border-left: 1px solid ${buttonColor};
            }
            .search_box_actions > .buttonGroup > .button:first-child {
                border-left: none;
            }
        `,
    }
};

const decorateConfig = (exports) => ({ forceDarkMode, ...config }) => {
    if (forceDarkMode) {
        nativeTheme.themeSource = 'dark';
    }

    const currentTheme = () => nativeTheme.shouldUseDarkColors ? ThemeType.DARK : ThemeType.LIGHT;

    exports.onWindow = (window) => {
        window.setVibrancy('hud');

        const updateTheme = () => {
            !window.isDestroyed() && window.rpc.emit('theme:updated', { theme: currentTheme(), focus: window.isFocused() });
        }

        nativeTheme.on('updated', updateTheme);
        window.on('blur', updateTheme);
        window.on('focus', updateTheme);
    }

    return {
        ...config,
        ...createTheme(currentTheme()),
    };
};

const mapHyperDispatch = (dispatch, map) => ({
    ...map,
    onThemeUpdated(theme, focus) {
        dispatch({
            type: 'CONFIG_RELOAD',
            config: createTheme(theme, focus ? 1 : 0.35),
        });
    },
});

module.exports = {
    decorateConfig,
    mapHyperDispatch,
}
