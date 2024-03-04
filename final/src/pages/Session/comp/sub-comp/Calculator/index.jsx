import { useDispatch, useSelector } from "react-redux";
import classes from "./index.module.css";
import { setcalcvalue } from "../../../../../redux/reducer"; 
function Calculator(){
  const value = useSelector((state) => state.reducer.calcvalue);
  const dispatch=useDispatch();

  const handleKeyPress = (e) => {
    const key = e.key;

    if ((key >= '0' && key <= '9') || ['+', '-', 'x', '/'].includes(key)) {
      dispatch(setcalcvalue((prevValue) => prevValue + key));
    } else if (key === '.' && !value.includes('.')) {
      dispatch(setcalcvalue((prevValue) => prevValue + key));
    } else if (key === 'Enter') {
      e.preventDefault();
      evaluateExpression();
    } else if (key === 'Backspace') {
      dispatch(setcalcvalue((prevValue) => prevValue.slice(0, -1)));
    }
  };

  const evaluateExpression = () => {
    try {
      dispatch(setcalcvalue(eval(value).toString()));
    } catch (error) {
      dispatch(setcalcvalue('Error'));
    }
  };

    return(
<div className={classes.container}  onKeyDown={handleKeyPress}
      tabIndex="0">
      <div className={classes.calculator}>
        <form action="">
          <div className={classes.display}>
            <input type="text" value={value} />
          </div>
          <div>
            <input type="button" value="AC" onClick={() => dispatch(setcalcvalue(''))} />
            <input type="button" value="DE" onClick={() => dispatch(setcalcvalue(value.slice(0, -1)))} />
            <input type="button" value="." onClick={() => dispatch(setcalcvalue(value + '.'))} />
            <input type="button" value="/" onClick={() => dispatch(setcalcvalue(value + '/'))} />
          </div>
          <div>
            <input type="button" value="7" onClick={() => dispatch(setcalcvalue(value + '7'))} />
            <input type="button" value="8" onClick={() => dispatch(setcalcvalue(value + '8'))} />
            <input type="button" value="9" onClick={() => dispatch(setcalcvalue(value + '9'))} />
            <input type="button" value="*" onClick={() => dispatch(setcalcvalue(value + 'x'))} />
          </div>
          <div>
            <input type="button" value="4" onClick={() => dispatch(setcalcvalue(value + '4'))} />
            <input type="button" value="5" onClick={() => dispatch(setcalcvalue(value + '5'))} />
            <input type="button" value="6" onClick={() => dispatch(setcalcvalue(value + '6'))} />
            <input type="button" value="+" onClick={() => dispatch(setcalcvalue(value + '+'))} />
          </div>
          <div>
            <input type="button" value="1" onClick={() => dispatch(setcalcvalue(value + '1'))} />
            <input type="button" value="2" onClick={() => dispatch(setcalcvalue(value + '2'))} />
            <input type="button" value="3" onClick={() => dispatch(setcalcvalue(value + '3'))} />
            <input type="button" value="-" onClick={() => dispatch(setcalcvalue(value + '-'))} />
          </div>
          <div>
            <input type="button" value="00" onClick={() => dispatch(setcalcvalue(value + '00'))} />
            <input type="button" value="0" onClick={() => dispatch(setcalcvalue(value + '0'))} />
            <input type="button" value="=" className={classes.equal} onClick={() => dispatch(setcalcvalue(eval(value)))} />
          </div>
        </form>
      </div>
    </div>
  );
}



export default Calculator ;