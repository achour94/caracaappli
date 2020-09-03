import React , {Component} from 'react';
import classes from './Dice.css'

class Die extends Component {
    /*constructor(props) {
        super(props);
        this.sides = [
            "translateZ(-100px) rotateY(0deg)",
            "translateZ(-100px) rotateX(-180deg)",
            "translateZ(-100px) rotateY(-90deg)",
            "translateZ(-100px) rotateY(90deg)",
            "translateZ(-100px) rotateX(-90deg)",
            "translateZ(-100px) rotateX(90deg)"
        ];
        this.handleClick = this.handleClick.bind(this);
        this.render = this.render.bind(this);
    }*/
    state = {
        sides : [
        "translateZ(-100px) rotateY(0deg)",
        "translateZ(-100px) rotateX(-180deg)",
        "translateZ(-100px) rotateY(-90deg)",
        "translateZ(-100px) rotateY(90deg)",
        "translateZ(-100px) rotateX(-90deg)",
        "translateZ(-100px) rotateX(90deg)"
    ]
    }
    

    handleClick = (e) => {
        if (this.props.isClicked) {
            let die = document.getElementById("die");
        let sides = this.state.sides
        let roll = null;

        die.classList.add(classes.Rolling);

        const promise1 = new Promise((resolve, reject) => {
            setTimeout(() => {
                roll = Math.floor(Math.random() * (sides.length))
                die.classList.remove(classes.Rolling);
                die.style.transform = sides[roll];
              resolve(roll);
            }, 750);
          });
          
          promise1.then((value) => {
            console.log(value+1);
            this.props.clicked(value +1)
            // expected output: "foo"
          });

        }

        
       /* setTimeout(function () {
            roll = Math.floor(Math.random() * (sides.length))
            die.classList.remove(classes.Rolling);
            die.style.transform = sides[roll];
            
        }, 750);*/
    }

    render() {
        let divs = this.state.sides.map((side, index) => {
            return <div key={index+1} className={classes.Side}>{index+1}</div>
        });

        return (
            
            <div className={classes.DieContainer} onClick={ this.handleClick }>
                <div id="die" 
                    className={classes.Die + ' ' + classes.D6}>
                    { divs }
                </div>
            </div>
        );
    }
}

export default Die;