function withHomeLoading(Component){
    return function (props){
        if(props.isLoading) {
            return (
                <div className="message-loading">
                    <div className="content">
                        <div className='content__mes'>
                            <p className="loading">
                                <i className="fa-solid fa-circle"></i>
                                <i className="fa-solid fa-circle"></i>
                                <i className="fa-solid fa-circle"></i>
                            </p>
                        </div>
                        <div className="name-time"></div>
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