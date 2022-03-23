import style from "./Warning.module.css"
type Props = {
    warning:string | null
}
export const Warning = ({warning}:Props) => {
    return (
        <div className={style.container} style={warning ? {height:50,padding:10,opacity:1}:{height:0,padding:0,opacity:0}}>
           {warning}
        </div>
    )
}