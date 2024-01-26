import CInfoData from "./infodata";

export default function CInfo() {
    return(
        <>
        <div className="container">
            <div className="row">
                <div className="col-md-4"><CInfoData idkey="1" /></div>
                <div className="col-md-4"><CInfoData idkey="2" /></div>
                <div className="col-md-4"><CInfoData idkey="3" /></div>
            </div>
        </div>
        </>
    )
}