import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";

const setCharacter = (
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = async (): Promise<GLTF> => {
    const gltf = await loader.loadAsync("/models/character.glb");
    const character = gltf.scene;

    character.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.frustumCulled = true;
      }
    });

    try {
      setCharTimeline(character, camera);
      setAllTimeline();
      const rightFoot = character.getObjectByName("footR");
      const leftFoot = character.getObjectByName("footL");
      if (rightFoot) rightFoot.position.y = 3.36;
      if (leftFoot) leftFoot.position.y = 3.36;
    } catch (error) {
      console.warn("3D scroll animation setup skipped:", error);
    } finally {
      dracoLoader.dispose();
    }

    return gltf;
  };

  return { loadCharacter };
};

export default setCharacter;
