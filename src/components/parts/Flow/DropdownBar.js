import React from 'react'

function DropdownBar(props) {
    React.useEffect(() => {
        if(props.dropDownInfo.show){
            document.addEventListener("click", props.handleClick);
        }
        return () => {
            console.log('out')
            document.removeEventListener("click", props.handleClick);
        };
    });
    
    return (
        <ul className='dropDown_ul' style={{ top: props.dropDownInfo.top, left: props.dropDownInfo.left, display: props.dropDownInfo.show ? 'block' : 'none' }}>
            {
                Object.keys(props.dropDownInfo.attributes).map((val, ind) => {
                    return <li className='dropDown_li' onClick={props.dropDownInfo.attributes[val]}>{val.replace('_', ' ')}</li>
                })
            }
        </ul>
    )
}

export default DropdownBar
