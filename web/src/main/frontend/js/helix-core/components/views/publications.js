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
                    placeholder={_t({ id: 'search.pubs.placeholder' })}
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
                      ADVANCED SEARCH
                    </div>
                  </div>

                  <Result
                    openaire={openaire}
                    result={catalogs[EnumCatalog.OPENAIRE]}
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
                  Featured Publications
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
                  Search by subject
                </h4>
              </div>

              <div className="col-sm-12 search-by-subject-col">
                <div className="search-by-subject-border-bottom" />
              </div>

              <div className="col-md-3 col-sm-6 col-xs-12">
                <SubjectItem image="/images/svg/Humanities.svg" text="Humanities and Social Sciences" />
              </div>

              <div className="col-md-3 col-sm-6 col-xs-12">
                <SubjectItem image="/images/svg/Business.svg" text="Business, Economics and Law" />
              </div>

              <div className="col-md-3 col-sm-6 col-xs-12">
                <SubjectItem image="/images/svg/Agricultural.svg" text="Agricultural and Veterinary Sciences" />
              </div>

              <div className="col-md-3 col-sm-6 col-xs-12">
                <SubjectItem image="/images/svg/Environmental.svg" text="Environmental Sciences" />
              </div>

            </div>

            <div className="row">

              <div className="col-md-3 col-sm-6 col-xs-12">
                <SubjectItem image="/images/svg/Engineering.svg" text="Engineering, Computing and Technology" />
              </div>

              <div className="col-md-3 col-sm-6 col-xs-12">
                <SubjectItem image="/images/svg/Biological.svg" text="Biological Sciences" />
              </div>

              <div className="col-md-3 col-sm-6 col-xs-12">
                <SubjectItem image="/images/svg/Medical.svg" text="Medical and Health" />
              </div>

              <div className="col-md-3 col-sm-6 col-xs-12">
                <SubjectItem image="/images/svg/Physical.svg" text="Physical, Chemical and Mathematical Sciences" />
              </div>

            </div>

          </div>

          <div className="explore-container container-fluid">
            <div className="row">

              <div className="col-sm-12">
                <h4 className="explore-header">
                  Explore
                </h4>
              </div>

              <div className="col-sm-12 explore-col">
                <div className="explore-border-bottom">

                </div>
              </div>


              <div className="col-md-3 col-sm-6 col-xs-12">
                <ExploreItem
                  image="/images/svg/themes.svg"
                  text="Themed Collections"
                  description="Explore selected resources by theme"
                />
              </div>

              <div className="col-md-3 col-sm-6 col-xs-12">
                <ExploreItem
                  image="/images/svg/Services.svg"
                  text="TServices and Tools"
                  description="Access data-related services and tools"
                />
              </div>

              <div className="col-md-3 col-sm-6 col-xs-12">
                <ExploreItem
                  image="/images/svg/Opendata.svg"
                  text="Open Data"
                  description="Find open data that is reusable"
                />
              </div>

              <div className="col-md-3 col-sm-6 col-xs-12">
                <ExploreItem
                  image="/images/svg/Grants.svg"
                  text="Grants and Projects"
                  description="Search for research grants and projects"
                />
              </div>

            </div>
          </div>
        </section>

        <AdvancedModal
          config={this.props.config}
          loading={this.props.search.loading}
          openaire={this.props.search.openaire}
          search={() => this.search(true)}
          setOpenaireFilter={this.props.setOpenaireFilter}
          setText={(text) => this.onTextChanged(text, false)}
          text={this.props.search.text}
          toggle={this.props.toggleAdvanced}
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
