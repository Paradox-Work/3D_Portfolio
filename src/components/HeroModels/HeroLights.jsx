

const HeroLights = () => {
  return (
     <>

     <spotLight 
        position={[3, 4, -3]} 
        angle={0.5}
        intensity={100}
        penumbra={0.3}
        color={"#ffffff"}
     />

     </>
  )
}

export default HeroLights