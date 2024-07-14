import $ from 'jquery';
import * as React from 'react';
import * as ReactRedux from 'react-redux';

import {
  bindActionCreators
} from 'redux';

import { injectIntl } from 'react-intl';

import AboutTemplate from './about-template';

const page = 'about-work-packages';

class WorkPackages extends React.Component {

  componentDidMount() {
    window.scrollTo(0, 0);

    $('#root').on('click', '.drawer__item', (e) => {
      const $el = $(e.currentTarget);

      if (!$el.hasClass('open')) {
        e.preventDefault();

        $el.addClass('open');
      }
    });

    $('#root').on('click', '.drawer__item__trigger', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const $el = $(e.currentTarget).closest('.drawer__item');

      $el.toggleClass('open');
    });
  }

  componentWillUnmount() {
    $('#root').off('click', '.drawer__item');

    $('#root').off('click', '.drawer__item__trigger');
  }

  render() {
    return (
      <AboutTemplate page={page} breadcrumb={'breadcrumb.work-packages'} />
    );
  }

}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
});

export default injectIntl(ReactRedux.connect(mapStateToProps, mapDispatchToProps, mergeProps)(WorkPackages));
