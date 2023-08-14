export default function BtnDark({handleClick,title}){
    return(
        <button onClick={e=>handleClick(e)} type="button" className="btn m-3 mt-5 btn-outline-primary waves-effect waves-light">{title}</button>
    )
}