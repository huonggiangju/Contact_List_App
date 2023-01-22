import React from "react";
import spinner from '../../assests/spinner.gif';

let Spinner = () =>{
    return (
        <React.Fragment>
            <div>
                <img src={spinner} alt="" className="d-block m-auto" style={{width: '200px'}}></img>
            </div>
            
        </React.Fragment>
    )
}

export default Spinner