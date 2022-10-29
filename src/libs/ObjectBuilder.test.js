import React from 'react'
import '@testing-library/jest-dom'
import {builder} from './ObjectBuilder';

describe("objectbuilder test suite",()=>{
    it("derived object should be equal to expected object",()=>{
        const derived = builder(constructorObject);
        expect(JSON.stringify(derived)).toBe(JSON.stringify(EXPECTED))
    })
})

// Oggetto costruttore
const constructorObject = {
  "name": "John",
  "surname": "Doe",
  "info.birthday": "1970/01/01",
  "info.skills.js": '4/5',
  "info.skills.python": '3/5',
  "info.skills.c++": '5/5',
}

// Oggetto derivato
const EXPECTED = {
  "name": "John",
  "surname": "Doe",
  "info": {
     "birthday": "1970/01/01",
     "skills": {
         "js": '4/5',
         "python": '3/5',
         "c++": '5/5',
     }
  }
}
