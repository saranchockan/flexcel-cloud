import React from 'react';

class Luckysheet extends React.Component {
    state={
        tmpRowHeight: 0,
    }

    componentDidMount() {
        const luckysheet = window.luckysheet;
        luckysheet.create({
            title: "flow",
            container: "luckysheet",
            showinfobar: false,
            column: 5,
            rows: 40,
            showtoolbar: false,
            sheetFormulaBar: false,
            rowHeaderWidth: 0,
            defaultColWidth: 200,
            data:  [{
                "name": "Cell", //Worksheet name
                "color": "", //Worksheet color
                "index": 0, //Worksheet index
                "status": 1, //Worksheet active status
                "order": 0, //The order of the worksheet
                "hide": 0,//Whether worksheet hide 
                "row": 60, //the number of rows in a sheet
                "column": 5, //the number of columns in a sheet
                "defaultRowHeight": 19, //Customized default row height
                "defaultColWidth": 200, //Customized default column width
                "celldata": [], //Initial the cell data
                "config": {
                    "merge":{}, //merged cells
                    "rowlen":{}, //Table row height
                    "columnlen":{}, //Table column width
                    "rowhidden":{}, //hidden rows
                    "colhidden":{}, //hidden columns
                    "borderInfo":{}, //borders
                    "authority":{}, //Worksheet protection
                },
                "scrollLeft": 0, //Left and right scroll bar position
                "scrollTop": 315, //Up and down scroll bar position
                "luckysheet_select_save": [], //selected area
                "calcChain": [],//Formula chain
                "isPivotTable":false,//Whether is pivot table
                "pivotTable":{},//Pivot table settings
                "filter_select": {},//Filter range
                "filter": null,//Filter configuration
                "luckysheet_alternateformat_save": [], //Alternate colors
                "luckysheet_alternateformat_save_modelCustom": [], //Customize alternate colors	
                "luckysheet_conditionformat_save": {},//condition format
                "frozen": {}, //freeze row and column configuration
                "chart": [], //Chart configuration
                "zoomRatio":1, // zoom ratio
                "image":[], //image
                "showGridLines": 1, //Whether to show grid lines
            }],
            hook: {
                cellUpdateBefore: (r, c, o, isRefresh) => {
                    this.state.tmpRowHeight = Object.values(luckysheet.getRowHeight([r]))[0]
                    luckysheet.setRowHeight({r:"auto"})

                    if(luckysheet.getCellValue(r, c) == null) {
                        luckysheet.setCellFormat(r, c, 'tb', 2)
                    }
                },
                cellUpdated: (r, c, o, n, isRefresh) => {
                    let curRowHeight = Object.values(luckysheet.getRowHeight([r]))[0]
                    if(this.state.tmpRowHeight > curRowHeight){
                        luckysheet.setRowHeight({[r]:this.state.tmpRowHeight})
                    }
                },
            },  
            plugins:['chart']
        });
    }

    render() {
        const luckyCss = {
            margin: '0px',
            padding: '0px',
            height: '100%',
            left: '0px',
            top: '0px',
            MozUserSelect: "none",
            WebkitUserSelect: "none",
            msUserSelect: "none"
        }
        return (
            <div
            id="luckysheet"
            style={luckyCss}
            ></div>
        )
    }
}

export default Luckysheet