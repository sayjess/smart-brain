import Tilt from 'react-parallax-tilt';
import './logo.css'

const Logo = () => {
    return (
        <div className="ma4 mt0">
            <Tilt 
                scale={1.1} 
                tiltEnable={false} 
                className='tilt'
            >
                    <div className='tilt-inner br2 shadow-2'>
                        <img src="https://img.icons8.com/?size=100&id=EG1CnBMgs0Sf&format=png&color=000000" alt="logo" />
                    </div>
            </Tilt>
        </div>

    )
}

export default Logo