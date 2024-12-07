import { useEffect, useState } from "react";
import axios from "axios";
import mutualData from '../mutual-fund-data/mutual-data.json'
import './listStyle.css';

const MutualFundComponent = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchFundData = async () => {
            let givenAmount = 1000;
            try {
                // Fetch data using axios
                // const response = await axios.get("../mutual-fund-data/mutual-data.json");
                // const response = await axios.get("./fund_data.json");
                console.log('mutualData...', mutualData);
                const calcluatedArr = [];
                mutualData?.funds?.map((item) => {
                    let newObj = {}
                    let oneYearPer = parseInt(item.returns.oneyear) / 100 * givenAmount;
                    let threeYearPer = parseInt(item.returns.threeyear) / 100 * givenAmount;
                    let fiveYearPer = parseInt(item.returns.fiveyear) / 100 * givenAmount;
                    console.log('oneYearPEr', oneYearPer);
                    console.log('threeYearPer', threeYearPer);
                    console.log('fiveYearPer', fiveYearPer);

                    newObj = {
                        ['oneYearPer']: oneYearPer,
                        ['threeYearPer']: threeYearPer,
                        ['fiveYearPer']: fiveYearPer
                    }
                    calcluatedArr.push(newObj);
                });

                // Sort by the highest value among the three properties
                calcluatedArr.sort((a, b) => {
                    const maxA = Math.max(a.oneYearPer, a.threeYearPer, a.fiveYearPer);
                    const maxB = Math.max(b.oneYearPer, b.threeYearPer, b.fiveYearPer);
                    return maxB - maxA; // Descending order
                });

                // Get the top 10 entries
                const top10 = calcluatedArr.slice(0, 10);

                console.log(top10);


                setData(top10);
            } catch (error) {
                // Handle errors
                console.error("Error fetching mutual fund data:", error.message);
            }
        };

        fetchFundData();
    }, []); // Dependency array ensures this runs only once on mount

    return (
        <div>
            {
                data.map((item) => {
                    return (
                        <div className="list-container">
                            <ul key={item.id}>
                                <li>{`oneYear:- ${item.oneYearPer}`}</li>
                                <li>{`threeYear:- ${item.threeYearPer}`}</li>
                                <li>{`fiveYear:- ${item.fiveYearPer}`}</li>
                            </ul>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default MutualFundComponent;
