import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const NumberRain = ({ count = 100 }) => {
  const groupRef = useRef();

  // 1. Generate the 10 textures (0-9)
  const textures = useMemo(() => {
    const texArray = [];
    for (let i = 0; i < 10; i++) {
      const canvas = document.createElement("canvas");
      canvas.width = 128;  // Higher res for better readability
      canvas.height = 128;
      const ctx = canvas.getContext("2d");
      ctx.font = "bold 80px monospace";
      ctx.fillStyle = "#ffffff"; 
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(i.toString(), 64, 64);
      const tex = new THREE.CanvasTexture(canvas);
      tex.needsUpdate = true;
      texArray.push(tex);
    }
    return texArray;
  }, []);

  // 2. Initialize the data
  const data = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 20,
          Math.random() * 20 + 5,
          (Math.random() - 0.5) * 10,
        ],
        speed: 0.02 + Math.random() * 0.03,
        textureIndex: Math.floor(Math.random() * 10), // Random 0-9
        scale: 0.6 + Math.random() * 0.5, // Random size boost
        rotation: (Math.random() - 0.5) * 0.5, // Slight tilt
      });
    }
    return temp;
  }, [count]);

  // 3. Animation loop
  useFrame(() => {
    if (!groupRef.current) return;

    groupRef.current.children.forEach((sprite, i) => {
      if (!sprite) return;
      
      // Fall down
      sprite.position.y -= data[i].speed;

      // Reset if falls too far
      if (sprite.position.y < -5) {
        sprite.position.y = Math.random() * 20 + 5;
        sprite.position.x = (Math.random() - 0.5) * 20;
        
        // Change the number texture
        data[i].textureIndex = Math.floor(Math.random() * 10);
        sprite.material.map = textures[data[i].textureIndex];
        sprite.material.needsUpdate = true;
      }

      // Subtle wobble rotation for that "digital" feel
      sprite.rotation.z = Math.sin(Date.now() * 0.001 + i) * 0.2;
    });
  });

  return (
    <group ref={groupRef}>
      {data.map((item, i) => (
        <sprite 
          key={i} 
          position={item.position} 
          scale={[item.scale, item.scale, 1]} // Bigger size
        >
          <spriteMaterial 
            map={textures[item.textureIndex]} 
            color="#00ff41" // Neon Green
            transparent 
            depthWrite={false}
            blending={THREE.AdditiveBlending} // Glow effect
          />
        </sprite>
      ))}
    </group>
  );
};

export default NumberRain;