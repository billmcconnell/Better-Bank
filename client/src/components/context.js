import React, { createContext } from "react";
export const UserContext = createContext(null);

export function Card(props) {
    function classes() {
        const bg = props.bgcolor ? ' bg-' + props.bgcolor : 'c';
        const txt = props.txtcolor ? ' text-' + props.txtcolor : ' text-white';
        return 'card mb-3 ' + bg + txt;
    }
    // Checks for assigned classes via props and sets defaults if none are found.
    return (
        <div className={classes()} style={{ maxWidth: "50%", margin: "auto", marginTop: "50px" }}>
            <div>
                <h2 className="card-header">{props.header} </h2>
                <div className="card-body">
                    <div>
                        {props.title && (<h5 className="card-title">{props.title}</h5>)}
                        {props.text && (<h3 className="card-text">{props.text}</h3>)}
                        {props.body}
                        {props.status && (<h4 id='createStatus'>{props.status}</h4>)}
                    </div>
                </div>
            </div>
        </div>
    )
}
