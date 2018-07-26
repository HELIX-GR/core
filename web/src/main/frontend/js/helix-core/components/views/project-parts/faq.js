import * as React from 'react';
import { Collapse } from 'reactstrap';

class FAQ extends React.Component {

  constructor(props) {
    super(props);

    const page = this.props.page;

    this.sections = page ?
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
      null;

    this.state = { section: null };
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
    return (
      <div className="accordion-group" key={`section-${index}`}>
        <div className="accordion-heading" onClick={() => this.toggleSection(index)}>
          <a className="accordion-toggle">{section.header}</a>
        </div>
        <Collapse isOpen={this.state.section === index}>
          <div id={`faq-accordion-${index}`} >
            <div className="accordion-inner" dangerouslySetInnerHTML={{ __html: section.content }} />
          </div>
        </Collapse>
      </ div>
    );
  }

  render() {
    if (this.sections) {
      return (
        <div>
          <div id="faq-accordion" className="accordion">
            {this.sections.map((section, index) => this.renderSection(section, index))}
          </div>
        </div >
      );
    }
    return null;
  }
}

export default FAQ;
