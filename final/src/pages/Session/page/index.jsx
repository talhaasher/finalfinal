import Header from "../../genrelComps/Header";
import DragSwitch from "../comp/comp1";
import classes from "./index.module.css";

function Session() {
  return (
    <div className={classes.body}>
    <Header/>
    <DragSwitch/>
    </div>
  );
}

export default Session;
