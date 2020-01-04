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
                {/* Show the clouds */}
                <div>
                    {[...Array(Math.round(Math.random()*(7))+4)].map((x, i) => 
                        <Element type={currWeather} key={currWeather + i} 
                            direction="x" />)}
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
        }

        // Make the elements move the way we want them to:
        // The movement function:
        function movement() {
            // Need to define the different class names for the current weather situation
            var classIdentifiers = [];
            if (currWeather == "cloud") {
                classIdentifiers = ["cloud1", "cloud2"];
            }
            // Loop over each of the class names to update their positions = to make them move
            Array.prototype.forEach.call(classIdentifiers, function(ci) {
                var speed = 0.0;
                // Use predetermined speeds for the different classnames
                if (ci == "cloud1") {
                    speed = 0.004;
                } else if (ci == "cloud2") {
                    speed = 0.001;
                }
                // Loop over each class name and set the speeds for all the elements in the class
                Array.prototype.forEach.call(document.getElementsByClassName(ci), function(e) {
                    // Check to see the direction of the current elements
                    // For horizontal movement:
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
                    }
                })
            })
            
        }
        // Executing the movement
        if (this.props.type == "cloud") {
            var cloudMovement = setInterval(movement, 10);
        }
        
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
        }
        
    }
}

// Create the class for the button where we can change the weather
class WeatherButton extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="menu">
                {/* Create the menu and the corresponding buttons: */}
                <button className="weatherButton fas fa-cloud-sun-rain">
                    <div className="weatherContent">
                        {/* To change to the clouds: */}
                        <button className="weatherOption fas fa-cloud"></button>

                        {/* To change to rain: */}
                        <button className="weatherOption fas fa-cloud-showers-heavy"></button>

                        {/* To change to snow: */}
                        <button className="weatherOption far fa-snowflake"></button>
                        
                        {/* To change to nighttime: */}
                        <button className="weatherOption fas fa-moon"></button>
                    </div>
                </button>
            </div>
        )
    }
}

ReactDOM.render(<FrontPage />, document.getElementById('root'));