import React, { useState } from 'react';
import styles from './floatingButton.module.scss';

const floatingButton = (props) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [bottomMargin, setBottomMargin] = useState(40);
  const [rightMargin, setRightMargin] = useState(40);
  // const [startClick, setStartClick] = useState({});

  const getDistanceToCenter = (e, buttonSize) => {
    const buttonLeftMargin = e.pageX - e.target.offsetLeft;
    const buttonTopMargin = e.pageY - e.target.offsetTop;

    return {
      left: buttonSize.width - buttonLeftMargin,
      top: buttonSize.height - buttonTopMargin,
    };
  }

  const onButtonDownHandler = (e) => {
    setIsMouseDown(true);
  };

  const onButtonMoveHandler = (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const mousePosition = {x: e.pageX, y: e.pageY};
    const buttonSize = {width: e.target.offsetWidth, height: e.target.offsetHeight};

    const { left, top } = getDistanceToCenter(e, buttonSize);
    setBottomMargin(window.innerHeight - mousePosition.y - (buttonSize.height / 2) - top);
    setRightMargin(window.innerWidth - mousePosition.x - (buttonSize.width / 2) - left);
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
