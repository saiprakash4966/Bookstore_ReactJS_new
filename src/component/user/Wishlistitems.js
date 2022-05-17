import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography";
import {AdminService} from "../../service/AdminService";
import '../../css/Wishlist.css';
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import Divider from "@material-ui/core/Divider";
import {withRouter} from 'react-router';

class WishlistItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: this.props.quantity,
            changedCount: '',
            disableDecrementButton:false,
            disableIncrementButton:true,
            totalPrice:this.props.books.bookPrice,
            imageURL:this.props.books.imageURL,
            title1: "AddToBag",
            title2: "Wishlist",
            color: "rgb(165,42,42)",
            badgeSize: '',
            addedInCart:false
        }
    }
    myCartData = () => {
        const cartDTO = {
            "id": this.props.books.id,
            "quantity": 1,
            "totalPrice":this.props.books.bookPrice,
            "bookName": this.props.books.bookName,
            "authorName": this.props.books.authorName,
            "imageURL":this.props.books.imageURL,
            "bookPrice": this.props.books.bookPrice
        }
        return cartDTO
    }
    changeText = () => {
        if (this.state.title1 === "GO TO CART") {
            //this.props.history.push("/cart");
            this.removeWishlist(this.props.books.id);
        }
        if (this.state.title1 !== "GO TO CART") {
            new AdminService().addToCart(this.myCartData());
            this.setState({
                title1: "GO TO CART", color: "rgb(51,113,181)"
            })
           this.props.cartReference.current.handleBadgeCount(this.state.badgeSize, "addButton");

        }
       

    }

    componentDidMount() {
        // let user = localStorage.getItem('Authorization')
        // if(user !== null) {
            this.handleButtonState();

        // }
    }

    handleButtonState = () => {
        new AdminService().myCart();
        // //new AdminService().myCart().then(response => {
        //     this.handleButton(new AdminService().myCart());
        // //}).catch((error) => {
        //   //  console.log(error)
        // // })
    }
  

    // handleButton = (data) => {
    //     this.setState({
    //         badgeSize: data.length
    //     })
    //     data.filter(data => {
          
    //         if (data.id === this.props.books.id) {
    //             this.setState({
    //                 title1: "GO TO CART", color: "rgb(51,113,181)"
    //             })
    //         }
    //         return null
    //     })
    //    this.props.cartReference.current.handleBadgeCount(data.length, "updateButton")
    // }
    

   
    removeWishlist = (id) => {
        new AdminService().removeWishlist(id); //.then(response => {
            this.props.handleCart()
        //}).catch((error) => {
            // console.log(error)
       // })
    }
    
    
   


    render() {
        let book = this.props.books;
        return (
            <div className="mycart">
                <div>
                    <img src={this.props.books.imageURL} alt="Not found" className="mycart-img"/>
                </div>
                <div className="books-container">
                    <Typography component="h2" id="bookname1">{this.props.books.bookName}</Typography>
                    <Typography variant="body2" color="textSecondary" id="authorName">{this.props.books.authorName}</Typography>
                    <Typography component="h2" id="cost">Rs.
                        {this.props.books.bookPrice}</Typography>
                    <div className="plusminusdiv">
                       
                        <Button onClick={this.changeText}  value={this.state.title1} style={book.quantity === 0
                        ? {backgroundColor: "#d3d3d3", pointerEvents: "none", marginBottom: "20%", width: "60%"}
                        : {backgroundColor: this.state.color, width: "60%", marginBottom: "20%", color: "#fff"}}>
                        {this.state.title1}
                    </Button>
                        <button className="remove" disabled={this.props.flag} onClick={() => this.removeWishlist(this.props.cartID)}
                        style={book.quantity === 0
                            ? {backgroundColor: "#d3d3d3", pointerEvents: "none", marginBottom: "20%",marginLeft:"30%", width: "60%"}
                            : {backgroundColor: this.state.color, width: "60%", marginBottom: "20%", marginLeft:"20%",color: "#fff",marginLeft:"20%"}}>
                            Remove
                        </button>
                    </div>
                </div><br/>
                {this.props.index !== this.props.cartData.length - 1 ?
                    <Divider/>  : console.log()
                }
            </div>

        );
    }
}

export default WishlistItems;