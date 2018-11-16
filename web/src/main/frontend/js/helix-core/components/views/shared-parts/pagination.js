import * as React from 'react';
import * as PropTypes from 'prop-types';

import classnames from 'classnames';

class Pagination extends React.Component {

  constructor(props) {
    super(props);
  }

  static contextTypes = {
    intl: PropTypes.object,
  }

  static propTypes = {
    pageIndex: PropTypes.number.isRequired,
    pageCount: PropTypes.number.isRequired,
    pageChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    pageIndex: 0,
    pageCount: 0,
  }

  onPageChange(e, index) {
    e.preventDefault();
    this.props.pageChange(index);
  }

  render() {
    const { pageIndex, pageCount: count } = this.props;
    const index = pageIndex + 1;
    const isFirst = index === 1;
    const isLast = index === count;
    const _t = this.context.intl.formatMessage;

    if (count === 0) {
      return null;
    }

    return (
      <div className={"breadcrumbs-pagination " + this.props.className}>
        <div className="breadcrumbs">
          <a href="#" className="breadcrumbs-part">{_t({ id: 'breadcrumb.results' })}</a>
          <a href="#" className="breadcrumbs-part last-part">{_t({ id: 'breadcrumb.all' })}</a>
        </div>

        <ul className="pagination-block">
          <ul>

            {index > 2 &&
              <li>
                <a onClick={(e) => this.onPageChange(e, 0)} className='pagination-item double-left-arrow'>{'<<'}</a>
              </li>
            }
            {index > 1 &&
              <li>
                <a onClick={(e) => this.onPageChange(e, index - 2)} className='pagination-item single-left-arrow'>{'<'}</a>
              </li>
            }

            <li className={
              classnames({
                'current-item': isFirst,
              })
            }>
              <a onClick={(e) => this.onPageChange(e, index < 3 ? 0 : index > count - 2 ? count - 3 : index - 2)} className="pagination-item">
                {index < 3 ? 1 : index > count - 2 ? count - 2 : index - 1}
              </a>
            </li>

            {count > 1 &&
              <li className={
                classnames({
                  'current-item': !isFirst && !isLast,
                })
              }>
                <a onClick={(e) => this.onPageChange(e, index < 3 ? 1 : index > count - 2 ? count - 2 : index - 1)} className="pagination-item">
                  {index < 3 ? 2 : index > count - 2 ? count - 1 : index}
                </a>
              </li>
            }

            {count > 2 &&
              <li className={
                classnames({
                  'current-item': isLast,
                })
              }>
                <a onClick={(e) => this.onPageChange(e, index < 3 ? 2 : index > count - 2 ? count - 1 : index)} className="pagination-item">
                  {index < 3 ? 3 : index > count - 2 ? count : index + 1}
                </a>
              </li>
            }

            {index < count &&
              <li>
                <a onClick={(e) => this.onPageChange(e, index)} className='pagination-item single-right-arrow'>></a>
              </li>
            }
            {index < (count - 1) &&
              <li>
                <a onClick={(e) => this.onPageChange(e, count - 1)} className='pagination-item double-right-arrow'>>></a>
              </li>
            }

          </ul>
        </ul>
      </div>
    );
  }

}

export default Pagination;
