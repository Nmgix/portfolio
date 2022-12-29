import { randomIntFromInterval } from "helpers/randomNumber";
import { getRandomColor } from "helpers/randomColor";
import Konva from "konva";
import { TransitionStyles } from "nmgix-components/src";
import useWindowDimentions from "nmgix-components/src/hooks/useWindowDimentions";
import React, { RefObject, useEffect, useRef, useState } from "react";
import { Circle, Stage } from "react-konva";
import { Layer, Rect } from "react-konva";
import { Transition } from "react-transition-group";
import { v4 as uuid } from "uuid";

import styles from "./_background.module.scss";
import gsap, { TimelineLite } from "gsap";

type ObjectSize = {
  width: number;
  height: number;
};
type Position = {
  x: number;
  y: number;
};

type BackgroundCircle = {
  id: string;
  size: ObjectSize;
  from: Position;
  to: Position;
  duration: number;
  fill: string[];
  callback: () => void;
};

const CircleCanvas: React.FC<BackgroundCircle> = ({ size, from, to, duration, fill, callback }) => {
  const circleRef: RefObject<Konva.Circle> = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(circleRef.current, {
      opacity: 0,
      duration: duration,
      delay: 1.5,
      onComplete: callback,
    });
  }, []);

  return <Circle width={size.width} height={size.height} x={from.x} y={from.y} fill={fill[0]} ref={circleRef} />;
};

const ElementsLayout: React.FC<{ windowSizes: { width: number; height: number } }> = ({ windowSizes }) => {
  const [objects, setObjects] = useState<BackgroundCircle[]>([]);

  const createObject: () => BackgroundCircle = () => {
    const id = uuid();

    return {
      id,
      duration: randomIntFromInterval(0, 60),
      fill: [getRandomColor(), getRandomColor()],
      from: {
        x: randomIntFromInterval(0, windowSizes.width),
        y: randomIntFromInterval(0, windowSizes.height),
      },
      to: {
        x: randomIntFromInterval(0, windowSizes.width),
        y: randomIntFromInterval(0, windowSizes.height),
      },
      size: {
        width: randomIntFromInterval(150, 350),
        height: randomIntFromInterval(150, 350),
      },
      callback: () => {
        setObjects((prev) => prev.filter((object) => object.id !== id));
        const object = createObject();
        setObjects((prev) => [...prev, object]);
      },
    };
  };

  useEffect(() => {
    for (let i = 0; i < randomIntFromInterval(3, 10); i++) {
      const object = createObject();
      setObjects((prev) => [...prev, object]);
    }
  }, []);

  const layerRef: RefObject<Konva.Layer> = useRef(null);

  return (
    <Layer ref={layerRef}>
      {objects.map((object) => (
        <CircleCanvas {...object} key={object.id} />
      ))}
    </Layer>
  );
};

const Background: React.FC = () => {
  const windowSizes = useWindowDimentions();

  const [rendered, setRendered] = useState<boolean>(false);
  useEffect(() => {
    setRendered(true);
  }, []);
  const transitionStyles: TransitionStyles = {
    entering: { opacity: 0 },
    entered: { opacity: 1, transition: "all 3s" },
    exited: { opacity: 0 },
  };

  const stageRef: RefObject<Konva.Stage> = useRef(null);

  return (
    <Transition in={rendered} timeout={300}>
      {(state) => (
        <Stage
          width={windowSizes.width}
          height={800}
          className={styles.background}
          ref={stageRef}
          style={{ ...transitionStyles[state as keyof TransitionStyles] }}>
          <ElementsLayout windowSizes={windowSizes} />
        </Stage>
      )}
    </Transition>
  );
};

export default Background;

// canvas blur()
// A CSS <length>. Applies a Gaussian blur to the drawing. It defines the value of the standard deviation to the Gaussian function, i.e.,
// how many pixels on the screen blend into each other; thus, a larger value will create more blur. A value of 0 leaves the input unchanged.

// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/filter
