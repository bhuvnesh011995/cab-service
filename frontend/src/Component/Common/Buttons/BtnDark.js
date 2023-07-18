export default function BtnDark({handleClick,title}){
    return(
        <button onClick={e=>handleClick(e)} type="button" className="btn m-1 btn-outline-dark waves-effect waves-light">{title}</button>
    )
}