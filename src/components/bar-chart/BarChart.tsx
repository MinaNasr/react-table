import "./BarChart.style.css";
import React, { useEffect, useRef } from "react";
import { select, scaleLinear, scaleBand, axisBottom, axisLeft, max } from "d3";
import { IData } from "../../interfaces/salesTableInterface";

interface propTypes {
  data: IData[];
  minYear: number;
  maxYear: number;
  barColor: string;
}

export const BarChart: React.FC<propTypes> = ({
  data,
  minYear,
  maxYear,
  barColor,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const CHART_WIDTH = 700;
  const CHART_HEIGHT = 200;
  const MARGIN = 3000;

  useEffect(() => {
    const filteredData = data
      .filter((record) => record.period >= minYear && record.period <= maxYear)
      .reverse();
    const svg = select(svgRef.current);
    svg.attr("width", CHART_WIDTH).attr("height", CHART_HEIGHT);

    const xScale = scaleBand()
      .domain(filteredData.map((value) => value.period?.toString()))
      .range([0, CHART_WIDTH])
      .padding(0.5);

    const yScale = scaleLinear()
      .domain([
        14000,
        max(filteredData, (record) => record.sales + MARGIN) as number,
      ])
      .range([CHART_HEIGHT, 0]);

    const xAxis = axisBottom(xScale);
    svg
      .select(".x-axis")
      .style("transform", "translateY(200px)")
      .call(xAxis as any);

    const yAxis = axisLeft(yScale);
    svg.select(".y-axis").call(yAxis as any);

    svg
      .selectAll(".bar")
      .data(filteredData)
      .join("rect")
      .attr("class", "bar")
      .style("transform", "scale(1, -1)")
      .attr("x", value => xScale(value.period?.toString())!)
      .attr("y", -200)
      .attr("width", xScale.bandwidth())
      .transition()
      .attr("fill", barColor)
      .attr("height", value => CHART_HEIGHT - yScale(value.sales));
  }, [data, minYear, maxYear, barColor]);

  return (
    <svg ref={svgRef}>
      <g className="x-axis" />
      <g className="y-axis" />
    </svg>
  );
};

export default BarChart;
