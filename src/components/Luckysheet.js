import React from 'react';

class Luckysheet extends React.Component {
    state = {
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
            allowCopy: true,
            showtoolbar: false,
            sheetFormulaBar: false,
            rowHeaderWidth: 0,
            defaultColWidth: 200,
            data:  this.props.luckysheetData,
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
                    this.props.autosave()
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