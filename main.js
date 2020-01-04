'use strict'; // cannot use undeclared variables, code executed in strict mode

// Create a global variable to determine the current weather background:
var currWeather = 'cloudy'; // Always start with the clouds

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
                {/* Show the clouds */}
                <div>
                    <Element type="cloud" />
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
    render() {
        if (this.props.type == "cloud") {
            return (
                <p className="fas fa-cloud cloud1"></p>
            );
        }
        
    }
}

ReactDOM.render(<FrontPage />, document.getElementById('root'));