import './navigation.css'

const Navigation = ({ onRouteChange,route }) => {
    return (
        route === "home" ? (
            <nav>
                <p 
                    className='f3 link dim black underline pa3 pointer'
                    onClick={() => onRouteChange('signin')}
                >Sign Out</p>
            </nav>
        ) : (
            <nav>
                <p 
                    className='f3 link dim black underline pa3 pointer'
                    onClick={() => onRouteChange('signin')}
                >Sign In</p>
                <p 
                    className='f3 link dim black underline pa3 pointer'
                    onClick={() => onRouteChange('register')}
                >Register</p>
            </nav>
        )
    )
}

export default Navigation
