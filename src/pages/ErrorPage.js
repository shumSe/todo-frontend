import MyButton from "../components/UI/button/MyButton";
import { Link } from "react-router-dom";

export default function ErrorPage(){
    return(
        <div className="error__container">
            <h1 style={{width:"100%", fontSize:"30px"}}>Несуществующая страница</h1>
            <div style={{display:"flex", marginTop:"20px", justifyContent:"center"}}>
            <Link to="/">
                <MyButton style={{fontSize:"16px"}}>НА ГЛАВНУЮ</MyButton>
            </Link>
            </div>
        </div>
    )
}   