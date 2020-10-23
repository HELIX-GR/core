import React from 'react';


class Draggable extends React.Component {

  constructor(props) {
    super(props);

    this.sliderRef = React.createRef();

    this.isDown = false;
    this.startX = 0;
    this.isMoving = false;
    this.scrollLeft = 0;
  }

  componentDidMount() {

  }

  render() {
    const { children, className } = this.props;

    return (
      <div
        className={`${className} draggable`}
        ref={this.sliderRef}
        onMouseDown={(e) => {
          const el = this.sliderRef.current;

          this.isDown = true;
          el.classList.add('active');
          this.startX = e.pageX - el.offsetLeft;
          this.scrollLeft = el.scrollLeft;
        }}
        onMouseLeave={() => {
          const el = this.sliderRef.current;

          this.isDown = false;
          el.classList.remove('active');
          setTimeout(() => {
            this.isMoving = false;
          }, 300);
        }}
        onMouseUp={() => {
          const el = this.sliderRef.current;

          this.isDown = false;
          el.classList.remove('active');
          setTimeout(() => {
            this.isMoving = false;
          }, 300);
        }}
        onMouseMove={(e) => {
          const el = this.sliderRef.current;

          if (!this.isDown) return;
          this.isMoving = true;
          e.preventDefault();
          const x = e.pageX - el.offsetLeft;
          const walk = (x - this.startX) * 1; //scroll-fast
          el.scrollLeft = this.scrollLeft - walk;
        }}
      >
        {children && React.Children.map(children, (c) => {
          return React.cloneElement(c, {
            onClick: (e) => {
              if (this.isMoving) {
                e.preventDefault();
              } else {
                // Do not prevent custom event handler
                if (typeof c.props.onClick === 'function') {
                  c.props.onClick(e);
                }
              }
            },
          });
        })}
      </div>
    );
  }

}

export default Draggable;
