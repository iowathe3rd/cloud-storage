import React, {useState} from 'react';
import {DocumentIcon, FileIcon} from "../../../../assets/Icons";

const File = ({file}) => {
    const [isShown, setIsShown] = useState(false);
    return (
        <tr
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
            className={isShown ? 'active' : ''}
        >
            <th className="flex gap-4">{file.type === "dir" ? <DocumentIcon/> : <FileIcon/>}{file.name}</th>
            <td>{file.date.slice(0,10)}</td>
            <td>{file.size}</td>
        </tr>
    );
};

export default File;