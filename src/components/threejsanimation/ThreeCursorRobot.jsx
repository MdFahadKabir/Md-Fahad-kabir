import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const MODEL_URL =
  "https://threejs.org/examples/models/gltf/RobotExpressive/RobotExpressive.glb";
export default function ThreeCursorRobot() {
  const mountRef = useRef(null);
  const actionsRef = useRef({});
  const activeActionRef = useRef(null);
  const mixerRef = useRef(null);
  const robotRef = useRef(null);
  const faceRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return undefined;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.25,
      100
    );
    camera.position.set(-5, 3, 10);
    camera.lookAt(0, 2, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearAlpha(0);
    container.appendChild(renderer.domElement);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x8d8d8d, 2.5);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight.position.set(0, 20, 10);
    scene.add(dirLight);

    const clock = new THREE.Clock();
    const loader = new GLTFLoader();
    const cursor = {
      x: window.innerWidth * 0.5,
      y: window.innerHeight * 0.5,
    };
    const follower = {
      x: cursor.x,
      y: cursor.y,
    };
    const target = {
      x: cursor.x,
      y: cursor.y,
    };
    let lastMoveAt = performance.now();
    let isMoving = false;
    let isOneShotPlaying = false;
    let robot = null;
    let frameId = 0;

    let isCardHovered = false;
    let currentCard = null;
    let cardAttachment = "top";
    let cardAction = "Dance";
    let lastActionChangeTime = 0;
    let currentIdleAction = "Wave";

    const fadeToAction = (name, duration) => {
      const next = actionsRef.current[name];
      const current = activeActionRef.current;
      if (!next || current === next) return;
      if (current) current.fadeOut(duration);
      next
        .reset()
        .setEffectiveTimeScale(1)
        .setEffectiveWeight(1)
        .fadeIn(duration)
        .play();
      activeActionRef.current = next;
    };

    const setExpression = (name) => {
      const face = faceRef.current;
      if (!face?.morphTargetDictionary || !face.morphTargetInfluences) return;
      const dict = face.morphTargetDictionary;
      const influences = face.morphTargetInfluences;
      Object.keys(dict).forEach((key) => {
        influences[dict[key]] = 0;
      });
      const match = Object.keys(dict).find((key) =>
        key.toLowerCase().includes(name.toLowerCase())
      );
      if (match) influences[dict[match]] = 1;
    };

    const clearExpression = () => {
      const face = faceRef.current;
      if (!face?.morphTargetDictionary || !face.morphTargetInfluences) return;
      const dict = face.morphTargetDictionary;
      const influences = face.morphTargetInfluences;
      Object.keys(dict).forEach((key) => {
        influences[dict[key]] = 0;
      });
    };

    const playRandomClickReaction = () => {
      if (isOneShotPlaying) return;
      const actionPool = ["Jump", "ThumbsUp", "Dance"];
      const reactionPool = ["happy", "angry", ...actionPool];
      const selected =
        reactionPool[Math.floor(Math.random() * reactionPool.length)];

      if (selected === "happy" || selected === "angry") {
        setExpression(selected);
        window.setTimeout(() => {
          if (!isOneShotPlaying) clearExpression();
        }, 700);
        return;
      }

      const oneShotAction = actionsRef.current[selected];
      if (!oneShotAction || !mixerRef.current) return;
      isOneShotPlaying = true;
      fadeToAction(selected, 0.15);

      const restore = () => {
        mixerRef.current?.removeEventListener("finished", restore);
        isOneShotPlaying = false;
        clearExpression();
      };
      mixerRef.current.addEventListener("finished", restore);
    };

    loader.load(
      MODEL_URL,
      (gltf) => {
        robot = gltf.scene;
        robotRef.current = robot;
        robot.scale.set(1.4, 1.4, 1.4);
        robot.position.set(0, -1.8, 0);
        scene.add(robot);

        const mixer = new THREE.AnimationMixer(robot);
        mixerRef.current = mixer;
        const actions = {};
        gltf.animations.forEach((clip) => {
          const action = mixer.clipAction(clip);
          if (
            ["Jump", "Death"].includes(clip.name)
          ) {
            action.clampWhenFinished = true;
            action.loop = THREE.LoopOnce;
          } else if (
            ["Yes", "No", "Wave", "Dance", "ThumbsUp"].includes(clip.name)
          ) {
            action.clampWhenFinished = false;
            action.loop = THREE.LoopRepeat;
          }
          actions[clip.name] = action;
        });
        actionsRef.current = actions;
        faceRef.current = robot.getObjectByName("Head_4") || null;

        fadeToAction("Wave", 0.2);
      },
      undefined,
      (error) => {
        console.error("Unable to load robot model:", error);
      }
    );

    const onMouseMove = (event) => {
      cursor.x = event.clientX;
      cursor.y = event.clientY;
      lastMoveAt = performance.now();

      const card = event.target.closest('.robot-interaction-card, .glass, .card');
      if (card !== currentCard) {
        currentCard = card;
        if (card) {
          isCardHovered = true;
          const positions = ["top", "left", "right"];
          cardAttachment = positions[Math.floor(Math.random() * positions.length)];
          const actions = ["Dance", "Wave", "ThumbsUp", "Yes"];
          cardAction = actions[Math.floor(Math.random() * actions.length)];
        } else {
          isCardHovered = false;
        }
      }
    };
    window.addEventListener("mousemove", onMouseMove);
    const onMouseDown = (event) => {
      if (event.button !== 0) return;
      playRandomClickReaction();
    };
    window.addEventListener("mousedown", onMouseDown);

    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      if (mixerRef.current) mixerRef.current.update(delta);

      if (isCardHovered && currentCard) {
        const rect = currentCard.getBoundingClientRect();
        if (cardAttachment === "top") {
          target.x = rect.left + rect.width / 2;
          target.y = rect.top - 20;
        } else if (cardAttachment === "left") {
          target.x = rect.left - 40;
          target.y = rect.top + rect.height / 2;
        } else if (cardAttachment === "right") {
          target.x = rect.right + 40;
          target.y = rect.top + rect.height / 2;
        }
      } else {
        target.x = cursor.x;
        target.y = cursor.y;
      }

      const dx = target.x - follower.x;
      const dy = target.y - follower.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 2) {
         const maxSpeed = 15;
         const followSpeed = distance * 0.15;
         const actualSpeed = Math.min(maxSpeed, followSpeed);
         follower.x += (dx / distance) * actualSpeed;
         follower.y += (dy / distance) * actualSpeed;
      } else {
         follower.x = target.x;
         follower.y = target.y;
      }

      const offsetX = 26;
      const offsetY = 18;
      container.style.transform = `translate3d(${follower.x + offsetX}px, ${follower.y + offsetY}px, 0)`;

      const isWalking = distance > 25;

      if (performance.now() - lastActionChangeTime > 4000) {
        const pool = ["Dance", "Wave", "ThumbsUp", "Yes", "No"];
        cardAction = pool[Math.floor(Math.random() * pool.length)];
        currentIdleAction = pool[Math.floor(Math.random() * pool.length)];
        lastActionChangeTime = performance.now();
      }

      if (!isOneShotPlaying) {
        if (isWalking) {
           fadeToAction("Walking", 0.2);
           if (robot) {
              const targetRotationY = dx > 0 ? 0.8 : -0.8;
              robot.rotation.y = THREE.MathUtils.lerp(robot.rotation.y, targetRotationY, 0.1);
           }
        } else {
           if (isCardHovered) {
               fadeToAction(cardAction, 0.2);
               if (robot) {
                 const normalizedX = (cursor.x / window.innerWidth) * 2 - 1;
                 robot.rotation.y = THREE.MathUtils.lerp(robot.rotation.y, normalizedX * 0.9, 0.1);
               }
           } else {
               const movingNow = performance.now() - lastMoveAt < 120;
               fadeToAction(movingNow ? "Walking" : currentIdleAction, 0.2);
               if (robot) {
                 if (movingNow) {
                   const rotationTarget = (cursor.x - follower.x) > 0 ? 0.8 : -0.8;
                   robot.rotation.y = THREE.MathUtils.lerp(robot.rotation.y, rotationTarget, 0.1);
                 } else {
                   const normalizedX = (cursor.x / window.innerWidth) * 2 - 1;
                   robot.rotation.y = THREE.MathUtils.lerp(robot.rotation.y, normalizedX * 0.9, 0.1);
                 }
               }
           }
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("resize", onResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.traverse((object) => {
        if (object.isMesh) {
          object.geometry?.dispose?.();
          if (Array.isArray(object.material)) {
            object.material.forEach((m) => m?.dispose?.());
          } else {
            object.material?.dispose?.();
          }
        }
      });
      actionsRef.current = {};
      activeActionRef.current = null;
      mixerRef.current = null;
      robotRef.current = null;
      faceRef.current = null;
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="pointer-events-none fixed left-0 top-0 z-9999 h-[170px] w-[170px] -translate-x-1/2 -translate-y-1/2"
      aria-hidden="true"
    />
  );
}
