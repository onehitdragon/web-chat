import { useState } from "react";
import Login from "../components/Login";

export default function(){
    const [dialog, setDialog] = useState<React.ReactNode>(null);

    const showDialog = (dialogNeedShow: React.ReactNode) => {
        setDialog(dialogNeedShow);
    }
    const hideDialog = () => {
        setDialog(null);
    }

    return (
        <>
            <Login showDialog={showDialog} hideDialog={hideDialog}/>
            {dialog}
        </>
    );
}