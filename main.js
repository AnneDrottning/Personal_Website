'use strict'; // cannot use undeclared variables, code executed in strict mode

// Create a global variable to determine the current weather background:
var currWeather   = 'cloud'; // Always start with the clouds
// Create a global variable for the direction the elements will move
var currDirection = 'x'; // The clouds move in the x-direction

// Create the class to create the front page
class FrontPage extends React.Component {
    // The constructor
    //constructor(props) {
    //    super(props);
    //}

    // Function to actually render the page:
    render() {
        return (
            <div>
                {/* Display my name */}
                <div className="name">
                    <p className="theName">ANNE DROTTNING</p>
                </div>
                {/* Show the menu to choose weather */}
                <WeatherButton />
                {/* Show the elements */}
                <div>
                    <div>
                        {[...Array(Math.round(Math.random()*7) + 4)].map((x, i) =>
                            <Element type="cloud" key={"cloud" + i}
                                direction={"x"} />)}
                    </div>
                    <div>
                        {[...Array(Math.round(Math.random()*100) + 50)].map((x, i) =>
                            <Element type={"rain"} key={"rain" + i} direction={"y"}
                                 />)}
                    </div>

                </div>
            </div>
        );
    }
}

// Create the class for the elements on the screen
class Element extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() { // This happens after the elements have been created
        // Determine the positions of the different elements:
        if (this.props.type == "cloud") {
            Array.prototype.forEach.call(document.getElementsByClassName("cloud1"), function(c) {
                c.style.top  = Math.round(Math.random()*80 + 10) + "vh";
                c.style.left = Math.round(Math.random()*50 + 50) + "vw";
            })
            Array.prototype.forEach.call(document.getElementsByClassName("cloud2"), function(c) {
                c.style.top  = Math.round(Math.random()*70 + 10) + "vh";
                c.style.left = Math.round(Math.random()*75 + 50) + "vw";
            })
        } else if (this.props.type == "rain") {
            // Set the positions to above the screen with many different left positions
            Array.prototype.forEach.call(document.getElementsByClassName("drop1"), function(d) {
                d.style.top  = ((-1)*Math.round(Math.random()*40 + 10)) + "vh";
                d.style.left = Math.round(Math.random()*100) + "vw";
            })
            Array.prototype.forEach.call(document.getElementsByClassName("drop2"), function(d) {
                d.style.top  = ((-1)*Math.round(Math.random()*50 + 10)) + "vh";
                d.style.left = Math.round(Math.random()*100) + "vw";
            })
        }

        // Make the elements move the way we want them to:
        // The movement function:
        function movement() {
            // Need to define the different class names for the current weather situation
            var classIdentifiers = [];
            if (currWeather == "cloud") {
                classIdentifiers = ["cloud1", "cloud2"];
            } else if (currWeather == "rain") {
                classIdentifiers = ["drop1", "drop2"];
            }
            // Loop over each of the class names to update their positions = to make them move
            Array.prototype.forEach.call(classIdentifiers, function(ci) {
                var speed = 0;
                if (ci == "cloud1") {
                    speed = 0.0004;
                } else if (ci == "cloud2") {
                    speed = 0.0001;
                } else if (ci == "drop1") {
                    speed = 6;
                } else if (ci == "drop2") {
                    speed = 10;
                }
                // Loop over each class name and set the speeds for all the elements in the class
                Array.prototype.forEach.call(document.getElementsByClassName(ci), function(e) {
                    // Check to see the direction of the current elements
                    // For horizontal movement:
                    console.log(currDirection);
                    if (currDirection == 'x') {
                        // Extract the current position and the float value of this
                        var old_position = e.style.left;
                        var old_value    = parseFloat(old_position.substring(0,old_position.length-2));
                        // Update the new position according to the speed
                        var new_position = 0;
                        if (old_value > 150) {
                            // If the element has moved past the screen we set it to start from the other side again
                            new_position = -10;
                            // We also want to get a new vertical position for them:
                            e.style.top  = Math.round(Math.random()*90) + "vh";
                        } else {
                            new_position = old_value + speed;
                        }
                        e.style.left = new_position + "vw";
                    } else { // For vertical movement
                        // Extract the current position and the float value of this:
                        var old_position = e.style.top;
                        var new_position = parseFloat(old_position.substring(0, old_position.length-2));
                        // Update the new position according to the speed:
                        var new_position = 0;
                        if (old_value > 150) {
                            // If the element has moved past the screen we set it to start from the top again:
                            new_position = (-1)*(Math.round(Math.random()*20 + 10));
                            // We also get a new horizontal position for them:
                            e.style.left = Math.round(Math.random()*100) + "vw";
                        } else {
                            new_position = old_value + speed;
                        }
                        e.style.top = new_position + "vh";
                    }
                })
            })

        }
        // Executing the movement
        var allMovement = setInterval(movement, 10);

    }
    render() {
        // Want to display the clouds:
        if (this.props.type == "cloud") {
            // Want to see different variations of the clouds
            // Determine what type of cloud we have atm
            var cloudclass = "cloud" + (Math.round(Math.random()*1)+1);
            return (
                <p className={"fas fa-cloud " + cloudclass}></p>
            );
        } else if (this.props.type == "rain") {
            // Want to use different variations of the rain:
            // The current type of rain:
            var rainclass = "drop" + (Math.round(Math.random()*1) + 1);
            if (rainclass == "drop1") {
                return (
                    <p className={rainclass}>.</p>
                )
            } else {
                return (
                    <p className={rainclass}>I</p>
                )
            }
        }

    }
}

