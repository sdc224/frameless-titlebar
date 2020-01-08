import * as React from 'react';

const styles = {
  Icon: {
    height: '16px',
    width: '16px',
    margin: '0px 6px'
  }
};

type Props = {
  src: string,
  onIconClick?: () => void,
  notWin?: any
}

class Icon extends React.Component<Props> {
  render() {
    let { src, onIconClick, notWin } = this.props;
    let marginLeft = notWin ? 'auto' : '6px';
    return (
      <img
        src={src}
        alt='app-icon'
        onClick={onIconClick}
        style={{ ...styles.Icon, marginLeft }}
      />
    );
  }
}

export default Icon;
