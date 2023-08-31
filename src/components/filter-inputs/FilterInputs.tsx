import { useRef } from "react";
import { IData } from "../../interfaces/salesTableInterface";
import "./FilterInputs.styles.css";

interface propTypes {
  tableData: IData[];
  minYear: number;
  maxYear: number;
  submitMinAndMaxYears: any;
}
export const FilterInputs: React.FC<propTypes> = ({minYear,maxYear,tableData,submitMinAndMaxYears}) => {
    const minYearRef = useRef<HTMLSelectElement>(null);
  const maxYearRef = useRef<HTMLSelectElement>(null);
  return (
    <div className="filter-container">
      <label className="filter-input">
        Min Year
        <select ref={minYearRef} defaultValue={minYear}>
          {tableData.map((record) => (
            <option
              key={record.period}
              value={record.period}
              selected={minYear === record.period}
            >
              {record.period}
            </option>
          ))}
        </select>
      </label>
      <label className="filter-input">
        Max Year
        <select ref={maxYearRef} defaultValue={maxYear}>
          {tableData.map((record) => (
            <option
              key={record.period}
              value={record.period}
              selected={maxYear === record.period}
            >
              {record.period}
            </option>
          ))}
        </select>
      </label>
      <button className="filter-action" onClick={() => submitMinAndMaxYears(minYearRef.current!.value,maxYearRef.current!.value)}>
        submit
      </button>
    </div>
  );
};

export default FilterInputs;
