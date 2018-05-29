import fetchJSON from './fetch-json';

const headers = {
  'accept': 'application/json',
  'Content-Type': 'application/json',
  'x-requested-with': 'XMLHttpRequest',
};

const formHeaders = {
  'accept': 'application/json',
  'x-requested-with': 'XMLHttpRequest',
};

export const submit = (url, token, form, method = 'POST') => fetchJSON(url, method, token, form, formHeaders);

export const get = (url, token) => fetchJSON(url, 'GET', token, null, headers);

export const post = (url, token, data) => fetchJSON(url, 'POST', token, JSON.stringify(data), headers);

export const put = (url, token, data) => fetchJSON(url, 'PUT', token, JSON.stringify(data), headers);

export const patch = (url, token, data) => fetchJSON(url, 'PATCH', token, JSON.stringify(data), headers);

export const _delete = (url, token) => fetchJSON(url, 'DELETE', token, null, headers);
