import "./BarChart.style.css";
import React, { useEffect, useRef } from "react";
import { select, scaleLinear, scaleBand, axisBottom, axisRight, max } from "d3";
import { IData } from "../../interfaces/salesTableInterface";

interface propTypes {
  data: IData[];
  minYear: number;
  maxYear: number;
}

export const BarChart: React.FC<propTypes> = ({ data, minYear, maxYear }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    console.log(data);
const filteredData = data.filter(record=>record.period >= minYear && record.period <= maxYear)
    
    const CHART_WIDTH = 700;
    const CHART_HEIGHT = 200;
    const svg = select(svgRef.current);
    svg.attr('width',CHART_WIDTH).attr('height',CHART_HEIGHT)

    const xScale = scaleBand()
      .domain(filteredData.map((value) => value.period?.toString()))
      .range([0, CHART_WIDTH])
      .padding(0.5);

    const yScale = scaleLinear().domain([0, max(filteredData, record=>record.sales + 3) as number]).range([CHART_HEIGHT, 0]);

    const xAxis = axisBottom(xScale).ticks(filteredData.length);

    svg
      .select(".x-axis")
      .style("transform", "translateY(200px)")
      .call(xAxis as any);

    const yAxis = axisRight(yScale);
    svg
      .select(".y-axis")
      .style("transform", "translateX(700px)")
      .call(yAxis as any);

    svg
      .selectAll(".bar")
      .data(filteredData)
      .join("rect")
      .attr("class", "bar")
      .style("transform", "scale(1, -1)")
      .attr("x", (value, index) => xScale(value.period?.toString())!)
      .attr("y",-200)
      .attr("width", xScale.bandwidth())
      .transition()
      .attr("fill", "black")
      .attr("height", (value) => CHART_HEIGHT - yScale(value.sales));


  }, [data, minYear, maxYear]);

  return (
    <svg ref={svgRef}>
      <g className="x-axis" />
      <g className="y-axis" />
    </svg>
  );
};

export default BarChart;
