import React from 'react'
import { Line } from "react-chartjs-2";
import uniqolor from 'uniqolor';



const Graph = (props) => {

    console.log(uniqolor.random({format: 'rgb'}).color);

    const addDataset = (item) => {
        if (!usedNames.has(item.name))  //Checking if security has a unique name
        {
            let color = uniqolor.random({format: 'rgb'}).color + "";
            let itemData = [];
            let previousCost;
            props.data.forEach(row => {
                if (row.name === item.name) //if name of security in the table matches the current item name
                    {
                        itemData.push(row.cost);    //then cost from this row saved into data array
                        previousCost = row.cost;
                    }
                else itemData.push(previousCost);   //if current row's security name doesnt match current item's name cost will not change
            });
            usedNames.add(item.name);   //current item's name added to used names set
            dataSets.push({         //creation of new dataset
                label: item.name,
                data: itemData,
                fill: false,
                yAxisID: 'y-axis-1',
                xAxisID: 'x-axis',
                backgroundColor: color,
                borderColor: color,
            })
        }
    };

    let uniqueDates = new Set([]);
    props.data.forEach(item => uniqueDates.add(item.date));
    let labels = Array.from(uniqueDates);

    let usedNames = new Set([]);
    let dataSets = [];
    props.data.forEach(item => addDataset(item));

    console.log(dataSets);



    console.log(labels);


    const data = {
        datasets: dataSets
    };

    const options = {
        scales: {
            xAxes: [
                {
                    display: true,
                    gridLines: {
                        display: false
                    },
                    labels: labels,
                    id: 'x-axis'
                }
            ],
            yAxes: [
                {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                },
            ],
        },
    };

    return (
        <>
            <div className='header'>
                <h1 className='title'>Security Costs Chart</h1>
            </div>
            <Line data={data} options={options} />
        </>
    )
};

export default Graph;
