import React from 'react'

export const Board: React.FC = (props) =>{
    
    return (
        <ul className="list-group list-group-horizontal">
            {props.children}
        </ul>
    );
}