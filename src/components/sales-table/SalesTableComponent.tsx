
import "./SalesTableComponent.styles.css";



export interface IData {
    name: string;
    email: string;
    age: string;
    food: string;
}



const SalesTableComponent = (props: {data: IData[]}) => {
    const keys = Object.keys(props.data[0]);
    return (
        <table className="table">
            <thead className="thead">
                <tr className="trHead">
                    {keys.map((item, index) => (
                        <th className="th" key={index}>
                            {item}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="tbody">
                {props.data.map((obj: IData, index: number) => (
                    <tr className="trBody" key={index}>
                        {keys.map((item, index) => {
                            const value = obj[item as keyof IData];
                            return (
                                <td className="td" key={index}>
                                    {value}
                                </td>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default SalesTableComponent;