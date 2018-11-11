import * as React from 'react';
import * as PropTypes from 'prop-types';

import {
  EnumCkanFacet,
} from '../../../model';

class CkanAdvancedOptions extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      more: Object.keys(EnumCkanFacet).reduce((result, key) => { result[EnumCkanFacet[key]] = false; return result; }, {}),
    };
  }

  static propTypes = {
    facets: PropTypes.object.isRequired,
    metadata: PropTypes.object.isRequired,
    minOptions: PropTypes.number,
    toggleFacet: PropTypes.func.isRequired,
  }

  static defaultProps = {
    minOptions: 4,
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

  onFacetChanged(facet, value) {
    this.props.toggleFacet(facet, value);
  }

  renderParameters(key, title, items, valueProperty, textProperty, prefix, minOptions, showAll) {
    const size = Array.isArray(items) ? showAll ? items.length : Math.min(items.length, minOptions) : 0;
    if (size === 0) {
      return null;
    }

    return (
      <div className={`${key} param-box ${showAll ? '' : 'less'}`}>
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
    } = this.props;
    const {
      more: {
        [EnumCkanFacet.Group]: showAllGroups,
        [EnumCkanFacet.Organization]: showAllOrganizations,
        [EnumCkanFacet.License]: showAllLicenses,
        [EnumCkanFacet.Format]: showAllFormats,
        [EnumCkanFacet.Tag]: showAllTags
      },
    } = this.state;

    return (
      <div className="fields">
        <div className="row">
          {organizations.length !== 0 &&
            <div className="col-4">
              {this.renderParameters(EnumCkanFacet.Organization, 'ORGANIZATIONS', organizations, 'name', 'title', 'org', minOptions, showAllOrganizations)}
            </div>
          }
          {groups.length !== 0 &&
            <div className="col-4">
              {this.renderParameters(EnumCkanFacet.Group, 'TOPICS', groups, 'name', 'title', 'grp', minOptions, showAllGroups)}
            </div>
          }
          {tags.length !== 0 &&
            <div className="col-4">
              {this.renderParameters(EnumCkanFacet.Tag, 'TAGS', tags, 'name', 'display_name', 'tag', minOptions, showAllTags)}
            </div>
          }
          {formats.length !== 0 &&
            <div className="col-4">
              {this.renderParameters(EnumCkanFacet.Format, 'FORMATS', formats, null, null, 'fmt', minOptions, showAllFormats)}
            </div>
          }
          {licenses.length !== 0 &&
            <div className="col-4">
              {this.renderParameters(EnumCkanFacet.License, 'LICENSES', licenses, 'id', 'title', 'lic', minOptions, showAllLicenses)}
            </div>
          }
        </div>
      </div>
    );
  }
}

export default CkanAdvancedOptions;
