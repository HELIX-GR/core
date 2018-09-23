import * as React from 'react';
import * as PropTypes from 'prop-types';

import {
  Modal,
  ModalBody,
} from 'reactstrap';

import {
  EnumCatalog,
  EnumCkanFacet,
} from '../../../model';

import {
  DataAdvancedOptions,
  LabAdvancedOptions,
  PubsAdvancedOptions,
} from '../shared-parts';

class AdvancedModal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      more: Object.keys(EnumCkanFacet).reduce((result, key) => { result[EnumCkanFacet[key]] = false; return result; }, {}),
      tab: EnumCatalog.CKAN,
    };

    this.textInput = React.createRef();
  }

  static propTypes = {
    ckan: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    minOptions: PropTypes.number,
    openaire: PropTypes.object.isRequired,
    search: PropTypes.func.isRequired,
    setOpenaireFilter: PropTypes.func.isRequired,
    setText: PropTypes.func.isRequired,
    text: PropTypes.string,
    toggle: PropTypes.func.isRequired,
    toggleCkanFacet: PropTypes.func.isRequired,
    toggleOpenaireProvider: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
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

  onTabChanged(tab) {
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

  render() {
    const { text } = this.props;
    const { tab } = this.state;

    const _t = this.context.intl.formatMessage;

    return (
      <Modal
        centered={true}
        isOpen={this.props.visible}
        keyboard={false}
        style={{ maxWidth: '1000px', height: '80vh' }}
        toggle={this.props.toggle}>
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
                    name="search-text"
                    placeholder={_t({ id: 'search.placeholder' })}
                    value={text}
                    onChange={(e) => this.onTextChanged(e.target.value)}
                    ref={this.textInput}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <div className="tabs">
                    <div className={`tab-item data text-center ${tab === EnumCatalog.CKAN ? 'selected' : ''}`}
                      onClick={() => this.onTabChanged(EnumCatalog.CKAN)}>
                      Data
                    </div>
                    <div className={`tab-item pubs text-center ${tab === EnumCatalog.OPENAIRE ? 'selected' : ''}`}
                      onClick={() => this.onTabChanged(EnumCatalog.OPENAIRE)}>
                      Publications
                    </div>
                    <div className={`tab-item lab text-center ${tab === EnumCatalog.LAB ? 'selected' : ''}`}
                      onClick={() => this.onTabChanged(EnumCatalog.LAB)}>
                      Lab
                    </div>
                  </div>
                </div>
              </div>

              {tab === EnumCatalog.CKAN &&
                <DataAdvancedOptions
                  facets={this.props.ckan.facets}
                  metadata={this.props.config.ckan}
                  minOptions={this.props.minOptions}
                  toggleFacet={this.props.toggleCkanFacet}
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
                <LabAdvancedOptions />
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

        </ModalBody>
      </Modal>
    );
  }
}

export default AdvancedModal;
