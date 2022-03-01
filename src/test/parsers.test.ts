import axios from 'axios';
import { parseResult, URLS } from '../api';

describe("parsing the results", () => {

  const testObj = {
    joke: "hahaha!",
    someElse: 123
  }

  const testArr = [testObj]

  it("should parse the object response correctly without keyword", done => {
    expect(parseResult(testObj)).toBe(testObj.joke);
    done();
  })


  it("should parse the object response correctly with keyword", done => {
    expect(parseResult(testObj, "someElse")).toBe(testObj.someElse);
    done();
  })


  it("should parse the array response correctly without keyword", done => {
    expect(parseResult(testArr)).toBe(testObj.joke);
    done();
  })

  it("should parse the array response correctly with keyword", done => {
    expect(parseResult(testArr, "someElse")).toBe(testObj.someElse);
    done();
  })


})