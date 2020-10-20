import * as React from 'react';
import * as ReactRedux from 'react-redux';
import * as PropTypes from 'prop-types';

import { injectIntl } from 'react-intl';

import classnames from 'classnames';
import moment from '../../../moment-localized';

import {
  bindActionCreators
} from 'redux';

import {
  NavLink,
} from 'react-router-dom';

import {
  FormattedDate,
} from 'react-intl';

import {
  getPost,
} from '../../../ducks/ui/views/posts';

import {
  buildPath,
  DynamicRoutes,
  EnumPostCategory,
} from '../../../model';

const toggleSecureUrl = (content) => {
  return content.replace(/(http:\/\/)/g, 'https://');
};

const PARAM_ID = 'id';

class PostPage extends React.Component {

  constructor(props) {
    super(props);

    const id = this.getId(props);

    props.getPost(id);
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  getId(props) {
    const params = props.match.params;
    if (!isNaN(params[PARAM_ID])) {
      return +params[PARAM_ID];
    }
    return null;
  }

  getCategoryResourceId(category) {
    switch (category) {
      case EnumPostCategory.Blog:
        return 'breadcrumb.blog';
      case EnumPostCategory.DialogueForum:
        return 'breadcrumb.dialogue-forum';
      case EnumPostCategory.Newsletter:
        return 'breadcrumb.newsletter';
      case EnumPostCategory.OtherEvent:
        return 'breadcrumb.other-events';
      case EnumPostCategory.Workshop:
        return 'breadcrumb.workshops';
    }
    return null;
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentDidUpdate(prevProps) {
    const prevId = this.getId(prevProps);
    const nextId = this.getId(this.props);

    if (prevId !== nextId) {
      this.props.getPost(nextId);
    }
  }

  render() {
    const _t = this.props.intl.formatMessage;

    const {
      config: { wordPress: { categories } },
      posts: { current: p }
    } = this.props;


    if (!p) {
      return null;
    }

    // Convert category id to number
    const category = categories.find(c => +c.id === p.categories[0]);

    // Get featured image
    const imageUrl = (
      p._embedded && p._embedded['wp:featuredmedia'] && p._embedded['wp:featuredmedia'].length === 1 ?
        toggleSecureUrl(p._embedded['wp:featuredmedia'][0].source_url) :
        '/images/dummy_card.png'
    );

    // Get author
    const author = p['climpact_author'] || p._embedded.author[0].name;

    // Get interval since publication date or date
    const modifiedAt = moment(p.modified);
    const age = moment.duration(moment() - modifiedAt);
    const date = age.asHours() < 24 ?
      moment(modifiedAt).fromNow() :
      <FormattedDate value={p.modified} day='numeric' month='numeric' year='numeric' />;

    return (
      <main className="single page">
        <div className="single__layer" style={{ backgroundImage: `url(${imageUrl})` }}></div>

        <section className="hero">
          <div className="hero__wrapper">
            <div className="container container--md">
              <div className="hero__icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="27.438" height="32.97" viewBox="0 0 27.438 32.97">
                  <path id="Path_1600" data-name="Path 1600" d="M44.437,26.053a4.121,4.121,0,0,0-4.808,4.066v.934a9.616,9.616,0,0,0-5.494,8.681v3.18a2.746,2.746,0,0,1-.687,1.847l-2.486,2.747a3.571,3.571,0,0,0,2.63,5.961h4.663a5.494,5.494,0,0,0,10.989,0h4.663A3.571,3.571,0,0,0,56.559,47.5l-2.486-2.747a2.746,2.746,0,0,1-.687-1.847v-2.83a10.014,10.014,0,0,0-5.494-8.99v-.824A4.237,4.237,0,0,0,44.437,26.053ZM43.75,56.218A2.747,2.747,0,0,1,41,53.471H46.5A2.747,2.747,0,0,1,43.75,56.218Zm6.868-16.14v2.836A5.5,5.5,0,0,0,52.039,46.6l2.479,2.747a.824.824,0,0,1-.611,1.374H33.592a.824.824,0,0,1-.611-1.374L35.46,46.6a5.5,5.5,0,0,0,1.422-3.688v-3.18a6.868,6.868,0,0,1,4.581-6.47,1.373,1.373,0,0,0,.913-1.291V30.119a1.373,1.373,0,0,1,.488-1.044,1.31,1.31,0,0,1,.886-.33,1.4,1.4,0,0,1,.24,0,1.483,1.483,0,0,1,1.133,1.518v1.724a1.373,1.373,0,0,0,.893,1.284A7.322,7.322,0,0,1,50.618,40.078Z" transform="translate(-30.044 -25.995)" fill="#c9e9fc" />
                </svg>
              </div>
              <ul className="page__breadcrumbs">
                <li><a href="#">{_t({ id: 'breadcrumb.home' })}</a></li>
                <li><a href="#">{_t({ id: 'breadcrumb.news' })}</a></li>
                <li><a href="#">{_t({ id: this.getCategoryResourceId(category.name) })}</a></li>
                <li><a href="#">{p.title.rendered}</a></li>
              </ul>
              <h1>{p.title.rendered}</h1>
              <div className="hero__info"><strong>{author}</strong> • {date}</div>
            </div>
          </div>
        </section>

        <div className="container container--md" dangerouslySetInnerHTML={{ __html: toggleSecureUrl(p.content.rendered) }}>
        </div>
      </main>
    );
  }

}

const mapStateToProps = (state) => ({
  config: state.config,
  posts: state.ui.posts,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getPost,
}, dispatch);

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
});

export default injectIntl(ReactRedux.connect(mapStateToProps, mapDispatchToProps, mergeProps)(PostPage));
