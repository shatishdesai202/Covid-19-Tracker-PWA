import React,{ useState, useEffect } from 'react';

import { Line } from 'react-chartjs-2' ;

import numeral from 'numeral';


function LineGraph() {

    const [data, setData] = useState({});

    useEffect( ()=>{

         fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=30")
            .then( (responce) => responce.json() )
            .then( (data) => {
                console.log('>>>',data)
                const date = [];
                const cases = [];

                console.log(data.cases);
                for( let x in data.cases ){
                    date.push(x);
                    
                }

                Object.keys(data.cases).map((k) => { 
                    let x = data.cases[k];
                    cases.push(x);  
                })
                    
                const dataX = {
                    labels: date,
                    datasets: [
                      {
                        label: 'Covid-19',
                        // fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(204, 16, 52, 0.5)',
                        borderColor: '#cc1034',
                        borderCapStyle: 'butt',
                        // borderDash: [],
                        // borderDashOffset: 0.0,
                        // borderJoinStyle: 'miter',
                        // pointBorderColor: 'rgba(75,192,192,1)',
                        // pointBackgroundColor: '#fff',
                        // pointBorderWidth: 1,
                        // pointHoverRadius: 5,
                        // pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        // pointHoverBorderColor: 'rgba(220,220,220,1)',
                        // pointHoverBorderWidth: 2,
                        // pointRadius: 1,
                        // pointHitRadius: 10,
                        data: cases
                      }
                    ]
                  };
                  setData(dataX);

            })
    },[]);

    // https://disease.sh/v3/covid-19/historical/all?lastdays=2

    return (
        <div>
            <Line  data={data} />
        </div>
    )
}

export default LineGraph
