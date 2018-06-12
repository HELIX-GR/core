import * as React from 'react';
import * as PropTypes from 'prop-types';

import classnames from 'classnames';

import {
  FormattedMessage,
} from 'react-intl';

class News extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="latest-news-container container-fluid">
        <div className="row">

          <div className="col-sm-12">
            <h4 className="latest-news-header">
              Latest News
          </h4>
          </div>

          <div className="col-md-6 col-sm-6 col-xs-12">
            <div className="latest-news-item">
              <div className="featured-image">
                <div className="aspect-ratio">
                  <a href="#" className="image-content" style={{ backgroundImage: 'url(/images/jpg/news-1.jpg)' }}>
                  </a>
                </div>
              </div>
              <div className="item-details">
                <div className="item-date">
                  24 Απρ 2018
              </div>
                <a href="#">
                  <h3 className="item-title">
                    Helix data principles: how well known or understood are they?
                </h3>
                </a>
                <div className="item-excerpt style-5">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-sm-6 col-xs-12">
            <div className="latest-news-item">
              <div href="#" className="featured-image">
                <div className="aspect-ratio">
                  <a href="#" className="image-content" style={{ backgroundImage: 'url(/images/jpg/news-2.jpg)' }}>
                  </a>
                </div>
              </div>
              <div className="item-details">
                <div className="item-date">
                  24 Απρ 2018
              </div>
                <a href="#">
                  <h3 className="item-title">
                    Helix, Nectar and RDS partnership
                </h3>
                </a>
                <div className="item-excerpt style-5">
                  Aligning research infrastructure Helix is partnering with Nectar and RDS to deliver transformation in the research sector.
              </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default News;
