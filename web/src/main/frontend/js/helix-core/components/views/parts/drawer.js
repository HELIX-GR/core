import React from 'react';

import { injectIntl } from 'react-intl';

class Drawer extends React.Component {

  constructor(props) {
    super(props);

    this.parentRef = React.createRef();
  }

  static defaultProps = {
    type: 'item',
  }

  renderItem() {
    return (
      <div className="drawer__item drawer__item--noside" ref={this.parentRef} onClick={(e) => {
        const el = this.parentRef.current;

        if (!el.classList.contains('open')) {
          e.preventDefault();

          el.classList.add('open');
        }
      }}>
        <div className="drawer__item__title">WP<span>#1</span></div>
        <div className="drawer__item__content">
          <p>Το δίκτυο CLIMPACT επιδιώκει τη συνεργασία με την Εθνική Επιτροπή για την κλιματική αλλαγή, με την Επιτροπή Μελέτης Επιπτώσεων κλιματικής αλλαγής της Τράπεζας της Ελλάδος αλλά και με άλλες σχετικές πρωτοβουλίες και δράσεις ώστε να αποτελέσει πόλο έγκυρης και πολύπλευρης εμπειρογνωμοσύνης και συμβουλευτικό όργανο της Πολιτείας και της Κοινωνίας.</p>
          <p>Το δίκτυο CLIMPACT επιδιώκει τη συνεργασία με την Εθνική Επιτροπή για την κλιματική αλλαγή, με την Επιτροπή Μελέτης Επιπτώσεων κλιματικής αλλαγής της Τράπεζας της Ελλάδος αλλά και με άλλες σχετικές πρωτοβουλίες και δράσεις ώστε να αποτελέσει πόλο έγκυρης και πολύπλευρης εμπειρογνωμοσύνης και συμβουλευτικό όργανο της Πολιτείας και της Κοινωνίας.</p>
          <p>Το δίκτυο CLIMPACT επιδιώκει τη συνεργασία με την Εθνική Επιτροπή για την κλιματική αλλαγή, με την Επιτροπή Μελέτης Επιπτώσεων κλιματικής αλλαγής της Τράπεζας της Ελλάδος αλλά και με άλλες σχετικές πρωτοβουλίες και δράσεις ώστε να αποτελέσει πόλο έγκυρης και πολύπλευρης εμπειρογνωμοσύνης και συμβουλευτικό όργανο της Πολιτείας και της Κοινωνίας.</p>
        </div>
        <a href="#" className="drawer__item__trigger" onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();

          this.parentRef.current.classList.toggle('open');
        }}>
          <img src="/images/icons/big_arrow.svg" alt="" />
        </a>
      </div>
    );
  }

  renderLogo() {
    return (
      <div className="drawer__item drawer__item--logo" ref={this.parentRef} onClick={(e) => {
        const el = this.parentRef.current;

        if (!el.classList.contains('open')) {
          e.preventDefault();

          el.classList.add('open');
        }
      }}>
        <div className="drawer__item__side">
          <a href="#" ><img className="drawer__item__side__img" src="/images/logos/academy-vertical.png" alt="" /></a>
          <div className="drawer__item__side__bottom">
            <a href="#"><img src="/images/icons/link_icon.svg" alt="" /> academyofathens.gr</a>
          </div>
        </div>
        <div className="drawer__item__content">
          <h3>Ακαδημία Αθηνών</h3>
          <p>H Ακαδημία Αθηνών είναι πνευματικό ίδρυμα με στόχο την καλλιέργεια και την προαγωγή των Επιστημών, των Γραμμάτων και των Καλών Τεχνών, καθώς και την επιστημονική έρευνα και μελέτη. Λειτουργεί ως Νομικό Πρόσωπο Δημοσίου Δικαίου και εποπτεύεται από το Υπουργείο Παιδείας και Θρησκευμάτων.</p>
          <p>H Ακαδημία προβαίνει στην μελέτη και την έρευνα των προϊόντων και των στοιχείων της φύσης της χώρας, καθώς και την επιστημονική υποστήριξη και ενίσχυση της γεωργίας, της βιομηχανίας και της ναυτιλίας.[2]</p>
          <p>Σήμερα, στην Ακαδημία Αθηνών λειτουργούν 14 Ερευνητικά Κέντρα και 6 Γραφεία Ερευνών με εξειδικευμένες βιβλιοθήκες, καθώς και η κεντρική Bιβλιοθήκη «Ιωάννης Συκουτρής». Από το 2002 υπό την εποπτεία της Ακαδημίας Αθηνών λειτουργεί το Ίδρυμα Ιατροβιολογικών Ερευνών.</p>
        </div>
        <a href="#" className="drawer__item__trigger" onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();

          this.parentRef.current.classList.toggle('open');
        }}>
          <img src="/images/icons/big_arrow.svg" alt="" />
        </a>
      </div>
    );
  }

  renderTitle() {
    return (
      <div className="drawer__item drawer__item--title" ref={this.parentRef} onClick={(e) => {
        const el = this.parentRef.current;

        if (!el.classList.contains('open')) {
          e.preventDefault();

          el.classList.add('open');
        }
      }}>
        <div className="drawer__item__side">
          <div className="drawer__item__side__title">WP<span>#1</span></div>
        </div>
        <div className="drawer__item__content">
          <h4>Κλιματικές παράμετροι και εκτιμήσεις από το παλαιοκλίμα μέχρι το πρόσφατο παρελθόν</h4>
          <p>Το δίκτυο CLIMPACT επιδιώκει τη συνεργασία με την Εθνική Επιτροπή για την κλιματική αλλαγή, με την Επιτροπή Μελέτης Επιπτώσεων κλιματικής αλλαγής της Τράπεζας της Ελλάδος αλλά και με άλλες σχετικές πρωτοβουλίες και δράσεις ώστε να αποτελέσει πόλο έγκυρης και πολύπλευρης εμπειρογνωμοσύνης και συμβουλευτικό όργανο της Πολιτείας και της Κοινωνίας.</p>
          <p>Το δίκτυο CLIMPACT επιδιώκει τη συνεργασία με την Εθνική Επιτροπή για την κλιματική αλλαγή, με την Επιτροπή Μελέτης Επιπτώσεων κλιματικής αλλαγής της Τράπεζας της Ελλάδος αλλά και με άλλες σχετικές πρωτοβουλίες και δράσεις ώστε να αποτελέσει πόλο έγκυρης και πολύπλευρης εμπειρογνωμοσύνης και συμβουλευτικό όργανο της Πολιτείας και της Κοινωνίας.</p>
          <p>Το δίκτυο CLIMPACT επιδιώκει τη συνεργασία με την Εθνική Επιτροπή για την κλιματική αλλαγή, με την Επιτροπή Μελέτης Επιπτώσεων κλιματικής αλλαγής της Τράπεζας της Ελλάδος αλλά και με άλλες σχετικές πρωτοβουλίες και δράσεις ώστε να αποτελέσει πόλο έγκυρης και πολύπλευρης εμπειρογνωμοσύνης και συμβουλευτικό όργανο της Πολιτείας και της Κοινωνίας.</p>
        </div>
        <a href="#" className="drawer__item__trigger" onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();

          this.parentRef.current.classList.toggle('open');
        }}>
          <img src="/images/icons/big_arrow.svg" alt="" />
        </a>
      </div>
    );
  }

  render() {
    const { type } = this.props;

    switch (type) {
      case 'item':
        return this.renderItem();

      case 'logo':
        return this.renderLogo();

      case 'title':
        return this.renderTitle();

      default:
        return null;
    }
  }

}

export default injectIntl(Drawer);
