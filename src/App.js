import React, {useState, useEffect} from 'react';
import './App.css';

import { FormControl, MenuItem, Select, Card, CardContent } from '@material-ui/core';

import InfoBox from './component/InfoBox';
import MapX from './component/Mapx';
import Table from './component/Table';
import LineGraph from './component/LineGraph';

import {sortData} from './util';

import 'leaflet/dist/leaflet.css';

function App() {

  const [country, setCountry] = useState([]);

  const [globle, setGloble] = useState('Globle');

  const [countryInfo, setCountryInfo] = useState({});

  const [tableData, setTableData] = useState([]);

  const [mapCenter, setMapCenter] = useState({lat: 20.5937, lng:78.9629});

  const [mapZoom, setMapZoom] = useState(5);

  const [mapCountries, setMapCountries] = useState([]);

  const [caseType, setCaseType] = useState('cases');


  useEffect( ()=>{

    fetch("https://disease.sh/v3/covid-19/all")
      .then( (responce) => responce.json() )
      .then( data => {
        setCountryInfo(data)
      })
  }, []);

  useEffect(()=>{

    const getCountryData = async () =>{

      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((responce) => responce.json())
        .then( async(data) => {

          

          const countries = data.map( (country) => (
            
            {
              name: country.country,
              value: country.countryInfo.iso2,
            }
            ));

            const sortedData = sortData(data);

            setTableData(sortedData);
            setCountry(countries);
            setMapCountries(data);
            // console.log('>>>',data);
            // console.log(tableData);        
        });
    }

    getCountryData();

  },[]);

  const onChangeCountryChange = async (e)=>{

    // console.log(e.target.value);
    const countryCode = e.target.value;
    // console.log(countryCode);
    
    const url = countryCode === 'Globle' ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`
    
    await fetch(url)
    .then( (responce) => responce.json())
    .then((data) => {
        setGloble(countryCode);
        console.log(data)
        setCountryInfo(data)
         
        setMapZoom(4);
        //  console.log('???',mapCenter);
        
        const mapObj = countryCode === "Globle"
        ? setMapCenter([20.5937,78.9629])
        : setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        // setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapCenter(mapObj);
        
      })
      console.log('<<<',caseType)
    
    }
    
    // console.log(countryInfo);

  return (
    <div className="app">

      <div className="app__left">
          <div className="app__header">
            <h1> COVID -19 TRACKER </h1>      
            <FormControl className="app__dropdown">
              
              <Select variant="outlined" onChange={onChangeCountryChange} value={globle}>
                <MenuItem value='Globle'>globle</MenuItem>
                
                {
                  country.map( (country)=> (
                    <MenuItem key={country.name} value={country.value} >{country.name}</MenuItem>
                  ))
                }

                {/* <MenuItem value="1" >1</MenuItem>
                <MenuItem value="1" >1</MenuItem>
                <MenuItem value="1" >1</MenuItem>
                <MenuItem value="1" >1</MenuItem> */}
              
              </Select>
            
            </FormControl>
        </div>
        
        <div className="app__stats">
        
          <InfoBox isRed active={caseType === "cases"} onClick={e => setCaseType('cases')} title="CoronaVirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}  />
          <InfoBox  active={caseType === "recovered"} onClick={e => setCaseType('recovered')} title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <InfoBox isRed active={caseType === "deaths"} onClick={e => setCaseType('deaths')} title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        
        </div>
        
        <div className="app__map">
          
            <MapX casesType={caseType} countries={mapCountries} center={ mapCenter } zoom={ mapZoom }/>
        </div>

      </div>

      <Card className="app__right">
        <CardContent>
          
          <h2>Live Cases Country Wise</h2>

          {/* TABLE  */}

          <Table countries={tableData} />      
          <h3>Last 1 Month Cases</h3>

          {/* LINE GRAPH */}
          <LineGraph casesType={caseType}  />
        
        </CardContent>
      </Card>

    </div>
  )
}

export default App;
