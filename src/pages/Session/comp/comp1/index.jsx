import React, { useState } from 'react';
import Draggable from 'react-draggable';
import classes from'./index.module.css'; // Assuming you have a CSS file for styling
import Calculator from '../sub-comp/Calculator/index';
import StopWatch from '../sub-comp/stopwatch/index';
import TodoList from '../sub-comp/todo/index';
import { setActiveDrags,setDeltaPosition,setControlledPosition,setCalculatorVisible,setTodoListVisible,setStopWatchVisible } from '../../../../redux/reducer';
import { useDispatch, useSelector } from 'react-redux';
function DragSwitch() {
const dispatch=useDispatch();
  const activeDrags = useSelector((state) => state.reducer.activeDrags);
  const deltaPosition = useSelector((state) => state.reducer.deltaPosition);
  const controlledPosition = useSelector((state) => state.reducer.controlledPosition);
  const calculatorVisible = useSelector((state) => state.reducer.calculatorVisible);
  const todoListVisible = useSelector((state) => state.reducer.todoListVisible);
  const stopWatchVisible = useSelector((state) => state.reducer.stopWatchVisible);
  

  const handleDrag = (e, ui) => {
    const { x, y } = deltaPosition;
    dispatch(setDeltaPosition({
      x: x + ui.deltaX,
      y: y + ui.deltaY,   
    }));
  }
  const onStart = () => {
    dispatch(setActiveDrags(activeDrags + 1));
  };

  const onStop = () => {
    dispatch(setActiveDrags(activeDrags - 1));
  };

  const onDrop = (e) => {
    dispatch(setActiveDrags(activeDrags - 1));
    if (e.target.classList.contains("drop-target")) {
      alert("Dropped!");
      e.target.classList.remove('hovered');
    }
  };

  const onDropAreaMouseEnter = (e) => {
    if (activeDrags) {
      e.target.classList.add('hovered');
    }
  };

  const onDropAreaMouseLeave = (e) => {
    e.target.classList.remove('hovered');
  };

  const adjustXPos = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { x, y } = controlledPosition;
    dispatch(setControlledPosition({ x: x - 10, y }));
  };

  const adjustYPos = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { x, y } = controlledPosition;
    dispatch(setControlledPosition({ x, y: y - 10 }));
  };

  const onControlledDrag = (e, position) => {
    const { x, y } = position;
    dispatch(setControlledPosition({ x, y }));
  };

  const onControlledDragStop = (e, position) => {
    onControlledDrag(e, position);
    onStop();
  };

  const dragHandlers = { onStart, onStop,     
};

  const toggleCalculator = () => {
    dispatch(setCalculatorVisible());
  };

  // Function to toggle visibility of TodoList component
  const toggleTodoList = () => {
    dispatch(setTodoListVisible());
  };

  // Function to toggle visibility of StopWatch component
  const toggleStopWatch = () => {
    dispatch(setStopWatchVisible());
  };

  const renderComponent = (title, content, isVisible) => {
    if (!isVisible) return null;

    return (
      <Draggable {...dragHandlers}>
        <div className={classes.contain}>
          <strong>
            <div className={classes.title}>{title}</div>
          </strong>
          <div className={classes.text}>{content}</div>
        </div>
      </Draggable>
    );
  };
  
  return (
    <>
           <Draggable className={classes.grid} handle="strong" {...dragHandlers}>
          <div className="box no-cursor">
            <strong className="cursor"><div className={classes.text}>Drag From  here</div></strong>
        {/* <div className={classes.grid}> */}
        <button onClick={toggleCalculator} id="Calculator" className={`${classes.griditem} ${calculatorVisible ? classes.griditemactive : classes.griditemnormal}`}>
          Calculator
        </button>
        <button onClick={toggleTodoList} id="TodoList" className={`${classes.griditem} ${todoListVisible ? classes.griditemactive : classes.griditemnormal}`}>
          TodoList
        </button>
        <button onClick={toggleStopWatch} id="StopWatch" className={`${classes.griditem} ${stopWatchVisible ? classes.griditemactive : classes.griditemnormal}`}>
          StopWatch
        </button>
      </div>
          {/* </div> */}
        </Draggable>



      {renderComponent("Calculator", <Calculator />, calculatorVisible)}
      {renderComponent("TodoList", <TodoList />, todoListVisible)}
      {renderComponent("StopWatch", <StopWatch />, stopWatchVisible)}

    </>
    

  );
}

export default DragSwitch;
