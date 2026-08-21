import { useRef, useMemo } from 'react';
import { Text, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const SignSystem = (props) => {
    const groupRef = useRef();
    const signTexture = useTexture('/textures/entrance/sign.webp');
    const mountTexture = useTexture('/textures/entrance/belka.webp');

    // Physics parameters
    const timeOffset = useMemo(() => Math.random() * 100, []);

    useFrame((state) => {
        if (groupRef.current) {
            // Simple wind sway (idle animation only)
            const time = state.clock.elapsedTime + timeOffset;
            const windSway = Math.sin(time * 2) * 0.05; // Gentle constant sway

            groupRef.current.rotation.x = windSway;
            groupRef.current.rotation.y = 0;
        }
    });

    return (
        <group {...props}>
            {/* 1. THE MOUNT (Visual Anchor) */}
            {/* Texture is horizontal, so we use Width=3.5, Height=0.4 (approx aspect ratio) */}
            {/* No rotation needed as the texture is already horizontal */}
            <mesh position={[-0.05, 2.05, 0.65]}>
                <planeGeometry args={[2.7, 0.4]} />
                <meshBasicMaterial color="#e0e0e0" map={mountTexture} transparent={true} side={THREE.DoubleSide} />
            </mesh>

            {/* 2. THE SIGN (SignGroup) */}
            {/* Positioned exactly at the center of the mounting bar */}
            <group
                ref={groupRef}
                position={[0, 1.9, 0.60]}
            >
                {/* 3. THE PIVOT FIX */}
                {/* Translate geometry DOWN so the top edge (where chains are) is at (0,0,0) of the group */}
                <mesh
                    position={[0, -0.5, 0]} // Moving down by half height (assuming height ~1)
                >
                    {/* Width 2.6 (Narrower), Height 1 */}
                    <planeGeometry args={[2, 1]} />
                    <meshBasicMaterial color="#e0e0e0"
                        map={signTexture}
                        transparent={true}
                        side={THREE.DoubleSide}
                        depthWrite={false} // Fix for seeing objects behind transparent parts
                    />
                </mesh>

                {/* === MENGLAN Dynamic Text Overlay === */}
                {/* Opaque background strip — covers the raster MENGLAN baked into sign.webp (spans ~1.44 units) */}
                <mesh position={[0, -0.12, 0.02]}>
                    <planeGeometry args={[1.5, 0.30]} />
                    <meshBasicMaterial color="#e0e0e0"
                        transparent={false}
                        side={THREE.DoubleSide}
                        depthWrite={false}
                    />
                </mesh>
                {/* Per-letter MENGLAN — narrowed to sit within the sign (was too wide at step 0.26 / fontSize 0.28) */}
                {/* 7 letters spread across 1.20 units (step 0.20), centered on the 2-unit-wide sign */}
                <Text position={[-0.60, -0.12, 0.04]} fontSize={0.24} color="#1a1a1a" anchorX="center" anchorY="middle" font="/fonts/RubikScribble-Regular.ttf">M</Text>
                <Text position={[-0.40, -0.12, 0.04]} fontSize={0.24} color="#1a1a1a" anchorX="center" anchorY="middle" font="/fonts/RubikScribble-Regular.ttf">E</Text>
                <Text position={[-0.20, -0.12, 0.04]} fontSize={0.24} color="#1a1a1a" anchorX="center" anchorY="middle" font="/fonts/RubikScribble-Regular.ttf">N</Text>
                <Text position={[ 0.00, -0.12, 0.04]} fontSize={0.24} color="#1a1a1a" anchorX="center" anchorY="middle" font="/fonts/RubikScribble-Regular.ttf">G</Text>
                <Text position={[ 0.20, -0.12, 0.04]} fontSize={0.24} color="#1a1a1a" anchorX="center" anchorY="middle" font="/fonts/RubikScribble-Regular.ttf">L</Text>
                <Text position={[ 0.40, -0.12, 0.04]} fontSize={0.24} color="#1a1a1a" anchorX="center" anchorY="middle" font="/fonts/RubikScribble-Regular.ttf">A</Text>
                <Text position={[ 0.60, -0.12, 0.04]} fontSize={0.24} color="#1a1a1a" anchorX="center" anchorY="middle" font="/fonts/RubikScribble-Regular.ttf">N</Text>
            </group>
        </group>
    );
};

export default SignSystem;
