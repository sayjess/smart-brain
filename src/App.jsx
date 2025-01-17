import './App.css'
// libraries
import 'tachyons'
import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; 


import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register';



const returnClarifaiRequestOptions = (imageURL) => {
    const PAT = '2524bc4d68454b5cb6c3efb9f19f6aa7';
    const USER_ID = 'sayjess';
    const APP_ID = 'smart-brain';
    const IMAGE_URL = imageURL;

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });
    
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    return requestOptions
}


function App() {
  const [ init, setInit ] = useState(false) //particles module
  const [data, setData] = useState({
    input: '',
    imageURL: '',
    box: {},
    route: 'signin'
  })
 

  //background particles
  useEffect(() => {
    initParticlesEngine(async (engine) => {
        await loadSlim(engine);
    }).then(() => {
        setInit(true)
    });
}, []);

  const onInputChange = (event) => {
    setData(prevState => ({
        ...prevState,
        input: event.target.value
    }))
  }

  const onSubmit = () => {
    setData(prevState => ({
        ...prevState,
        imageURL: data.input
    }))
    
    fetch("https://api.clarifai.com/v2/models/" + 'face-detection/' + "outputs", returnClarifaiRequestOptions(data.input))
        .then(response => response.json())
        .then(result => {
            // console.log(result.outputs[0].data.regions[0].region_info.bounding_box)

            setData(prevState => ({
                ...prevState,
                box: calculateFaceLocation(result)
            }))    
        })    
        .catch(error => console.log('error', error));
  }

  const calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('input-image')
    const width = Number(image.width)
    const height = Number(image.height)
    return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * width)
    }
  }

  const onRouteChange = (route) => {
    setData(prevState => ({
        ...prevState,
        route: route
    }))
  }

  return (
    <>
      { init && <Particles
            id="tsparticles"
            options={{
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onClick: {
                            enable: true,
                            mode: "push",
                        },
                    },
                    modes: {
                        push: {
                            quantity: 4,
                        },
                    },
                },
                particles: {
                    color: {
                        value: "#ffffff",
                    },
                    links: {
                        color: "#ffffff",
                        distance: 150,
                        enable: true,
                        opacity: 0.5,
                        width: 1,
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: false,
                        speed: 3,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 800,
                        },
                        value: 150,
                    },
                    opacity: {
                        value: 0.5,
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 1, max: 5 },
                    },
                },
                detectRetina: true,
            }}
        />
      }
      <Navigation onRouteChange={onRouteChange} route={data.route}/>
      { data.route === 'signin'
        ?
        <SignIn onRouteChange={onRouteChange}/>
        :
        (
            data.route === 'register'
            ?
            <Register onRouteChange={onRouteChange}/>
            :
            <>
                <Logo />
                <Rank />
                <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit}/>
                <FaceRecognition box={data.box} imageURL={data.imageURL}/>
            </>
        )
      }
    </>
  )
}

export default App
