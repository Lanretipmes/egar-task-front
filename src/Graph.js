import React from 'react'
import { Line } from "react-chartjs-2";
import uniqolor from 'uniqolor';



export default (props) => {

    console.log(uniqolor.random({format: 'rgb'}).color);

    const addDataset = (item) => {
        if (!usedNames.has(item.name))
        {
            let color = uniqolor.random({format: 'rgb'}).color + "";
            let itemData = [];
            let previousCost;
            props.data.forEach(row => {
                if (row.name === item.name)
                    {
                        itemData.push(row.cost);
                        previousCost = row.cost;
                    }
                else itemData.push(previousCost);
            });
            usedNames.add(item.name);
            dataSets.push({
                label: item.name,
                data: itemData,
                fill: false,
                yAxisID: 'y-axis-1',
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
                    labels: labels
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
                <h1 className='title'>Multi Axis Line Chart</h1>
            </div>
            <Line data={data} options={options} />
        </>
    )
}
