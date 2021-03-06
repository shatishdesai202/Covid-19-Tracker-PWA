import React from 'react';
import {Card, CardContent, Typography} from '@material-ui/core';
import './infoBox.css'

function InfoBox({ title, cases, active, total, isRed,...props}) {
    return (

        <Card onClick={props.onClick} className={`infoBox ${active && "infoBox--selected"} ${isRed && "infoBox--red"}`}>
            <CardContent>
                
               <Typography className="infoBox__title">
                    {title}
               </Typography>
               
               <h2 className={`infoBox__cases ${!isRed && "infoBox--green"}`}> + {cases} </h2>
               
               <Typography className="infoBox__total">
                    {total} : Total
               </Typography>
            
            </CardContent>
        </Card>
    )
}

export default InfoBox;
