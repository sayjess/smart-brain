
import './faceRecognition.css'

const FaceRecognition = ({imageURL, box}) => {
    const {topRow, rightCol, leftCol, bottomRow } = box
    const style = {
        top: topRow,
        right: rightCol,
        left: leftCol,
        bottom: bottomRow
    }

    return (
        <div className="face-recog-container">
            <div className='absolute mt2'>
                <img id='input-image' src={imageURL} alt="" />
                <div className="bounding-box" style={style}></div>
            </div>
        </div>
    )
}

export default FaceRecognition