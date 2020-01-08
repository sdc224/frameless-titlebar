import * as React from 'react';
import MenuItem from '../MenuItem/index';
import { defaultMenuItem } from '../../../utils/index';
import MenuListContainer from '../MenuListContainer/index';

export const SubMenuLabelStyle = {
  height: '20px',
  lineHeight: '20px',
  margin: '0px 10px',
  fontWeight: 'bold',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  direction: 'rtl',
  fontSize: '1em',
  textAlign: 'left',
  cursor: 'default',
} as any;

type Props = {
  theme: any,
  menuRef: any,
  changeCheckState: any,
  path: any,
  menuItem: any;
  menu?: any;
  level: number,
  renderSide: string,
  parentRect?: any
}

class SubMenu extends React.Component<Props> {
  private itemRef: any;

  static defaultProps = {
    menuItem: {},
    level: 1,
    renderSide: 'right',
    changeCheckState: () => { }
  }

  constructor(props: Props) {
    super(props);
    this._generateMenu = this._generateMenu.bind(this);
    this.setRef = this.setRef.bind(this);
  }

  setRef(ref) {
    this.itemRef = ref;
  }

  _generateMenu(menu: any = []) {
    const { theme } = this.props;
    return menu.map((menuItem, i) => {
      if (menuItem.submenu) {
        return (
          <SubMenu
            key={`${i}${menuItem.label}`}
            theme={theme}
            menuRef={this.props.menuRef}
            changeCheckState={this.props.changeCheckState}
            menuItem={{ ...defaultMenuItem, ...menuItem, type: 'submenu' }}
            path={[...this.props.path, i, 'submenu']}
          />
        );
      }

      return (
        <MenuItem
          indx={i}
          key={`${i}${menuItem.label}`}
          theme={theme}
          changeCheckState={this.props.changeCheckState}
          menuItem={{ ...defaultMenuItem, ...menuItem }}
          menuRef={this.props.menuRef}
          path={[...this.props.path]}
        />
      );
    });
  }

  render() {
    const {
      menuItem,
      // renderSide,
      theme
    } = this.props;

    return (
      <MenuItem
        rectRef={this.setRef}
        menu={this.props.menu}
        theme={theme}
        menuItem={{ ...defaultMenuItem, ...menuItem }}
      >
        <MenuListContainer
          theme={theme}
          parentRef={this.itemRef}
          rect={this.itemRef && this.itemRef.getBoundingClientRect()}
          submenu
        >
          {
            theme.menuSubLabelHeaders &&
            <div
              style={{
                ...SubMenuLabelStyle,
                color: theme.menuSubLabelColor
              }}
            >
              {menuItem.label}
            </div>
          }
          {
            this._generateMenu(menuItem.submenu)
          }
        </MenuListContainer>
      </MenuItem>
    );
  }
}

export default SubMenu;
