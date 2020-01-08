import * as React from 'react';

const styles = {
  ResizeHandle: {
    position: 'absolute',
    top: 0,
    left: 0,
    WebkitAppRegion: 'no-drag'
  } as any,
  ResizeLeft: {
    width: '3px',
  } as any,
  ResizeTop: {
    width: '100%',
    height: '3px'
  } as any
};

type Props = {
  left?: boolean,
  top?: boolean,
  height?: any
}

class ResizeHandle extends React.Component<Props> {
  render() {
    const { height, left } = this.props;
    return (
      <div
        style={{ ...styles.ResizeHandle, ...(left ? styles.ResizeLeft : styles.ResizeTop), height }}
      />
    );
  }
}

export default ResizeHandle;
