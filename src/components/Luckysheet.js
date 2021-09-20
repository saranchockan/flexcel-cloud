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
            columnHeaderHeight: 0,
            defaultColWidth: 200,
            data:  this.props.luckysheetData,
            hook: {
                rangeClearBefore: (range, data) => {
                    for (let index = 0; index < range.length; index++) {
                        const element = range[index];
                        
                        if(element.row[0] == 0 || element.row[1] == 0){
                            return false
                        }
                    }
                },
                rangeDeleteBefore: (range, data) => {
                    for (let index = 0; index < range.length; index++) {
                        const element = range[index];
                        
                        if(element.row[0] == 0 || element.row[1] == 0){
                            return false
                        }
                    }
                },
                cellEditBefore: (range) => {
                    for (let index = 0; index < range.length; index++) {
                        const element = range[index];
                        
                        if(element.row[0] == 0 || element.row[1] == 0){
                            return false
                        }
                    }
                },
                rangePasteBefore: (range, data) => {
                    for (let index = 0; index < range.length; index++) {
                        const element = range[index];
                        
                        if(element.row[0] == 0 || element.row[1] == 0){
                            return false
                        }
                    }
                },
                rangeCutBefore: (range, data) => {
                    for (let index = 0; index < range.length; index++) {
                        const element = range[index];
                        
                        if(element.row[0] == 0 || element.row[1] == 0){
                            return false
                        }
                    }
                },
                cellUpdateBefore: (r, c, o, isRefresh) => {
                    if(r == 0) return false
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
                updated: (o) => {
                    if(o.type == 'datachange'){
                        for (let index = 0; index < o.dataRange.length; index++) {
                            const element = o.dataRange[index];
                            
                            if(element.row[0] == 0){
                                luckysheet.undo()
                                console.log('undoing invalid operation')
                                return
                            }
                        }
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