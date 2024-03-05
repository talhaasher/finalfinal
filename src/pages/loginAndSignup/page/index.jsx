import classes from './index.module.css';
import Login from '..//comp/comp1/index';
import Signup from '..//comp/comp2/index';

import { useDispatch, useSelector } from 'react-redux';
import { setLogRegSwitch} from "../../../redux/reducer";
function LoginSighnup() {
  const dispatch = useDispatch();
  const islogreg = useSelector((state) => state.reducer.islogreg);


  const switchState = () => {
    dispatch(setLogRegSwitch());
  };

  return (
    <>
    
       <div className={classes.conatin}>
        {islogreg === true ? (
          <Login loginState={switchState} />
        ) : (
          <Signup registerState={switchState} />
        )}
      </div>

    </>
  );
}
export default LoginSighnup;


