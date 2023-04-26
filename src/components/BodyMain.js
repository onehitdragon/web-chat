import { memo } from 'react';
import BodyLeft from './BodyLeft';
import BodyRight from './BodyRight';
import styles from "./Home.module.css"

function BodyMain(){  
    return (
        <div className={styles["body__main-home"]}>
            <BodyLeft />
            <BodyRight />
        </div>
    );
}

export default memo(BodyMain);