import * as React from 'react';
import * as PropTypes from 'prop-types';

import classnames from 'classnames';

import {
  Modal,
} from 'reactstrap';

import {
  FormattedMessage,
} from 'react-intl';

import {
  EnumCatalog,
} from '../../../model';

import {
  CkanAdvancedOptions,
  PubsAdvancedOptions,
} from '../shared-parts';

class AdvancedModal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tab: EnumCatalog.CKAN,
    };

    this.textInput = React.createRef();
  }

  static propTypes = {
    config: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    lab: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    minOptions: PropTypes.number,
    openaire: PropTypes.object.isRequired,
    pills: PropTypes.object.isRequired,
    search: PropTypes.func.isRequired,
    setOpenaireFilter: PropTypes.func.isRequired,
    setText: PropTypes.func.isRequired,
    text: PropTypes.string,
    toggle: PropTypes.func.isRequired,
    toggleDataFacet: PropTypes.func.isRequired,
    toggleLabFacet: PropTypes.func.isRequired,
    toggleOpenaireProvider: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    minOptions: 4,
  }

  static contextTypes = {
    intl: PropTypes.object,
  }

  onTabChanged(e, tab) {
    e.preventDefault();
    this.setState({
      tab,
    });
  }

  onTextChanged(text) {
    this.props.setText(text);
  }

  onSearch(e) {
    e.preventDefault();

    this.props.search();
  }

  resolveActiveTab() {
    const { pills } = this.props;
    const { tab } = this.state;

    let result = tab;
    if ((result === EnumCatalog.CKAN) && (!pills.data)) {
      result = EnumCatalog.OPENAIRE;
    }
    if ((result === EnumCatalog.OPENAIRE) && (!pills.pubs)) {
      result = EnumCatalog.LAB;
    }
    return result;
  }

  renderTabs(selected) {
    const { pills } = this.props;
    const _t = this.context.intl.formatMessage;
    const tabs = [];

    if (pills.data) {
      tabs.push(
        <li key="tab-data" className={selected === EnumCatalog.CKAN ? 'active' : ''}>
          <a href="" onClick={(e) => this.onTabChanged(e, EnumCatalog.CKAN)}>{_t({ id: 'advanced-search.tabs.data' })}</a>
        </li>
      );
    }
    if (pills.pubs) {
      tabs.push(
        <li key="tab-pubs" className={selected === EnumCatalog.OPENAIRE ? 'active' : ''}>
          <a href="" onClick={(e) => this.onTabChanged(e, EnumCatalog.OPENAIRE)}>{_t({ id: 'advanced-search.tabs.pubs' })}</a>
        </li>
      );
    }
    if (pills.lab) {
      tabs.push(
        <li key="tab-lab" className={selected === EnumCatalog.LAB ? 'active' : ''}>
          <a href="" onClick={(e) => this.onTabChanged(e, EnumCatalog.LAB)}>{_t({ id: 'advanced-search.tabs.lab' })}</a>
        </li>
      );
    }
    for (let i = tabs.length; i < 3; i++) {
      tabs.push(<li key={`tab-blank-${i}`}></li>);
    }

    return tabs;
  }

  render() {
    const { pills, text } = this.props;
    const tab = this.resolveActiveTab();
    const _t = this.context.intl.formatMessage;

    const catalogs = [
      pills.data ? _t({ id: 'advanced-search.placeholder.data' }) : null,
      pills.pubs ? _t({ id: 'advanced-search.placeholder.pubs' }) : null,
      pills.lab ? _t({ id: 'advanced-search.placeholder.lab' }) : null,
    ].filter(text => text).join(', ');

    return (
      <Modal
        centered={true}
        isOpen={this.props.visible}
        keyboard={false}
        style={{ maxWidth: '1024px' }}
        toggle={this.props.toggle}>

        <div
          className={
            classnames({
              "advanced-search": true,
              "data": tab === EnumCatalog.CKAN,
              'pubs': tab === EnumCatalog.OPENAIRE,
              'lab': tab === EnumCatalog.LAB,
            })
          }
        >
          <a href="" className="close" onClick={(e) => { e.preventDefault(); this.props.toggle(); }}></a>

          <div className="form-title">
            <FormattedMessage id="advanced-search.title" defaultMessage="Advanced Search" />
          </div>

          <form>
            <div className="text-center">
              <input
                type="text"
                autoComplete="off"
                className="search-text"
                name="search-text"
                placeholder={_t({ id: 'advanced-search.placeholder.prefix' }, { catalogs })}
                value={text}
                onChange={(e) => this.onTextChanged(e.target.value)}
                ref={this.textInput}
              />
            </div>


            <div className="nav-bar-wrapper">
              <div className="nav-bar">
                <div className="nav-menu">
                  {this.renderTabs(tab)}
                </div>
              </div>
            </div>

            {tab === EnumCatalog.CKAN &&
              <CkanAdvancedOptions
                facets={this.props.data.facets}
                metadata={this.props.config.data}
                minOptions={this.props.minOptions}
                toggleFacet={this.props.toggleDataFacet}
              />
            }

            {tab === EnumCatalog.OPENAIRE &&
              <PubsAdvancedOptions
                filters={this.props.openaire}
                metadata={this.props.config.openaire}
                setOpenaireFilter={this.props.setOpenaireFilter}
                toggleProvider={this.props.toggleOpenaireProvider}
              />
            }

            {tab === EnumCatalog.LAB &&
              <CkanAdvancedOptions
                facets={this.props.lab.facets}
                metadata={this.props.config.lab}
                minOptions={this.props.minOptions}
                toggleFacet={this.props.toggleLabFacet}
              />
            }

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
      </Modal>
    );
  }
}

export default AdvancedModal;
