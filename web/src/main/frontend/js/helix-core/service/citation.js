/* global __dirname */

// Using required for brfs transformation
var fs = require('fs');

import CLS from 'citeproc';
import moment from '../moment-localized';

import {
  EnumLocale,
} from '../model';

const el = fs.readFileSync(__dirname + '/../../../assets/citation-style-language/locales/locales-el-GR.xml', 'utf8');
const en = fs.readFileSync(__dirname + '/../../../assets/citation-style-language/locales/locales-en-GB.xml', 'utf8');

const locales = {
  [EnumLocale.EL]: el,
  [EnumLocale.EN]: en,
};

export const EnumStyle = {
  ACM: 'acm-sig-proceedings',
  APA: 'apa-annotated-bibliography',
  BIBTEX: 'bibtex',
  CELL: 'cell',
  CHICAGO: 'chicago-annotated-bibliography',
  HARVARD: 'elsevier-harvard',
  IEEE: 'ieee',
};

const acm = fs.readFileSync(__dirname + '/../../../assets/citation-style-language/styles/acm-sig-proceedings.csl', 'utf8');
const apa = fs.readFileSync(__dirname + '/../../../assets/citation-style-language/styles/apa-annotated-bibliography.csl', 'utf8');
const bibtex = fs.readFileSync(__dirname + '/../../../assets/citation-style-language/styles/bibtex.csl', 'utf8');
const cell = fs.readFileSync(__dirname + '/../../../assets/citation-style-language/styles/cell.csl', 'utf8');
const chicago = fs.readFileSync(__dirname + '/../../../assets/citation-style-language/styles/chicago-annotated-bibliography.csl', 'utf8');
const harvard = fs.readFileSync(__dirname + '/../../../assets/citation-style-language/styles/elsevier-harvard.csl', 'utf8');
const ieee = fs.readFileSync(__dirname + '/../../../assets/citation-style-language/styles/ieee.csl', 'utf8');

const styles = {
  [EnumStyle.ACM]: acm,
  [EnumStyle.APA]: apa,
  [EnumStyle.BIBTEX]: bibtex,
  [EnumStyle.CELL]: cell,
  [EnumStyle.CHICAGO]: chicago,
  [EnumStyle.HARVARD]: harvard,
  [EnumStyle.IEEE]: ieee,
};

const publicationToCitation = (p) => {
  // container-title
  // accessed
  // DOI
  // language
  // page

  const dateOfAcceptance = moment(p.dateOfAcceptance);

  const citation = {
    id: p.objectIdentifier,
    type: p.journal ? 'article-journal' : 'article',
    title: p.title,
    author: p.creators.map(c => ({
      family: c.surname,
      given: c.name,
    })),
    issued: {
      'date-parts': [
        [
          dateOfAcceptance.year(),
        ]
      ]
    },
  };
  if (p.journal) {
    citation.issue = p.journal.issue;
    citation.volume = p.journal.vol;
    citation.eissn = p.journal.eissn;
    citation.issn = p.journal.issn;
    citation.lissn = p.journal.lissn;
  }

  return citation;
};

export const getCitation = (p, style) => {
  if ((!p) || (!p.dateOfAcceptance)) {
    return null;
  }

  const c = publicationToCitation(p);
  const citations = {
    [c.id]: c,
  };
  const sys = {
    retrieveLocale: () => locales[EnumLocale.EN],
    retrieveItem: (id) => citations[id],
  };
  const proc = new CLS.Engine(sys, styles[style]);
  proc.updateItems([c.id]);

  const result = proc.makeBibliography();
  return result[1].join('');
};
