import React, { useEffect, useState } from 'react';
import "./styles.css";
import axios from 'axios';

type Person  = any;
type Location  = any;

const fetchData = () => {
  return axios.get('https://randomuser.me/api/?results=20')
  .then((res) => {
    const {results} = res.data;
    console.log(results);
    return results;
  })
  .catch((err) => {
    console.log(err);
  })
}

// {street : { name: "thing" }} => {streetName: "thing"}
// {street : { name: "thing" }} => {name: "thing"}

const flattenLocations= (locations: Location[]) => {
  const location = locations[0];
  console.log(locations);
  const flattenedLocationHeaders = extractObjectKeys(location);
 const data = []
 for (const {street, coordinates, timezone, ...rest} location2 of locations) {
data.push({
  ...location2,
  number: location2.street.number
})
 }
 
  return {headers: flattenedLocationHeaders, data: []}; 
  console.log(flattenedLocationHeaders);
};

const extractObjectKeys = (object: any) => {
  let objectKeys: string[] = [];

  Object.keys(object).forEach(objectKey => {
    const value = object[objectKey];
    if (typeof value !== 'object') {
      objectKeys.push(objectKey);
    } else {
      objectKeys = [...objectKeys, ... extractObjectKeys(value)];
    }
  })
  return objectKeys;
}
export default function App() {
  const [people, setPeople] = useState ([]);
  const [flattenedLocations, setFlattenedLocations] = useState ([]);

  useEffect (() => {
fetchData() .then(apiPeople => {
  setPeople(apiPeople);
  setFlattenedLocations(
    flattenLocations(apiPeople.map(({ location }) => location)));
  });
  }, []);

  return (
    <div className= "App">
      <h1> Hello sandbox </h1>
      <table>
        <thead>
          <tr>
          {flattenedLocations.map((locationString: string, locationIdx) => 
      <th key={locationIdx}>
        {locationString}
      </th>)}
            </tr>
          </thead>
      </table>
      {/* {flattenedLocations.map((locationString: string, locationIdx) => 
      <div key={locationIdx}>
        {locationString}
      </div>)} */}
      </div>
  );
  }

// https://randomuser.me/api/?results=20
// Create a table that has also the data inside a location and flatten the data
// 1st Create an Array that has the location data
// Create a single row of data from the location data
// Flattened the location object so that we only see the location
// Create a table