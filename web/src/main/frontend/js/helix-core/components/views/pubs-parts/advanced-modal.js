import * as React from 'react';
import * as PropTypes from 'prop-types';

import {
  Modal,
  ModalBody,
} from 'reactstrap';

import {
  EnumFacet,
} from '../../../model';

class AdvancedModal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      more: Object.keys(EnumFacet).reduce((result, key) => { result[EnumFacet[key]] = false; return result; }, {}),
    };

    this.textInput = React.createRef();
  }

  static propTypes = {
    facets: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    metadata: PropTypes.object.isRequired,
    minOptions: PropTypes.number,
    visible: PropTypes.bool.isRequired,
    changeText: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired,
    toggle: PropTypes.func.isRequired,
    toggleSearchFacet: PropTypes.func.isRequired,
  }

  static defaultProps = {
    minOptions: 4,
  }

  static contextTypes = {
    intl: PropTypes.object,
  }

  toggleMore(e, key) {
    e.preventDefault();
    this.setState({
      more: {
        ...this.state.more,
        [key]: !this.state.more[key],
      }
    });
  }

  onTextChanged(text) {
    this.props.changeText(text);
  }

  onFacetChanged(facet, value) {
    this.props.toggleSearchFacet(facet, value);
  }

  onSearch(e) {
    e.preventDefault();

    this.props.search();
  }

  renderParameters(key, title, items, valueProperty, textProperty, prefix, minOptions, showAll) {
    const size = Array.isArray(items) ? showAll ? items.length : Math.min(items.length, minOptions) : 0;
    if (size === 0) {
      return null;
    }

    return (
      <div className={`${key} param-box`}>
        <h5 className="title">{title}</h5>
        <div className="switches">
          {
            items.slice(0, size).map((value, index) => {
              const resolvedValue = valueProperty ? value[valueProperty] : value;
              const checked = !!this.props.facets[key].find(value => value === resolvedValue);

              return (
                <label htmlFor={`switch-${prefix}-${index}`} key={`switch-${prefix}-${index}`}>
                  <input
                    type="checkbox"
                    id={`switch-${prefix}-${index}`}
                    name={`switch-${prefix}-${index}`}
                    value={resolvedValue}
                    onChange={() => { this.onFacetChanged(key, resolvedValue); }}
                    checked={checked}
                  />
                  {textProperty ? value[textProperty] : value}
                </label>
              );
            })
          }
          {items.length > minOptions &&
            <div className="more-link">
              <a onClick={(e) => this.toggleMore(e, key)}>{showAll ? "View Less" : "View More"}</a>
            </div>
          }
        </div>
      </div>
    );
  }

  render() {
    const {
      metadata: { groups, organizations, licenses, formats, tags },
      minOptions,
      search: { text },
    } = this.props;
    const {
      more: {
        [EnumFacet.Group]: showAllGroups,
        [EnumFacet.Organization]: showAllOrganizations,
        [EnumFacet.License]: showAllLicenses,
        [EnumFacet.Format]: showAllFormats,
        [EnumFacet.Tag]: showAllTags
      },
    } = this.state;

    const _t = this.context.intl.formatMessage;

    return (
      <Modal
        isOpen={this.props.visible}
        toggle={this.props.toggle}
        centered={true}
        style={{ maxWidth: '1000px', height: '80vh' }}>
        <ModalBody>

          <div className="advanced-search">
            <form className="landing-search-form">

              <div className="row pt-2 pb-3">
                <div className="col">
                  <h4 className="news-header">Advanced Search</h4>
                </div>
                <div className="col text-right">
                  <i className="fa fa-remove btn" onClick={() => this.props.toggle()} />
                </div>
              </div>

              <div className="row">
                <div className="col text-center">
                  <input
                    type="text"
                    autoComplete="off"
                    className="search-text"
                    name="search-text" value=""
                    placeholder={_t({ id: 'search.placeholder' })}
                    value={text}
                    onChange={(e) => this.onTextChanged(e.target.value)}
                    ref={this.textInput}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-4">
                </div>
                <div className="col-4">
                  {this.renderParameters(EnumFacet.Organization, 'ORGANIZATIONS', organizations, 'name', 'title', 'org', minOptions, showAllOrganizations)}
                </div>
                <div className="col-4">
                  {this.renderParameters(EnumFacet.Group, 'TOPICS', groups, 'name', 'title', 'grp', minOptions, showAllGroups)}
                </div>
              </div>

              <div className="row">
                <div className="col-4">
                  {this.renderParameters(EnumFacet.Tag, 'TAGS', tags, 'name', 'display_name', 'tag', minOptions, showAllTags)}
                </div>
                <div className="col-4">
                  {this.renderParameters(EnumFacet.Format, 'FORMATS', formats, null, null, 'fmt', minOptions, showAllFormats)}
                </div>
                <div className="col-4">
                  {this.renderParameters(EnumFacet.License, 'LICENSES', licenses, 'id', 'title', 'lic', minOptions, showAllLicenses)}
                </div>
              </div>

              <section className="footer">
                <button
                  type="submit"
                  name="landing-search-button"
                  className="landing-search-button"
                  disabled={false}
                  onClick={(e) => this.onSearch(e)}>
                  <i className={this.props.loading ? 'fa fa-spin fa-spinner' : 'fa fa-search'}></i>
                </button>
              </section>

            </form>
          </div>

        </ModalBody>
      </Modal>
    );
  }
}

export default AdvancedModal;
