import React, { useEffect, useState } from "react";

function SaleBanner() {
  const calculateTimeLeft = () => {
    let year = new Date().getFullYear(); //will grab the current year.

    /*The + before the new Date object is shorthand to tell JavaScript to cast the object as an integer, 
    which gives you the object’s Unix timestamp represented as microseconds since the epoch.--25/sept/2023*/
    const difference = +new Date(`09/25/${year}`) - +new Date(); //calculate the difference between dates

    let timeLeft = {};
    //calculate the total number of days, hours, minutes, and seconds
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  /*The useState method accepts a parameter to set the initial state and returns an 
  array containing the current state and a function to set the state. */
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft()); //remaining time, array destructuring

  //setTimeout(combination of useEffect and useState) and the similar setInterval method are common
  //React patterns when used inside of the useEffect hook.
  useEffect(() => {
    const timer = setTimeout(() => {
      //setTimeout is a method inside of the useEffect hook
      setTimeLeft(calculateTimeLeft());
    }, 1000); // 1 second

    /*The return function runs every time the useEffect runs the timer except for the first run 
    of the component and will clear out the timeout if the component is unmounted. */
    return () => clearTimeout(timer);
  });

  const timerComponents = [];
  //Object.keys to iterate over the timeLeft object and build out a display component
  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }
    /** If the timer interval has a value greater than zero, it adds an element to the timerComponents array.
     * Note: The extra {" "} in the code is used so that the intervals that display the time left do not run
     * into each other when displayed on the screen.
     * The {} allow you to use JavaScript inside your JSX and the "" add the space.*/
    timerComponents.push(
      <span>
        {timeLeft[interval]} {interval}{" "}
      </span>,
    );
  });

  return (
    <>
      {
        <header className="flex mx-auto flex-col justify-center text-center items-center">
          <h1 className="font-bold text-4xl my-2">
            Mix & Match Buy 1 Get 50% off!
          </h1>
          <h2 id="headerLetter" className="font-bold text-2xl my-2">
            {timerComponents.length ? (
              <div>The Sale Ends In: {timerComponents}</div>
            ) : (
              <span>Time's up!</span>
            )}
          </h2>
        </header>
      }
    </>
  );
}

export default SaleBanner;

/**React has a special markup language called JSX. It is a mix of HTML and JavaScript syntax.
 * JSX is an abstraction that allows you to write HTML-like syntax in your JavaScript code and will
 * enable you to build React components that look like standard HTML markup. JSX is the templating
 * language of React elements, and is therefore the foundation for any markup that React will render
 * into your application.*/
