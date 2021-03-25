
import { Divider } from "@material-ui/core"
import React from "react"
import {OLD_WHITE_LIGHT} from "../../assets/constants/Constants"
type SensoDescriptionType = {content:string}
const SensoDescription:React.FC<SensoDescriptionType> = ({content}) => {
    return (
        <>{content?
            <>
            <div style={{width:"100%"}}>
            <Divider/>
                <p style={{backgroundColor:OLD_WHITE_LIGHT, margin:0, padding:"1rem"}}>{content}</p>

            <Divider/>
            </div>
            </>
            :null}
            </>
    )
}
export default SensoDescription