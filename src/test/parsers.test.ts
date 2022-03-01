import axios from 'axios';
import { parseResult, URLS } from '../api';

describe("parsing the results", () => {
  it("should parse the object response correctly without keyword", done => {
    const testString = {
      joke: "hahaha!"
    }
    expect(parseResult(testString)).toBe(testString.joke);
    done();
  })
})