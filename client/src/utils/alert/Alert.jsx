import React from 'react';

const Alert = ({alert}) => {
    console.log(alert.status)
    return (
        <>
            <div className={`alert max-w-md shadow-lg max-w-md ${alert.status}`}>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span>{alert.message}</span>
                </div>
            </div>
        </>
    );
};

export default Alert;