import * as React from 'react';
import * as PropTypes from 'prop-types';

import OpenLayersMap from 'ol/map';
import View from 'ol/view';

/**
 * A wrapper component for {@link OpenLayers.Map}.
 *
 * @class Map
 * @extends {React.Component}
 */
class Map extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      map: null,
    };
  }

  static propTypes = {
    center: PropTypes.arrayOf(PropTypes.number),
    zoom: PropTypes.number,
    minZoom: PropTypes.number,
    maxZoom: PropTypes.number,
    className: PropTypes.string,
  }

  static defaultProps = {
    center: [0, 0],
    zoom: 12,
    minZoom: 1,
    maxZoom: 19,
  }

  resize() {
    const map = this.state.map;

    if (map) {
      const container = map.getTargetElement();
      if (container) {
        // Set the map div to scroll so the map does not overflow
        container.style.overflow = 'scroll';
        // Call updateSize -- because the container is no longer overflowing the size is correct
        map.updateSize();
        // Hide the scrollbars
        container.style.overflow = 'hidden';
      }
    }
  }

  componentDidMount() {
    let map = new OpenLayersMap({
      layers: [],
      target: this._el,
      view: new View({
        center: this.props.center,
        minZoom: this.props.minZoom,
        maxZoom: this.props.maxZoom,
        zoom: this.props.zoom,
        projection: 'EPSG:3857',
      })
    });

    this.setState({ map });
    this.resize();
  }

  componentWillReceiveProps(nextProps) {
    const map = this.state.map;

    if (map && nextProps.center && (nextProps.center[0] !== this.props.center[0] || nextProps.center[1] !== this.props.center[1])) {
      map.getView().setCenter(nextProps.center);
    }
    if (map && nextProps.zoom && nextProps.zoom !== this.props.zoom) {
      map.getView().setZoom(nextProps.zoom);
    }

    this.resize();
  }

  componentWillUnmount() {
    if (this.state.map) {
      this.state.map.setTarget(null);
      this.setState({ map: null });
    }
  }

  render() {
    const children = this.props.children;
    const map = this.state.map;

    return (
      <div className={this.props.className || 'helix-map-container'} style={{ height: this.props.height || '600px' }} ref={(el) => { this._el = el; }}>
        {map &&
          React.Children.map(children, (child) => {
            return React.cloneElement(child, {
              map: this.state.map,
            });
          }, this)
        }
      </div>
    );
  }
}

export default Map;
