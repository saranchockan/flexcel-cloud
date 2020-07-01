import React, {useState} from 'react'
import  FlexcelFlow from '@handsontable/react';

function Flow(props) {

    const [data, setData] = useState([
        ['', 'Tesla', 'Mercedes', 'Toyota', 'Volvo'],
        ['2019', 10, 11, 12, 13],
        ['2020', 20, 11, 14, 13],
        ['2021', 30, 15, 12, 13]
      ])
    return (
        <FlexcelFlow data={data} colHeaders={true} rowHeaders={true} width="600" height="300" />
    )
}

export default Flow

