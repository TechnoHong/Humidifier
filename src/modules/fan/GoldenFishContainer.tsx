import {useFrame} from "@react-three/fiber";
import React, {useRef} from "react";
import {Clone, useGLTF} from "@react-three/drei";

type GoldenFishProps = {
    initPosition: number[]
}

const GoldenFishContainer = ({initPosition}: GoldenFishProps) => {
    const ref = useRef<any>()
    const { scene } = useGLTF(process.env.PUBLIC_URL + '/assets/golden_fish.glb')

    useFrame(state => {
        ref.current.position.z += Math.random()
    })
    return (
        <Clone ref={ref} object={scene} position={[initPosition[0], initPosition[1], initPosition[2]]}/>
    )
}

export default GoldenFishContainer
