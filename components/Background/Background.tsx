import { randomIntFromInterval } from "helpers/randomNumber";
import { getRandomColor } from "helpers/randomColor";
import Konva from "konva";
import { TransitionStyles } from "nmgix-components/src";
import useWindowDimentions from "nmgix-components/src/hooks/useWindowDimentions";
import useDocumentDimentions from "nmgix-components/src/hooks/useDocumentDimentions";
import React, { RefObject, useEffect, useRef, useState } from "react";
import { Circle, Stage } from "react-konva";
import { Layer, Rect } from "react-konva";
import { Transition } from "react-transition-group";
import { v4 as uuid } from "uuid";

import styles from "./_background.module.scss";
import gsap from "gsap";
import { Power3 } from "gsap";
import { KonvaEventObject } from "konva/lib/Node";

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

const backgroundTransitionStyles: TransitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1, transition: "all 3s" },
  exited: { opacity: 0 },
};

const CircleCanvas: React.FC<BackgroundCircle> = ({ size, from, to, duration, fill, callback }) => {
  const circleRef: RefObject<Konva.Circle> = useRef(null);

  useEffect(() => {
    // circleRef.current!.cache({ offset: 100 });

    const tl = gsap.timeline();

    tl.to(circleRef.current, {
      opacity: 1,
      duration: 1,
    }).to(circleRef.current, {
      x: to.x,
      y: to.y,
      ease: Power3.easeInOut,
      duration: duration,
      opacity: 0,
      onComplete: callback,
    });
  }, []);

  return (
    <Circle width={size.width} height={size.height} x={from.x} y={from.y} fill={fill[0]} ref={circleRef} opacity={0} />
  );
};

const ElementsLayout: React.FC<{
  windowSizes: { width: number; height: number };
  mouseCircleRef: RefObject<Konva.Circle>;
}> = ({ windowSizes, mouseCircleRef }) => {
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
    for (let i = 0; i < randomIntFromInterval(10, 20); i++) {
      const object = createObject();
      setObjects((prev) => [...prev, object]);
    }
  }, []);

  return (
    <Layer>
      {objects.map((object) => (
        <CircleCanvas {...object} key={object.id} />
      ))}
      <Circle
        width={150}
        height={150}
        x={windowSizes.width / 2}
        y={400}
        fill={getRandomColor()}
        ref={mouseCircleRef}
        opacity={1}
      />
    </Layer>
  );
};

const Background: React.FC = () => {
  const windowSizes = useWindowDimentions();

  const [rendered, setRendered] = useState<boolean>(false);
  useEffect(() => {
    setRendered(true);
    mouseCircleRef.current!.cache();
  }, []);

  const stageRef: RefObject<Konva.Stage> = useRef(null);

  const mouseCircleRef: RefObject<Konva.Circle> = useRef(null);
  const mouseRefFadeIn = (ref: RefObject<Konva.Circle>) => {
    const tl = gsap.timeline();
    tl.to(ref.current, {
      opacity: 1,
      duration: 1,
    });
  };
  const mouseRefFadeOut = (ref: RefObject<Konva.Circle>) => {
    const tl = gsap.timeline();
    tl.to(ref.current, {
      opacity: 0,
      duration: 1,
    });
  };
  const mouseRefMove = (ref: RefObject<Konva.Circle>, e: KonvaEventObject<MouseEvent>) => {
    const tl = gsap.timeline();
    tl.to(ref.current, {
      x: e.evt.pageX,
      y: e.evt.pageY,
    });
  };

  return (
    <Transition in={rendered} timeout={300}>
      {(state) => (
        <Stage
          width={windowSizes.width}
          height={800}
          className={styles.background}
          ref={stageRef}
          style={{ ...backgroundTransitionStyles[state as keyof TransitionStyles] }}
          onMouseMove={(e) => mouseRefMove(mouseCircleRef, e)}
          onMouseLeave={() => mouseRefFadeOut(mouseCircleRef)}
          onMouseEnter={() => mouseRefFadeIn(mouseCircleRef)}>
          <ElementsLayout windowSizes={windowSizes} mouseCircleRef={mouseCircleRef} />
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
