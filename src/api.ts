import axios from "axios";

const URLS = {
  yomama: 'https://yomomma-api.herokuapp.com/jokes',
  excuses: 'https://excuser.herokuapp.com/v1/excuse',
  facts: 'https://api.aakhilv.me/fun/facts',
  norris: 'https://api.chucknorris.io/jokes/random',
  nerd: 'https://corporatebs-generator.sameerkumar.website/'
}


function parseResult(result: any, keyword?: string) {
  if (result.length) {
    result = result[0];
  }
  if (result && Object.keys(result).length) {
    if (keyword) return result[keyword];
    const [mine] = Object.keys(result);
    return result[mine];
  } else return result;
}


export async function getJoke() {
  const response = await axios.get(URLS.yomama);
  // return response.data.joke;
  return parseResult(response.data, "joke");
}


export async function getExcuse() {
  const response = await axios.get(URLS.excuses);
  // return response.data[0].excuse;
  return parseResult(response.data, "excuse");
}


export async function getFact() {
  const response = await axios.get(URLS.facts);
  // return response.data.data[0];
  return parseResult(response.data, "data")[0];
}


export async function getNorris() {
  const response = await axios.get(URLS.norris);
  // return response.data.value;
  return parseResult(response.data, "value");
}


export async function getNerd() {
  const response = await axios.get(URLS.nerd);
  // return response.data.phrase;
  return parseResult(response.data, "phrase");
}
