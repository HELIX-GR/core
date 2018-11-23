import * as React from 'react';
import * as PropTypes from 'prop-types';

import classnames from 'classnames';

class Advanced extends React.Component {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    visible: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div
        className={
          classnames({
            'closable': true,
            'visible': this.props.visible,
          })

        }
      >
        <div
          className="close-btn"
          onClick={() => this.props.toggle()}>
          CLOSE
        </div>

        <div className="search-options">
          <label htmlFor="input-organizations"><span className="label-content">ORGANIZATIONS</span>
            <input list="organizations" id="input-organizations" name="input-organizations" value="" placeholder="- SELECT -" />
            <a href=''> <i className="fa fa-search"></i> </a>
            <datalist id="organizations">
              <option value=""></option>
            </datalist>
          </label>
          <label htmlFor="input-tags"><span className="label-content">TAGS</span>
            <input list="tags" id="input-tags" name="input-tags" value="" placeholder="- SELECT -" />
            <a href=''> <i className="fa fa-search"></i> </a>
            <datalist id="tags">
              <option value=""></option>
            </datalist>
          </label>
          <label htmlFor="input-licences"><span className="label-content">LICENCES</span>
            <input list="licences" id="input-licences" name="input-licences" value="" placeholder="- SELECT -" />
            <a href=''> <i className="fa fa-search"></i> </a>
            <datalist id="licences">
              <option value=""></option>
            </datalist>
          </label>
          <label htmlFor="input-topics"><span className="label-content">TOPICS</span>
            <input list="topics" id="input-topics" name="input-topics" value="" placeholder="- SELECT -" />
            <a href=''> <i className="fa fa-search"></i> </a>
            <datalist id="topics">
              <option value=""></option>
            </datalist>
          </label>
          <label htmlFor="input-formats"><span className="label-content">FORMATS</span>
            <input list="formats" id="input-formats" name="input-formats" value="" placeholder="- SELECT -" />
            <a href=''> <i className="fa fa-search"></i> </a>
            <datalist id="formats">
              <option value=""></option>
            </datalist>
          </label>
        </div>
      </div>
    );
  }
}

export default Advanced;