// Create the class for the button where we can change the weather
class WeatherButton extends React.Component {
    constructor(props) {
        super(props);
        // Need to bind the local functions:
        this.changeWeather     = this.changeWeather.bind(this);
    }

    // Function for when you want to change the weather:
    changeWeather(event) {
        function fade(oldWeather) {
            // Find the classnames we want to remove:
            var classesFade = [];
            if (oldWeather == "cloud") {
                classesFade = ["cloud1", "cloud2"];
            } else if (oldWeather == "rain") {
                classesFade = ["drop1", "drop2"];
            }
            // Before we can fade the elements, we need to extract their opacity and
            // set this in javascript as well:
            Array.prototype.forEach.call(classesFade, function(classname) {
                Array.prototype.forEach.call(document.getElementsByClassName(classname), function(obj) {
                    obj.style.opacity = getComputedStyle(obj).opacity;
                })
            })
            // Now that we know which objects to fade we fade them
            // First we create a timed function to decrease the opacity.
            function decreaseOpacity() {
                Array.prototype.forEach.call(classesFade, function(classname) {
                    Array.prototype.forEach.call(document.getElementsByClassName(classname), function(obj) {
                        obj.style.opacity = obj.style.opacity - 0.1;

                        if (obj.style.opacity < -1) {
                            clearInterval(fadeFunction);
                            fadeFunction = false;
                        }
                    })
                })
            }
            var fadeFunction = setInterval(decreaseOpacity, 200);
            // If the fade has been completed we delete the elements from the DOM:
            if (!fadeFunction) {
                Array.prototype.forEach.call(objectFade, function(o) {
                    o.style.display = 'none';
                })
            }
        }
        function activate(newWeather) {
            currWeather = event.target.id;
            if (currWeather == "rain") {
                // The classes we want to make visible:
                var visClasses = ["drop1", "drop2"];
                // Change the background color:
                document.body.style.backgroundColor = "#8090A7";
                // Determine the correct movement direction
                currDirection = "y";
                Array.prototype.forEach.call(visClasses, function(classname) {
                    Array.prototype.forEach.call(document.getElementsByClassName(classname), function(obj) {
                        obj.style.display = 'block';
                        obj.style.opacity = getComputedStyle(obj).opacity;
                    })
                })
                // Fade into view:
                function increaseOpacity() {
                    console.log("Start to increase opacity");
                    Array.prototype.forEach.call(visClasses, function(classname) {
                        Array.prototype.forEach.call(document.getElementsByClassName(classname), function(obj) {
                            console.log("old: " + obj.style.opacity);
                            var old = obj.style.opacity;
                            obj.style.opacity = old + 0.1;
                            console.log("new: " + obj.style.opacity);
                            console.log(obj.style.opacity);
                            if (obj.style.opacity >= 1) {
                                clearInterval(fadeIntoView);
                                fadeIntoView = false;
                            }
                        })
                    })
                }
                var fadeIntoView = setInterval(increaseOpacity, 200);

            }

        }
        if (currWeather != event.target.id) {
            // Want to fade the current weather away
            fade(currWeather);
            // And want the new weather to fade into view
            activate(event.target.id);
        }
    }

    render() {
        return (
            <div className="menu">
                {/* Create the menu and the corresponding buttons: */}
                <button className="weatherButton fas fa-cloud-sun-rain"></button>
                <div className="weatherContent">
                    {/* To change to the clouds: */}
                    <button className="weatherOption fas fa-cloud"
                        onClick={this.changeWeather}
                        id="cloud"></button>

                    {/* To change to rain: */}
                    <button className="weatherOption fas fa-cloud-showers-heavy"
                        onClick={this.changeWeather}
                        id="rain"></button>

                    {/* To change to snow: */}
                    <button className="weatherOption far fa-snowflake"></button>

                    {/* To change to nighttime: */}
                    <button className="weatherOption fas fa-moon"></button>

                </div>
            </div>
        )
    }
}

ReactDOM.render(<FrontPage />, document.getElementById('root'));
