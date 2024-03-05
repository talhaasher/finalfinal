
import classes from "./index.module.css";
import banner from "../../../../assets/banner.jpeg";
// import banner from "../../../../assets/banner.jpeg";

function Section1() {
    return (
      <section className={classes.section1}>
        <div className={classes.info}>
          <p>Study Smart, Together We Shine<br />Your Learning Journey with Study Buddy</p>
          <div className={classes.button_container}>
            <button><a href="/auth">Login</a> </button>
            <button><a href="/auth">Register</a> </button>
          </div>
        </div>
        <div className={classes.banner1}>
          <img src={banner} alt="Banner" />
        </div>
      </section>
    );
  }
  
  export default Section1;
  