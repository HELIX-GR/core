import * as React from 'react';

const toggleClass = (el, className) => {
  if (el.classList) {
    el.classList.toggle(className);
  } else {
    var classes = el.className.split(' ');
    var existingIndex = classes.indexOf(className);

    if (existingIndex >= 0)
      classes.splice(existingIndex, 1);
    else
      classes.push(className);

    el.className = classes.join(' ');
  }
};

class DebugConsole extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      foreground: false,
      showImage: false,
    };
  }

  onToggleBackground() {
    const el = document.getElementById('img-debug');
    toggleClass(el, 'd-none');
    this.setState({
      showImage: !this.state.showImage,
    });
  }

  onForeGroundChanged() {
    const el = document.getElementById('img-debug');
    toggleClass(el, 'debug-foreground');
    this.setState({
      foreground: !this.state.foreground,
    });
  }

  render() {
    const { foreground, showImage: visible } = this.state;

    return (
      <div className="debug-console-wrapper">
        <div>
          <label htmlFor="toggle-debug-image">
            <input
              type="checkbox"
              id="toggle-debug-image"
              name="toggle-debug-image"
              value={visible}
              onChange={() => { this.onToggleBackground(); }}
              checked={visible}
              style={{ marginRight: 5 }} />
            Display image
          </label>
        </div>
        <div>
          <label htmlFor="toggle-debug-image-z-index">
            <input
              type="checkbox"
              id="toggle-debug-image-z-index"
              name="toggle-debug-image-z-index"
              value={foreground}
              onChange={() => { this.onForeGroundChanged(); }}
              checked={foreground}
              style={{ marginRight: 5 }} />
            Foreground
          </label>
        </div>
      </div>
    );
  }
}

export default DebugConsole;
