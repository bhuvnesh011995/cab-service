export default function Content({title,subtitle}) {
    return(
        <div className="row" >
        <div className="col mb-2 font-weight-bold">
        {title}
        </div>
        <div className="col mb-2">
        {subtitle}
        </div>
        </div>
    )
};
