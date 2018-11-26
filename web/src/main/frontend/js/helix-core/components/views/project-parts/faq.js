import * as React from 'react';
import { Collapse } from 'reactstrap';

class Faq extends React.Component {

  constructor(props) {
    super(props);

    this.state = { section: null };
  }

  parseSections() {
    const page = this.props.page;

    return (page ?
      page.content.rendered.split('<h1>')
        .filter(text => !!text)
        .reduce((sections, value) => {
          const parts = value.split('</h1>');
          sections.push({
            header: parts[0],
            content: parts[1],
          });

          return sections;
        }, []) :
      null);
  }
  toggleSection(index) {
    const { section: current } = this.state;
    if (current === index) {
      this.setState({ section: null });
    } else {
      this.setState({ section: index });
    }

  }

  renderSection(section, index) {
    const isOpen = this.state.section === index;

    return (
      <div className="accordion-group" key={`section-${index}`}>
        <div className="accordion-header" onClick={() => this.toggleSection(index)}>
          <a className="title">{section.header}</a>
          <i className={isOpen ? 'fa fa-caret-up handle' : 'fa fa-caret-down handle'} />
        </div>
        <Collapse isOpen={isOpen}>
          <div id={`faq-accordion-${index}`} >
            <div className="accordion-content" dangerouslySetInnerHTML={{ __html: section.content }} />
          </div>
        </Collapse>
      </ div>
    );
  }

  render() {
    const sections = this.parseSections();

    if (sections) {
      return (
        <div>
          <div id="faq-accordion" className="accordion about-text">
            {sections.map((section, index) => this.renderSection(section, index))}
          </div>
        </div>
      );
    }
    return null;
  }
}

export default Faq;
