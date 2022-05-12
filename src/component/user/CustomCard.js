import React, {Component} from 'react';
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import "../../css/CustomCard.css";
import {AdminService} from "../../service/AdminService";
import {withRouter} from 'react-router';

class CustomCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            quantity: "",
            bookID: "",
            title1: "Add To Bag",
            title2: "Wishlist",
            color: "rgb(165,42,42)",
            counter: 0,
            badgeSize: '',
            addedInCart:false
        }
    }

    myCartData = () => {
        const cartDTO = {
            "id": this.props.book.id,
            "quantity": 1,
            "totalPrice":this.props.book.bookPrice,
            "bookName": this.props.book.bookName,
            "authorName": this.props.book.authorName,
            "imageURL":this.props.book.imageURL,
            "bookPrice": this.props.book.bookPrice
        }
        return cartDTO
    }

    changeText = () => {
        if (this.state.title === "GO TO CART") {
            this.props.history.push("/cart");
        }
        if (this.state.title !== "GO TO CART") {
            new AdminService().addToCart(this.myCartData());
            this.setState({
                title: "GO TO CART", color: "rgb(51,113,181)"
            })
            this.props.cartReference.current.handleBadgeCount(this.state.badgeSize, "addButton");
        }
    }

    componentDidMount() {
        // let user = localStorage.getItem('Authorization')
        // if(user !== null) {
            this.handleButtonState()
        // }
    }

    handleButtonState = () => {
        //new AdminService().myCart().then(response => {
            this.handleButton(new AdminService().myCart());
        //}).catch((error) => {
          //  console.log(error)
        // })
    }

    handleButton = (data) => {
        this.setState({
            badgeSize: data.length
        })
        data.filter(data => {
          
            if (data.id === this.props.book.id) {
                this.setState({
                    title: "GO TO CART", color: "rgb(51,113,181)"
                })
            }
            return null
        })
        this.props.cartReference.current.handleBadgeCount(data.length, "updateButton")
    }

    render() {
        let index = this.props.index;
        let book = this.props.book;
        return (
            <Card className="gridroot">
                <span className="tooltiptext"
                      style={(index + 1) % 4 === 0 ? {marginLeft: "-315px"} : {marginLeft: "106px"}}><b>Book Description:</b><p
                    className="tooltip-p">{book.description}</p></span>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        className="image1"
                        height="100"
                        //image={require('../../assets/Bob.jpg')}/>
                        image={book.imageURL}/>
                    <div id="stock-label" style={book.quantity === 0 ? {
                        visibility: "visible",
                        color: "#FF0000"
                    } : {visibility: "hidden"}}>Out Of Stock
                    </div>
                </CardActionArea>
                <CardContent>
                    <Typography component="h2" id="bookname">
                        <b> {book.bookName}</b>
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" id="authorname">
                        by {book.authorName}
                    </Typography>
                    <Typography component="h2" id="bookprice">
                        <b> Rs.{book.bookPrice}</b>
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={this.changeText} value={this.state.title1} style={book.quantity === 0
                        ? {backgroundColor: "#d3d3d3", pointerEvents: "none", marginBottom: "2%", width: "60%"}
                        : {backgroundColor: this.state.color, width: "60%", marginBottom: "2%", color: "#fff"}}>
                        {this.state.title1}
                    </Button>
                    <Button onClick={this.changeText} value={this.state.title2} style={book.quantity === 0
                        ? {backgroundColor: "#0A0102", pointerEvents: "none", marginBottom: "2%", width: "60%"}
                        : {backgroundColor: "#FFFFFF", width: "60%", marginBottom: "2%", color: "black", border: "1px solid black"}}>
                        {this.state.title2}
                    </Button>
                </CardActions>
            </Card>
        );
    }
}

export default withRouter(CustomCard);