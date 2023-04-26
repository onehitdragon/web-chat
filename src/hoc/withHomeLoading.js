import styles from "../components/Home.module.css";

function withHomeLoading(Component){
    return function (props){
        if(props.isLoading) {
            return (
                <div className={styles["message-loading"]}>
                    <div className={styles.content}>
                        <div className={styles.content__mes}>
                            <p className={styles.loading}>
                                <i className={styles["fa-solid fa-circle"]}></i>
                                <i className={styles["fa-solid fa-circle"]}></i>
                                <i className={styles["fa-solid fa-circle"]}></i>
                            </p>
                        </div>
                        <div className={styles["name-time"]}></div>
                    </div>
                </div>
            );
        }
        else{
            return <Component {...props}/>
        }
    }
}

export default withHomeLoading;