import _ from 'lodash';
import * as React from 'react';
import * as ReactRedux from 'react-redux';
import * as PropTypes from 'prop-types';

import classnames from 'classnames';

import {
  bindActionCreators
} from 'redux';

import {
  search as searchAll,
  searchAutoComplete,
  setOpenaireFilter,
  setResultVisibility,
  setText,
  toggleAdvanced,
  toggleOpenaireProvider,
} from '../../ducks/ui/views/pubs';

import {
  EnumCatalog,
  StaticRoutes,
} from '../../model';

import {
  AdvancedModal,
} from './shared-parts';

import {
  ExploreItem,
  Result,
  SubjectItem,
} from './publications-parts';

class Publications extends React.Component {

  constructor(props) {
    super(props);

    this.onKeyDown = this.onKeyDown.bind(this);
    this.searchAutoComplete = _.debounce(this.props.searchAutoComplete, 400);

    this.textInput = React.createRef();

    this.state = {
      partialResultVisible: false,
    };
  }

  static contextTypes = {
    intl: PropTypes.object,
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown, false);
    this.props.setResultVisibility(false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown, false);
  }

  isTextValid(text) {
    return ((text) && (text.length > 2));
  }

  search(advanced = false) {
    const { text } = this.props.search;

    if (this.isTextValid(text)) {
      this.props.searchAll(text, advanced).then((data) => {
        const found = Object.keys(EnumCatalog).some((key) => {
          return (data.catalogs && data.catalogs[key] && data.catalogs[key].count !== 0);
        });

        if (found) {
          if (advanced) {
            this.props.toggleAdvanced();
          }
          this.props.history.push(StaticRoutes.PUBS_RESULTS);
        }
      });
    }
  }

  onTextChanged(value, refresh = true) {
    this.props.setText(value);

    if ((refresh) && (this.isTextValid(value))) {
      this.searchAutoComplete(value);
    }
  }

  onSearch(e) {
    e.preventDefault();

    this.search(false);
  }

  onKeyDown(e) {
    if (e.key === 'Escape') {
      this.props.setResultVisibility(false);
    }
  }

  render() {
    const { openaire } = this.props.config;
    const { advanced, partialResult: { visible, catalogs }, loading, text } = this.props.search;

    const _t = this.context.intl.formatMessage;

    return (

      <div>
        <section>
          <div className="landing-section">
            <div className="landing-section-background">

            </div>
            <div className="search-form-wrapper">
              <form className="landing-search-form">
                <div className="main-form-content">
                  <input
                    type="text"
                    autoComplete="off"
                    className="landing-search-text"
                    name="landing-search-text"
                    placeholder={_t({ id: 'pubs.search.placeholder' })}
                    value={text}
                    onChange={(e) => this.onTextChanged(e.target.value)}
                    onFocus={() => this.props.setResultVisibility(true)}
                    ref={this.textInput}
                  />
                  <div
                    className={
                      classnames({
                        'domain-pills': true,
                        'short': advanced,
                      })
                    }
                  >
                    <div
                      className={
                        classnames({
                          'advanced-search-link': true,
                          'hidden': advanced,
                        })
                      }
                      onClick={() => this.props.toggleAdvanced()}
                    >
                      {_t({ id: 'pubs.search.advanced-search' })}
                    </div>
                  </div>

                  <Result
                    hide={() => this.props.setResultVisibility(false)}
                    navigate={(url) => this.props.history.push(url)}
                    openaire={openaire}
                    result={catalogs[EnumCatalog.OPENAIRE]}
                    searchCatalog={() => this.search(false)}
                    visible={visible && !loading}
                  />

                </div>

                <button
                  type="submit"
                  name="landing-search-button"
                  className="landing-search-button"
                  disabled={loading}
                  onClick={(e) => this.onSearch(e)}
                >
                  <i className={loading ? 'fa fa-spin fa-spinner' : 'fa fa-search'}></i>
                </button>
              </form>
            </div>
          </div>
        </section>

        <section className="pubs-landing-page-content">

          <div className="featured-pubs-container container-fluid">
            <div className="row">

              <div className="col-sm-12">
                <h4 className="featured-pubs-header">
                  {_t({ id: 'pubs.featured' })}
                </h4>
              </div>

              <div className="col-md-3 col-sm-6 col-xs-12">
                <div className="featured-pubs-item">

                  <div className="date-of-entry">
                    Πριν από 8 ημέρες @ <a href="#">ΕΠΙΧΕΙΡΗΣΕΙΣ</a>
                  </div>

                  <a href="#">
                    <h3 className="featured-pubs-title">
                      Places of Ancient Monuments
                    </h3>
                  </a>

                  <div className="pubs-service">
                    <a href="#">ΓΕΝΙΚΗ ΓΡΑΜΜΑΤΕΙΑ</a>
                  </div>

                  <div className="tag-list">

                    <a href="#" className="tag-box">
                      <div>
                        SHAPEFILE
                      </div>
                    </a>

                    <a href="#" className="tag-box">
                      <div>
                        WMS
                      </div>
                    </a>

                    <a href="#" className="tag-box">
                      <div>
                        WFS
                      </div>
                    </a>
                  </div>

                </div>
              </div>

              <div className="col-md-3 col-sm-6 col-xs-12">
                <div className="featured-pubs-item">

                  <div className="date-of-entry">
                    Πριν από 8 ημέρες @ <a href="#">ΕΠΙΧΕΙΡΗΣΕΙΣ</a>
                  </div>

                  <a href="#">
                    <h3 className="featured-pubs-title">
                      Research for Data
                    </h3>
                  </a>

                  <div className="pubs-service">
                    <a href="#">ΓΕΝΙΚΗ ΓΡΑΜΜΑΤΕΙΑ</a>
                  </div>

                  <div className="tag-list">

                    <a href="#" className="tag-box">
                      <div>
                        SHAPEFILE
                      </div>
                    </a>

                    <a href="#" className="tag-box">
                      <div>
                        WMS
                      </div>
                    </a>

                    <a href="#" className="tag-box">
                      <div>
                        WFS
                      </div>
                    </a>
                  </div>

                </div>
              </div>

              <div className="col-md-3 col-sm-6 col-xs-12">
                <div className="featured-pubs-item">

                  <div className="date-of-entry">
                    Πριν από 8 ημέρες @ <a href="#">ΕΠΙΧΕΙΡΗΣΕΙΣ</a>
                  </div>

                  <a href="#">
                    <h3 className="featured-pubs-title">
                      Research for Data
                    </h3>
                  </a>

                  <div className="pubs-service">
                    <a href="#">ΓΕΝΙΚΗ ΓΡΑΜΜΑΤΕΙΑ</a>
                  </div>

                  <div className="tag-list">

                    <a href="#" className="tag-box">
                      <div>
                        SHAPEFILE
                      </div>
                    </a>

                    <a href="#" className="tag-box">
                      <div>
                        WMS
                      </div>
                    </a>

                    <a href="#" className="tag-box">
                      <div>
                        WFS
                      </div>
                    </a>
                  </div>

                </div>
              </div>

              <div className="col-md-3 col-sm-6 col-xs-12">
                <div className="featured-pubs-item">

                  <div className="date-of-entry">
                    Πριν από 8 ημέρες @ <a href="#">ΕΠΙΧΕΙΡΗΣΕΙΣ</a>
                  </div>

                  <a href="#">
                    <h3 className="featured-pubs-title">
                      Research for Data
                    </h3>
                  </a>

                  <div className="pubs-service">
                    <a href="#">ΓΕΝΙΚΗ ΓΡΑΜΜΑΤΕΙΑ</a>
                  </div>

                  <div className="tag-list">

                    <a href="#" className="tag-box">
                      <div>
                        SHAPEFILE
                      </div>
                    </a>

                    <a href="#" className="tag-box">
                      <div>
                        WMS
                      </div>
                    </a>

                    <a href="#" className="tag-box">
                      <div>
                        WFS
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>



          <div className="search-by-subject-container container-fluid">
            <div className="row">

              <div className="col-sm-12">
                <h4 className="search-by-subject-header">
                  {_t({ id: 'pubs.subject.title' })}
                </h4>
              </div>

              <div className="col-sm-12 search-by-subject-col">
                <div className="search-by-subject-border-bottom" />
              </div>

              <div className="col-md-3 col-sm-6 col-xs-12">
                <SubjectItem image="/images/svg/Humanities.svg" text={_t({ id: 'pubs.subject.items.humanities' })} />
              </div>

              <div className="col-md-3 col-sm-6 col-xs-12">
                <SubjectItem image="/images/svg/Business.svg" text={_t({ id: 'pubs.subject.items.business' })} />
              </div>

              <div className="col-md-3 col-sm-6 col-xs-12">
                <SubjectItem image="/images/svg/Agricultural.svg" text={_t({ id: 'pubs.subject.items.agricultural' })} />
              </div>

              <div className="col-md-3 col-sm-6 col-xs-12">
                <SubjectItem image="/images/svg/Environmental.svg" text={_t({ id: 'pubs.subject.items.environmental' })} />
              </div>

            </div>

            <div className="row">

              <div className="col-md-3 col-sm-6 col-xs-12">
                <SubjectItem image="/images/svg/Engineering.svg" text={_t({ id: 'pubs.subject.items.engineering' })} />
              </div>

              <div className="col-md-3 col-sm-6 col-xs-12">
                <SubjectItem image="/images/svg/Biological.svg" text={_t({ id: 'pubs.subject.items.biological' })} />
              </div>

              <div className="col-md-3 col-sm-6 col-xs-12">
                <SubjectItem image="/images/svg/Medical.svg" text={_t({ id: 'pubs.subject.items.medical' })} />
              </div>

              <div className="col-md-3 col-sm-6 col-xs-12">
                <SubjectItem image="/images/svg/Physical.svg" text={_t({ id: 'pubs.subject.items.sciences' })} />
              </div>

            </div>

          </div>

          <div className="explore-container container-fluid">
            <div className="row">

              <div className="col-sm-12">
                <h4 className="explore-header">
                  {_t({ id: 'pubs.explore.title' })}
                </h4>
              </div>

              <div className="col-sm-12 explore-col">
                <div className="explore-border-bottom">

                </div>
              </div>


              <div className="col-md-3 col-sm-6 col-xs-12">
                <ExploreItem
                  image="/images/svg/themes.svg"
                  text={_t({ id: 'pubs.explore.items.themes.title' })}
                  description={_t({ id: 'pubs.explore.items.themes.description' })}
                />
              </div>

              <div className="col-md-3 col-sm-6 col-xs-12">
                <ExploreItem
                  image="/images/svg/Services.svg"
                  text={_t({ id: 'pubs.explore.items.services-tools.title' })}
                  description={_t({ id: 'pubs.explore.items.services-tools.description' })}
                />
              </div>

              <div className="col-md-3 col-sm-6 col-xs-12">
                <ExploreItem
                  image="/images/svg/Opendata.svg"
                  text={_t({ id: 'pubs.explore.items.open-data.title' })}
                  description={_t({ id: 'pubs.explore.items.open-data.description' })}
                />
              </div>

              <div className="col-md-3 col-sm-6 col-xs-12">
                <ExploreItem
                  image="/images/svg/Grants.svg"
                  text={_t({ id: 'pubs.explore.items.projects.title' })}
                  description={_t({ id: 'pubs.explore.items.projects.description' })}
                />
              </div>

            </div>
          </div>
        </section>

        <AdvancedModal
          config={this.props.config}
          hideTabs={true}
          loading={this.props.search.loading}
          openaire={this.props.search.openaire}
          pills={{ data: false, pubs: true, lab: false }}
          search={() => this.search(true)}
          setOpenaireFilter={this.props.setOpenaireFilter}
          setText={(text) => this.onTextChanged(text, false)}
          text={this.props.search.text}
          toggle={this.props.toggleAdvanced}
          toggleDataFacet={() => null}
          toggleLabFacet={() => null}
          toggleOpenaireProvider={this.props.toggleOpenaireProvider}
          visible={advanced}
        />
      </div >
    );
  }
}

const mapStateToProps = (state) => ({
  config: state.config,
  locale: state.i18n.locale,
  news: state.ui.news,
  profile: state.user.profile,
  search: state.ui.pubs,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  searchAll,
  searchAutoComplete,
  setOpenaireFilter,
  setResultVisibility,
  setText,
  toggleAdvanced,
  toggleOpenaireProvider,
}, dispatch);

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
});

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps, mergeProps)(Publications);
