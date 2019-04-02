import React, { useState } from 'react';
import styles from './floatingButton.module.scss';

const floatingButton = (props) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [bottomMargin, setBottomMargin] = useState(40);
  const [rightMargin, setRightMargin] = useState(40);
  // const [startClick, setStartClick] = useState({});

  const getDistanceToCenter = (e) => {
    return {
      left: e.pageX - e.target.offsetLeft,
      top: e.pageY - e.target.offsetTop,
    };
  }

  const onButtonDownHandler = (e) => {
    e.persist();
    console.log(e);
    setIsMouseDown(true);
    // setStartClick({x: e.pageX, y: e.pageY});
  };

  const onButtonMoveHandler = (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const mousePosition = {x: e.pageX, y: e.pageY};
    const buttonSize = {width: e.target.offsetWidth, height: e.target.offsetHeight};

    const { left, top } = getDistanceToCenter(e);
    setBottomMargin(window.innerHeight - mousePosition.y - (buttonSize.height / 2));
    setRightMargin(window.innerWidth - mousePosition.x - (buttonSize.width / 2));
  };

  const onButtonUpHandler = () => {
    setIsMouseDown(false);
    // setStartClick({});
  }

  const onButtonLeaveHandler = () => {
    setIsMouseDown(false);
    // setStartClick({});
  }

  return (
    <button
      className={styles.button}
      style={{ bottom: bottomMargin, right: rightMargin }}
      onMouseDown={onButtonDownHandler}
      onMouseMove={onButtonMoveHandler}
      onMouseUp={onButtonUpHandler}
      onMouseLeave={onButtonLeaveHandler}
    >
      {props.text}
    </button>
  );
};

export default floatingButton;
