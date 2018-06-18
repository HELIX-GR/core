import * as React from 'react';

class Default extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <a href="#">
          <h4 className="about-details-header">
            About
          </h4>
        </a>

        <p>HELIX, the Hellenic Data Service, is the first cloud infrastructure in support of data-intensive research.</p>
        <p>You can share and discover data, find relevant publications, and experiment with data in any way you like.</p>
        <p>HELIX harvests, stores, and provides scientific data and publications directly from scientists themselves, or from institutional catalogues and repositories.</p>
        <p>HELIX provides its open services to all scientists and researchers in Greece, regardless of their location, scientific discipline, or experience.</p>
        <p>Learn more about HELIX and the services it provides!</p>

      </div >

    );
  }
}

export default Default;
