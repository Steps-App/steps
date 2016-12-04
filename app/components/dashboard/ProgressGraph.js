import React from 'react';
import moment from 'moment';
import randomColor from 'randomcolor'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import { active } from '../colors'

// Create array of fake treatment data for the past 7 days
const fakeData = treatments => {
  return Array(7).fill().map((val, i) => {
    let dataPoint = {
      date: moment().subtract(i, 'days').format('dddd, MMM Do')
    };
    treatments.forEach(treatment => {
      dataPoint[treatment.exercise.title] = Math.floor(Math.random() * 5) + 1;
    })
    return dataPoint;
  }).reverse();
}

const data = [
  {
    date: moment("2016-11-21T22:46:24.075Z").format('dddd, MMM Do'),
    'zero administration': 2,
    'clear-thinking': 4,
    'task-force': 4
  },
  {
    date: moment("2016-11-22T22:46:24.075Z").format('dddd, MMM Do'),
    'zero administration': 1,
    'clear-thinking': 3,
    'task-force': 4
  },
  {
    date: moment("2016-11-23T22:46:24.075Z").format('dddd, MMM Do'),
    'zero administration': 2,
    'clear-thinking': 3,
    'task-force': 4
  },
  {
    date: moment("2016-11-24T22:46:24.075Z").format('dddd, MMM Do'),
    'zero administration': 1,
    'clear-thinking': 2,
    'task-force': 3
  },
  {
    date: moment("2016-11-25T22:46:24.075Z").format('dddd, MMM Do'),
    'zero administration': 1,
    'task-force': 3
  },
  {
    date: moment("2016-11-26T22:46:24.075Z").format('dddd, MMM Do'),
    'zero administration': 2,
    'clear-thinking': 1,
    'task-force': 3
  },
  {
    date: moment("2016-11-27T22:46:24.075Z").format('dddd, MMM Do'),
    'zero administration': 1,
    'clear-thinking': 1,
    'task-force': 2
  }
];

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
  switch(payload[label]) {
    case 1:
      return (
        <svg x={cx - 10} y={cy - 10} width={20} height={20} viewBox="0 0 64 64"><path d="M32,2c16.6,0,30,13.4,30,30S48.6,62,32,62C15.4,62,2,48.6,2,32S15.4,2,32,2" fill="#ffdd67"/><path d="m35.8 20.5c-2.2 1.1-5.5 1.1-7.7 0-2.3-1.2-5.2-2-8.7-2.3-3.4-.3-10.5-.3-14 1-.4.1-.8.3-1.2.5-.1.1-.2.2-.2.6v.5c0 1-.1.6.6 1 1.4.8 2.2 2.9 2.6 5.8.6 4.2 2.7 6.9 6 8.1 3.1 1.2 6.6 1.1 9.7-.1 1.7-.7 3.2-1.7 4.4-3.5 2.1-3 1.4-4.9 2.5-7.5.9-2.3 3.5-2.3 4.5 0 1.1 2.6.4 4.5 2.5 7.5 1.2 1.7 2.7 2.8 4.4 3.5 3.1 1.2 6.6 1.3 9.7.1 3.4-1.3 5.4-3.9 6-8.1.4-2.9 1.2-5 2.6-5.8.7-.4.6 0 .6-1v-.5c0-.4 0-.5-.3-.6-.4-.2-.8-.4-1.2-.5-3.6-1.3-10.7-1.3-14-1-3.5.3-6.4 1.1-8.8 2.3" fill="#494949"/><path d="m44.6 42.3c-8.1 5.7-17.1 5.6-25.2 0-1-.7-1.8.5-1.2 1.6 2.5 4 7.4 7.7 13.8 7.7s11.3-3.6 13.8-7.7c.6-1.1-.2-2.3-1.2-1.6" fill="#664e27"/></svg>
      )
    case 2:
      return (
        <svg x={cx - 10} y={cy - 10} width={20} height={20} viewBox="0 0 64 64"><circle cx="32" cy="32" r="30" fill="#ffdd67"/><g fill="#664e27"><path d="m52.5 40c-2.2-3.6-7.7-6-20.5-6-12.8 0-18.3 2.4-20.5 6-1.2 1.9.5 5 .5 5 2.1 3.9 1.8 5 20 5 18.1 0 17.9-1.1 20-5 0 0 1.7-3.1.5-5"/><circle cx="20.5" cy="24.5" r="5"/><circle cx="43.5" cy="24.5" r="5"/></g><g fill="#fff"><path d="m48 40c.1-.5-.2-1.2-.6-1.5 0 0-3.9-2.5-15.4-2.5-11.5 0-15.4 2.5-15.4 2.5-.4.3-.7.9-.6 1.5l.2 1c.1.5.6 1 1.1 1h29.3c.5 0 1-.4 1.1-1l.3-1"/><path d="m32 48c6.3 0 15.2 0 15-2.1 0-.4-.1-.8-.3-1.3-.2-.5-.3-.7-1.4-.7-2.4 0-24.9 0-26.7 0-1.1 0-1.2.1-1.4.7-.1.5-.2.9-.3 1.3-.1 2.1 8.8 2.1 15.1 2.1"/></g></svg>
      )
    case 3:
      return (
        <svg x={cx - 10} y={cy - 10} width={20} height={20} viewBox="0 0 64 64"><circle cx="32" cy="32" r="30" fill="#ffdd67"/><g fill="#664e27"><circle cx="20.5" cy="27.6" r="5"/><circle cx="43.5" cy="27.6" r="5"/><path d="m38.9 48h-13.8c-1.5 0-1.5-4 0-4h13.7c1.6 0 1.6 4 .1 4"/></g></svg>
      )
    case 4:
      return (
        <svg x={cx - 10} y={cy - 10} width={20} height={20} viewBox="0 0 64 64"><circle cx="32" cy="32" r="30" fill="#ffdd67"/><g fill="#664e27"><circle cx="20.5" cy="24.6" r="5"/><circle cx="43.5" cy="24.6" r="5"/><path d="m19.4 45.8c8.1-5.7 17.1-5.6 25.2 0 1 .7 1.8-.5 1.2-1.6-2.5-4-7.4-7.7-13.8-7.7s-11.3 3.6-13.8 7.7c-.6 1.1.2 2.3 1.2 1.6"/></g></svg>
      )
    case 5:
      return (
        <svg x={cx - 10} y={cy - 10} width={20} height={20} viewBox="0 0 64 64"><circle cx="32" cy="32" r="30" fill="#ffdd67"/><g fill="#917524"><path d="m38.4 11.2c3.2 2.7 7.5 3.9 11.7 3.1.6-.1 1.1 2 .4 2.2-4.8.9-9.8-.5-13.5-3.6-.5-.5 1-2 1.4-1.7"/><path d="m13.9 14.2c4.2.7 8.5-.4 11.7-3.1.4-.4 2 1.2 1.4 1.7-3.7 3.2-8.7 4.5-13.5 3.6-.7-.2-.2-2.3.4-2.2"/></g><path d="m32 32c-8.8-.1-15.9 5.4-16 12.3 0 3.8 1.3 9.5 5.6 9.5 3.1 0 6.5-3.8 10.4-3.8 3.9 0 7.1 4 10.2 4 3.8 0 5.8-5.7 5.8-9.5.1-6.8-7.2-12.4-16-12.5" fill="#664e27"/><path d="m39 43.2c0-3.1-3-4.9-4.8-4.9-.7 0-1.7.6-1.3 2.1.2.8 1.4 1.7 1.4 3 0 2.5-4.4 2.5-4.4 0 0-1.3 1.2-2.2 1.4-3 .4-1.5-.7-2.1-1.3-2.1-1.8 0-4.8 1.9-4.8 4.9 0 1.9 1 3.4 2.5 4.6h9c1.3-1.2 2.3-2.7 2.3-4.6" fill="#4c3526"/><path d="m32 46c-6 0-8 5-8 5s4-3 8-3 8 3 8 3-2-5-8-5" fill="#ff717f"/><path d="m41.8 37c-2.5-1.9-5.7-3-9.8-3-4.1 0-7.3 1.2-9.8 3-.4.3-.4 1 .3 1 2.4 0 9.4 0 9.4 0s7.1 0 9.4 0c.8 0 .8-.7.5-1" fill="#fff"/><g fill="#664e27"><path d="m51.7 21.1c.6.3.3 1-.2 1.1-2.7.4-5.5.9-8.3 2.4 4 .7 7.2 2.7 9 4.8.4.5-.1 1.1-.5 1-4.8-1.7-9.7-2.7-15.8-2-.5 0-.9-.2-.8-.7 1.6-7.3 10.9-10 16.6-6.6"/><path d="m12.3 21.1c-.6.3-.3 1 .2 1.1 2.7.4 5.5.9 8.3 2.4-4 .7-7.2 2.7-9 4.8-.4.5.1 1.1.5 1 4.8-1.7 9.7-2.7 15.8-2 .5 0 .9-.2.8-.7-1.6-7.3-10.9-10-16.6-6.6"/></g></svg>
      )
    default:
      return null;
  }
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

export default ({ treatments, width, height }) => {
  const chartWidth = width ? width : 800;
  const chartHeight = height ? height : 500;

  return (
    <div className= "progress-graph">
      <ResponsiveContainer width='100%' minHeight={ chartHeight }>
        <LineChart data={fakeData(treatments)}
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
