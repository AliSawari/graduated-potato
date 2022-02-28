import axios from "axios";


const URLS = {
  yomama: 'https://yomomma-api.herokuapp.com/jokes',
  excuses: 'https://excuser.herokuapp.com/v1/excuse',
  facts: 'https://api.aakhilv.me/facts',
  norris: 'https://api.chucknorris.io/jokes/random',
  nerd: 'https://corporatebs-generator.sameerkumar.website/'
}


export async function getJoke () {
  const response = await axios.get(URLS.yomama);
  return response.data.joke;
}


export async function getExcuse(){
  const response = await axios.get(URLS.excuses);
  return response.data[0].excuse;
}


export async function getFact(){
  const response = await axios.get(URLS.facts);
  return response.data[0];
}


export async function getNorris(){
  const response = await axios.get(URLS.norris);
  return response.data.value;
}


export async function getNerd(){
  const response = await axios.get(URLS.nerd);
  return response.data.phrase;
}
