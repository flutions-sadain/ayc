import React, { useState } from 'react'
import { Environment, OrbitControls, useTexture } from "@react-three/drei";
import { Avatar } from './Avatar'
import { useThree } from 'react-three-fiber';
import { useControls } from 'leva';

const Experience = (props) => {
  const { animation } = props;


    // const texture = useTexture("images/Hero-BG-Top.png")
    // const viewport = useThree((state) => state.viewport);

    // const { animation } = useControls({
    //     animation: {
    //         value: `${talking !== "" ? "Talking" : "Idle"}`,
    //         options: ["Idle", "Greeting", "Talking"],
    //     }
    // })

    // const [animation, setAnimation] = useState("Idle");

    // if (talking){
    //     setAnimation("Talking");
    // } else {
    //     setAnimation("Idle");
    // }


    return (
        <>
            {/* <OrbitControls /> */}
            <Avatar animation={animation} position={[0, -3, 5]} scale={2} />
            <Environment preset='sunset' />
            {/* <mesh>
                <planeGeometry args={[viewport.width, viewport.height]} />
                <meshBasicMaterial map={texture} />
            </mesh> */}
        </>
    )
}

export default Experience