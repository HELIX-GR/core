import _ from 'lodash';
import * as React from 'react';
import * as ReactRedux from 'react-redux';
import * as PropTypes from 'prop-types';

import classnames from 'classnames';

import {
  bindActionCreators
} from 'redux';

import {
  getLatestPosts,
} from '../../ducks/ui/views/news';

import {
  changeText,
  search as searchAll,
  searchAutoComplete,
  toggleAdvanced,
  toggleSearchFacet,
  setResultVisibility,
} from '../../ducks/ui/views/search';

import {
  EnumCatalog,
  StaticRoutes,
} from '../../model';

import {
  AdvancedModal,
  Result,
} from './pubs-parts';

import {
  ExploreItem,
  SubjectItem,
} from './publication-parts';

class Publications extends React.Component {

  constructor(props) {
    super(props);

    this.searchAutoComplete = _.debounce(this.props.searchAutoComplete, 400);

    this.textInput = React.createRef();
  }

  static contextTypes = {
    intl: PropTypes.object,
  }

  isTextValid(text) {
    return ((text) && (text.length > 2));
  }

  search(advanced = false) {
    const { text } = this.props.search;

    if (this.isTextValid(text)) {
      this.props.searchAll(text, advanced).then((data) => {
        const found = Object.keys(EnumCatalog).some((key) => {
          return (data.catalogs[key] && data.catalogs[key].count !== 0);
        });

        if (found) {
          this.props.history.push(StaticRoutes.RESULTS);
        }
      });
    }
  }

  onTextChanged(value, refresh = true) {
    this.props.changeText(value);

    if ((refresh) && (this.isTextValid(value))) {
      this.searchAutoComplete(value);
    }
  }

  onSearch(e) {
    e.preventDefault();

    this.search(false);
  }

  componentDidMount() {
    this.props.getLatestPosts(2);
  }

  render() {
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
                    placeholder={_t({ id: 'search.placeholder' })}
                    value={text}
                    onChange={(e) => this.onTextChanged(e.target.value)}
                    onFocus={() => this.props.setResultVisibility(true)}
                    onBlur={() => this.props.setResultVisibility(false)}
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

                  {/* TODO: Use autoComplete result */}
                  <Result
                    visible={visible && !loading}
                    result={catalogs}
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
          facets={this.props.search.facets}
          loading={this.props.search.loading}
          metadata={this.props.config.ckan}
          visible={advanced}
          changeText={(text) => this.onTextChanged(text, false)}
          search={() => this.search(true)}
          toggle={this.props.toggleAdvanced}
          toggleSearchFacet={this.props.toggleSearchFacet}
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
  search: state.ui.search,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  changeText,
  getLatestPosts,
  searchAll,
  searchAutoComplete,
  toggleAdvanced,
  toggleSearchFacet,
  setResultVisibility,
}, dispatch);

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
});

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps, mergeProps)(Publications);
