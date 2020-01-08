import * as React from 'react';
import { darkTheme, lightTheme } from './Theme/index';
import * as electron from 'electron';
import * as os from 'os';
import MenuBar from './MenuBar/index';
import WindowControls from './WindowControls/index';
import {
  Bar,
  Title,
  ResizeHandle,
  Icon
} from './components/index';

const currentWindow = electron.remote.getCurrentWindow();

type Props = {
  theme: any,
  platform: string
}

type State = {
  inActive: any
}

type PlatformChildrenProps = {
  icon?: string,
  app?: any,
  title?: string,
  platform: string,
  menu?: any,
  children?: any,
  currentTheme?: any,
  disableMaximize?: boolean,
  disableMinimize?: boolean,
  windowActions?: any,
  inActive?: any,
}

class TitleBar extends React.Component<Props, State> {
  private Menu: any;

  static defaultProps = {
    children: null,

    /* Main */
    icon: '',
    name: '',
    title: '',
    platform: '',
    theme: {},

    /* WindowControls */
    disableMinimize: false,
    disableMaximize: false,

    /* Menu */
    menu: []
  }

  constructor(props) {
    super(props);
    this.state = {
      inActive: !currentWindow.isFocused()
    };
    this.setKeyById = this.setKeyById.bind(this);
    this.getKeyById = this.getKeyById.bind(this);
    this._generatePlatformChildren = this._generatePlatformChildren.bind(this);
    this._handleBlur = this._handleBlur.bind(this);
    this._handleFocus = this._handleFocus.bind(this);
  }

  componentDidMount() {
    currentWindow.on('focus', this._handleFocus);
    currentWindow.on('blur', this._handleBlur);
  }

  componentWillUnmount() {
    currentWindow.removeListener('focus', this._handleFocus);
    currentWindow.removeListener('blur', this._handleBlur);
  }

  _handleBlur() {
    this._setInActive(true);
  }

  _handleFocus() {
    this._setInActive(false);
  }

  _setInActive(inActive) {
    this.setState({
      inActive
    });
  }

  setKeyById(id, key, value) {
    return this.Menu.setKeyById(id, key, value);
  }

  getKeyById(id, key) {
    return this.Menu.getKeyById(id, key);
  }

  _generatePlatformChildren({
    icon,
    app,
    title,
    platform,
    menu,
    children,
    currentTheme,
    disableMaximize,
    disableMinimize,
    windowActions,
    inActive,
  }: PlatformChildrenProps) {

    if (platform === 'darwin') {
      return (
        <Bar
          theme={currentTheme}
        >
          <ResizeHandle top />
          <ResizeHandle height={currentTheme.barHeight} left />
          {
            (icon && currentTheme.showIconDarwin) &&
            <Icon
              notWin
              src={icon}
            />
          }
          {
            (title || app) &&
            <Title
              theme={currentTheme}
              inActive={inActive}
              align="center"
            >
              {(title || app)}
            </Title>
          }
          {children}
        </Bar>
      );
    }

    if (currentTheme.menuStyle === 'stacked') {
      return (
        <React.Fragment>
          <Bar
            isWin
            inActive={inActive}
            theme={currentTheme}
          >
            <ResizeHandle top />
            <ResizeHandle height={currentTheme.winBarHeight} left />
            {
              (platform !== 'win32' && currentTheme.controlsLayout === 'left') &&
              <WindowControls
                isWin={platform === 'win32'}
                theme={currentTheme}
                disableMinimize={disableMinimize}
                disableMaximize={disableMaximize}
                windowActions={windowActions}
              />
            }
            {
              icon &&
              <Icon
                src={icon}
              />
            }
            {
              app &&
              <Title
                isWin
                inActive={inActive}
                theme={currentTheme}
                align="left"
              >
                {app}
              </Title>
            }
            {
              title &&
              <Title
                isWin
                inActive={inActive}
                theme={currentTheme}
                align="center"
              >
                {title}
              </Title>
            }
            {children}
            {
              (platform === 'win32' || (platform !== 'win32' && currentTheme.controlsLayout === 'right')) &&
              <WindowControls
                isWin={platform === 'win32'}
                theme={currentTheme}
                disableMinimize={disableMinimize}
                disableMaximize={disableMaximize}
                windowActions={windowActions}
              />
            }
          </Bar>
          <Bar
            isWin
            inActive={inActive}
            theme={currentTheme}
          >
            <MenuBar
              ref={r => { this.Menu = r; }}
              inActive={inActive}
              theme={currentTheme}
              menu={menu}
            />
          </Bar>
        </React.Fragment>
      );
    }

    return (
      <Bar
        isWin
        inActive={inActive}
        theme={currentTheme}
      >
        <ResizeHandle top />
        <ResizeHandle height={currentTheme.winBarHeight} left />
        {
          (platform !== 'win32' && currentTheme.controlsLayout === 'left') &&
          <WindowControls
            isWin={platform === 'win32'}
            theme={currentTheme}
            disableMinimize={disableMinimize}
            disableMaximize={disableMaximize}
            windowActions={windowActions}
          />
        }
        {
          currentTheme.menuStyle === 'vertical' &&
          <MenuBar
            ref={r => { this.Menu = r; }}
            theme={currentTheme}
            inActive={inActive}
            menu={menu}
          />
        }
        {
          icon &&
          <Icon
            src={icon}
          />
        }
        {
          app &&
          <Title
            isWin
            theme={currentTheme}
            inActive={inActive}
            align="left"
          >
            {app}
          </Title>
        }
        {
          currentTheme.menuStyle === 'horizontal' &&
          <MenuBar
            ref={r => { this.Menu = r; }}
            theme={currentTheme}
            inActive={inActive}
            menu={menu}
          />
        }
        {
          title &&
          <Title
            isWin
            theme={currentTheme}
            inActive={inActive}
            align="center"
          >
            {title}
          </Title>
        }
        {children}
        {
          (platform === 'win32' || (platform !== 'win32' && currentTheme.controlsLayout === 'right')) &&
          <WindowControls
            isWin={platform === 'win32'}
            theme={currentTheme}
            disableMinimize={disableMinimize}
            disableMaximize={disableMaximize}
            windowActions={windowActions}
          />
        }
      </Bar>
    );
  }

  render() {
    const {
      theme,
      platform
    } = this.props;

    const {
      inActive
    } = this.state;

    const currentTheme = {
      ...(theme.barTheme === 'light' ? lightTheme : darkTheme),
      ...theme
    };

    return this._generatePlatformChildren({
      ...this.props,
      currentTheme,
      inActive,
      platform: platform === 'default' ? os.platform() : (platform || os.platform())
    });
  }
}

export default TitleBar;
