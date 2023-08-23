export default function Content({title,subtitle}) {
    return(
        <div className="col-md-6">
        <div className="row" >
        <div className="col-md-6 mb-3 font-weight-bold">
        {title}
        </div>
        <div className="col-md-6 mb-3">
        {subtitle}
        </div>
        </div>
        </div>
    )
};
