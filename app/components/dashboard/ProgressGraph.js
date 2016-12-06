import React from 'react';
import moment from 'moment';
import randomColor from 'randomcolor'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import { daysBetween, painEmoji } from '../../utils'
import { active } from '../colors'

// Returns a random number between input range 
const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Create array of fake treatment data for the past 7 days
const fakeData = (startDate, treatments) => {
  // Calculate the number of days to chart
  const daysSoFar = daysBetween(new Date(startDate), new Date());
  const chartDays = daysSoFar > 7 ? 7 : daysSoFar;

  const graphData = Array(chartDays).fill();
  for (let i = chartDays - 1; i >= 0; i--) {
    let dataPoint = {
      date: moment().subtract(i, 'days').format('dddd, MMM Do')
    };
    // Assign pain levels for the current day
    treatments.forEach((treatment, ind) => {
      // If earliest day, constrain starting pain level
      if (i === chartDays - 1)
        dataPoint[treatment.exercise.title] = randomNum(2, 5);
      // Otherwise, assign appropriate subsequent pain level
      else {
        // Retrieve preceding pain level
        let prevDataPoint = graphData[i + 1][treatment.exercise.title];
        if (!prevDataPoint) prevDataPoint = graphData[chartDays - 1][treatment.exercise.title];

        // Calculate the new pain level based on the preceding level
        const upperLimit = prevDataPoint + 1 > 5 ? 5 : prevDataPoint + 1;
        const lowerLimit = prevDataPoint - 2 < 1 ? 1 : prevDataPoint - 2;
        dataPoint[treatment.exercise.title] = randomNum(lowerLimit, upperLimit);

        // Roughly 20% of intermediate workouts should be missing
        if (i && randomNum(1, 5) === 1)
          dataPoint[treatment.exercise.title] = null;
      }
    })
    graphData[i] = dataPoint;
  }
  return graphData.reverse();
}

const CustomizedDateTick = ({ x, y, stroke, payload }) => (
  <g transform={`translate(${x},${y})`}>
    <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">{payload.value}</text>
  </g>
);

const CustomizedPainTick = ({ x, y, stroke, payload }) => (
  <g transform={`translate(${x},${y})`}>
    <text x={0} y={0} dx={-10} textAnchor="end" fill="#666">{payload.value}</text>
  </g>
);

const CustomizedDot = ({ cx, cy, payload, label }) => {
  const props = {
    x: cx - 10,
    y: cy - 10,
    width: 20,
    height: 20
  };
  return painEmoji(payload[label], props)
};

const PainLabel = (props) => (
  <g className="recharts-cartesian-axis-label">
    <text width={props.width} height={props.height} transform="rotate(-90)" x={props.x} y={props.y} className="recharts-text" fontSize="18px">
      <tspan x={ -(props.chartHeight / 2) } dy="-1em">
        Pain
      </tspan>
    </text>
  </g>
);

export default ({ treatments, planStart, width, height }) => {
  const chartWidth = width ? width : 800;
  const chartHeight = height ? height : 500;

  return (
    <div className= "progress-graph">
      <ResponsiveContainer width='100%' minHeight={ chartHeight }>
        <LineChart data={fakeData(planStart, treatments)}
          margin={{ top: 20, right: 30, left: 30, bottom: 10 }}>
          <XAxis dataKey="date" height={100} tick={<CustomizedDateTick/>}
            interval={0} tickCount={7} />
          <YAxis label={<PainLabel chartHeight={ chartHeight } />} type="number"
            domain={[0, 5]} interval={0} tickCount={6} tick={<CustomizedPainTick/>} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip/>
          <Legend verticalAlign="top" align="center" iconSize={16} height={50} />
          {
            treatments.map(treatment => {
              let lineColor = randomColor({ luminosity: 'dark', hue: 'rgb' });
              return (
                <Line key={treatment.id}
                  type="monotone" legendType="square"
                  connectNulls={ true }
                  dataKey={ treatment.exercise.title }
                  stroke={lineColor}
                  dot={<CustomizedDot label={treatment.exercise.title} />}
                  activeDot={{ stroke: lineColor, r: 10, opacity: .4 }} />
              )
            })
          }
      </LineChart>
    </ResponsiveContainer>
  </div>
  )
};
