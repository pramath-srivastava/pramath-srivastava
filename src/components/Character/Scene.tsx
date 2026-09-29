import { useEffect, useRef } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import { setProgress } from "../Loading";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const { setLoading } = useLoading();

  useEffect(() => {
    if (canvasDiv.current) {
      const progress = setProgress((value) => setLoading(value));
      let rect = canvasDiv.current.getBoundingClientRect();
      let container = { width: rect.width, height: rect.height };
      const aspect = container.width / container.height;
      const scene = sceneRef.current;

      let renderer: THREE.WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      } catch (error) {
        console.error("3D preview unavailable; showing the portfolio without it:", error);
        progress.clear();
        return;
      }
      renderer.setSize(container.width, container.height);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      canvasDiv.current.appendChild(renderer.domElement);

      const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
      camera.position.z = 10;
      camera.position.set(0, 13.1, 24.7);
      camera.zoom = 1.1;
      camera.updateProjectionMatrix();

      let headBone: THREE.Object3D | null = null;
      let screenLight: any | null = null;
      let mixer: THREE.AnimationMixer;
      let frameId = 0;
      let resizeHandler: (() => void) | null = null;
      let loadedCharacter: THREE.Object3D | null = null;

      const clock = new THREE.Clock();

      const light = setLighting(scene);
      const { loadCharacter } = setCharacter(camera);

      const loaderTimeout = window.setTimeout(() => progress.clear(), 15000);
      loadCharacter().then((gltf) => {
        window.clearTimeout(loaderTimeout);
        if (gltf) {
          const model = gltf.scene;
          const character = model;
          loadedCharacter = character;
          scene.add(character);
          light.turnOnLights();
          let animations: ReturnType<typeof setAnimations> | null = null;
          try {
            animations = setAnimations(gltf);
            if (hoverDivRef.current) animations.hover(gltf, hoverDivRef.current);
            mixer = animations.mixer;
          } catch (error) {
            console.warn("3D character animations unavailable:", error);
          }
          headBone = character.getObjectByName("spine006") || null;
          screenLight = character.getObjectByName("screenlight") || null;
          progress.loaded().then(() => {
            setTimeout(() => {
              try {
                animations?.startIntro();
              } catch (error) {
                console.warn("3D intro animation unavailable:", error);
              }
            }, 2500);
          });
          resizeHandler = () => {
            if (loadedCharacter) handleResize(renderer, camera, canvasDiv, loadedCharacter);
          };
          window.addEventListener("resize", resizeHandler);
        }
      }).catch((error) => {
        window.clearTimeout(loaderTimeout);
        console.error("3D preview could not be loaded; showing the portfolio without it:", error);
        progress.clear();
      });

      let mouse = { x: 0, y: 0 },
        interpolation = { x: 0.1, y: 0.2 };

      const onMouseMove = (event: MouseEvent) => {
        handleMouseMove(event, (x, y) => (mouse = { x, y }));
      };
      let debounce: number | undefined;
      const onTouchStart = (event: TouchEvent) => {
        const element = event.target as HTMLElement;
        debounce = setTimeout(() => {
          element?.addEventListener("touchmove", (e: TouchEvent) =>
            handleTouchMove(e, (x, y) => (mouse = { x, y }))
          );
        }, 200);
      };

      const onTouchEnd = () => {
        handleTouchEnd((x, y, interpolationX, interpolationY) => {
          mouse = { x, y };
          interpolation = { x: interpolationX, y: interpolationY };
        });
      };

      document.addEventListener("mousemove", onMouseMove);
      const landingDiv = document.getElementById("landingDiv");
      if (landingDiv) {
        landingDiv.addEventListener("touchstart", onTouchStart);
        landingDiv.addEventListener("touchend", onTouchEnd);
      }
      const animate = () => {
        frameId = requestAnimationFrame(animate);
        if (headBone) {
          handleHeadRotation(
            headBone,
            mouse.x,
            mouse.y,
            interpolation.x,
            interpolation.y,
            THREE.MathUtils.lerp
          );
          light.setPointLight(screenLight);
        }
        const delta = clock.getDelta();
        if (mixer) {
          mixer.update(delta);
        }
        renderer.render(scene, camera);
      };
      animate();
      return () => {
        cancelAnimationFrame(frameId);
        clearTimeout(debounce);
        scene.clear();
        renderer.dispose();
        if (resizeHandler) window.removeEventListener("resize", resizeHandler);
        if (canvasDiv.current) {
          canvasDiv.current.removeChild(renderer.domElement);
        }
        if (landingDiv) {
          landingDiv.removeEventListener("touchstart", onTouchStart);
          landingDiv.removeEventListener("touchend", onTouchEnd);
        }
        document.removeEventListener("mousemove", onMouseMove);
      };
    }
  }, []);

  return (
    <>
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
        </div>
      </div>
    </>
  );
};

export default Scene;
