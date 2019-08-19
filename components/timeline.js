import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import data from '../db/data';

function BarChart({ id, data, width = 550, height = 300 }) {
  var w = 1000;
  var h = 400;
  var padding = 20;

  var dataset = [
    ["2006-01-22", 4],
    ["2009-03-23", 9],
    ["2004-11-20", 5],
    ["2012-05-05", 3],
    ["2008-12-02", 9],
    ["2004-04-05", 10],
    ["2000-02-02", 4],
    ["2006-05-02", 6],
    ["2007-08-12", 2],
    ["2001-09-23", 8]
    ];

  const mindate = new Date("1990-01-01"),
      maxdate = new Date("2020-01-01");
    //  console.log(mindate, 'and', maxdate);
  const formatTime = d3.timeFormat("%Y-%b")
  console.log(formatTime(mindate));
  const xScale = d3.scaleTime()
      .domain([mindate, maxdate])
      .range([0, 960]);


  const yScale = d3.scaleLinear()
      .domain([0, d3.max(dataset, function (d) {
           return d[1];
      })])
      .range([0, h]);

  const xAxis = d3.axisBottom(xScale)
                  // .tickFormat(formatTime);

  const yAxis = d3.axisLeft(yScale)


  useEffect(() => {

    const svg = d3
      .select('#' + id)
      .append('svg')
      .attr('width', w)
      .attr('height', h)
      // .style("border", "1px solid black")




    svg
      .selectAll('circle')
      .data(dataset)
      .enter()
      .append('circle')
      .attr("cx", function(d) {
        return xScale(new Date(d[0]));
           })
      .attr("cy", function (d) {
             return yScale(d[1]);
            })
            // .attr("r", 5)
            .transition()
        .attr('r', function(d) { return (2 * Math.sqrt(d[1])); })
        .duration(4000)
            .style('fill', "rgba(25, 158, 199, .9)")

      svg.append("g")
        	.attr("class", "x axis")
        	.attr("transform", "translate(0," + height + ")")
          .call(xAxis);
      svg.append("g")
          .attr("class", "y axis")
          .attr("transform", "translate(  , 10)")
        	.call(yAxis)


  }, []);

  return <div id={id} />;
}

export default function Timeline() {
  return (
   <BarChart id="barchart" data={[12, 6, 6, 7, 10]} />
  )
}
