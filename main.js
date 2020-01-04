'use strict'; // cannot use undeclared variables, code executed in strict mode

// Create the class to create the front page
class FrontPage extends React.Component {
    // The constructor
    constructor(props) {
        super(props);
    }

    // Function to actually render the page:
    render() {
        <div className="name">
            <p className="theName">ANNE DROTTNING</p>
        </div>
    }
}
//ReactDOM.render(<FrontPage />, document.getElementById('portfolio'));