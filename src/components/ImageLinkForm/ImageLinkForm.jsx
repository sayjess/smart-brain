

const ImageLinkForm = ({onInputChange, onSubmit}) => {
    return (
        <div className="w-40 center">
            <p className="f3 tc">
                {`This Magic Brain will detect faces in your picture. Give it a try.`}
            </p>
            <div className="pa4 br3 ba b--light-purple shadow-5 mt3">
                <input className="f4 pa2 w-70 center" type="text" onChange={onInputChange}/>
                <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple" onClick={onSubmit}>Detect</button>
            </div>
        </div>
    )
}

export default ImageLinkForm