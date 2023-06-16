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
        const elapsedTime = state.clock.getElapsedTime()
        const positionZ = Math.sin(elapsedTime / 2)
        ref.current.position.z += positionZ
        if (positionZ < 0) {
            ref.current.rotation.y = Math.PI
        } else {
            ref.current.rotation.y = 0
        }
    })
    return (
        <Clone ref={ref} object={scene} position={[initPosition[0], initPosition[1], initPosition[2]]}/>
    )
}

export default GoldenFishContainer
