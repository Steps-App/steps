import React from 'react';
import moment from 'moment';
import randomColor from 'randomcolor'
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from 'recharts';
import { active } from '../colors'

const RADIAN = Math.PI / 180; 
const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, keys }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 1.5;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}% ${keys[index]}`}
    </text>
  );
};

export default ({ data, title, width, height }) => {
  const chartWidth = width ? width : 350;
  const chartHeight = height ? height : 200;

  // Transform data if object input
  if (!Array.isArray(data)) {
    data = Object.keys(data).map(key => ({ name: key, value: data[key] }))
  }

  return (
    <div className= "pie-graph">
      <h3 className="graph-title">{ title }</h3>
      <ResponsiveContainer width={ chartWidth } minHeight={ chartHeight }>
        <PieChart>
          <Pie data={data} labelLine={false}
            label={ <CustomLabel keys={ data.map(obj => obj.name) }/> }
            cx={170}  cy={95} paddingAngle={5}
            innerRadius={60} outerRadius={80}>
            {
              data.map(() => <Cell fill={ randomColor() }/>)
            }
          </Pie>
          <Tooltip/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
};
