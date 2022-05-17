import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import TextFields from "../utils/CustomTextFields";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import '../../css/Wishlist.css'
import {withRouter} from 'react-router';
import CbHeader from "../utils/CbHeader";
import Card from "@material-ui/core/Card";
import {AdminService} from "../../service/AdminService";
//import CartItems from "./CartItems";
import Wishlistitems from "./Wishlistitems";
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import Divider from "@material-ui/core/Divider";
import CbFooter from "../utils/CbFooter";
import SignUp from "./SignUp";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Coupon from "./Coupon";
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';

class Wishlist extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            customerPanel: false,
            btn1: "visible",
            btn2: "visible",
            a: "hidden",
            summaryPanel: false,
            text: false,
            random: 0,
            count: 1,
            enableBtn: true,
            customerName: "", mobileNo: "", pincode: "", locality: "", address: "", city: "", landmark: "", email: "",
            name: " ", contact: " ", pinCode: " ", locaLity: " ", addRess: " ", ciTy: " ", landMark: " ", Email: " ",
            nameError: "", numberError: "", pincodeError: "", localityError: "", addressError: "", cityError: "",
            landmarkError: "", emailError: "", err: "",
            checkoutData: [],
            changedCount: '',
            btnDisable: true,
            color: "grey",
            //totalPrice: "",
            totalValue:0,
            disableFlag: false,
            userData: [], customerData: "",
            addressType: "",
            orderID: '', visibilityOfDialogBox: false,
            discountTotal: "", discountCoupon: 0, coupons: [], couponStatus: "", couponPrice: 0, coupon: "", index: 0
       
        }
    }

    localityValidation = (event, error) => {
        let localityPattern = "^[a-zA-Z]+"
        if (!event.target.value.match(localityPattern)) {
            this.setState({
                [event.target.id]: "Please enter valid location",
                [error]: `Invalid ${event.target.name}`,
                err: true,
            })
        } else {
            this.setState({
                [event.target.id]: " ",
                [error]: "",
                err: false,
            })
        }
    }

    pincodeValidation = (event, error) => {
        let pincodePattern = "^[1-9]{1}[0-9]{2}[-]{0,1}[0-9]{3}$"
        if (!event.target.value.match(pincodePattern)) {
            this.setState({
                [event.target.id]: "Please enter a valid 6 digits zip code",
                [error]: `Invalid ${event.target.name}`,
                err: true,
            })
        } else {
            this.setState({
                [event.target.id]: " ",
                [error]: "",
                err: false,
            })
        }
    }

    addressValidation = (event, error) => {
        let addressPattern = "^\\w{1,150}"
        if (!event.target.value.match(addressPattern)) {
            this.setState({
                [event.target.id]: "Please enter Address between 150 character",
                [error]: `Invalid ${event.target.name}`,
                err: true,
            })
        } else {
            this.setState({
                [event.target.id]: " ",
                [error]: "",
                err: false,
            })
        }
    }

    cityValidation = (event, error) => {
        let cityPattern = "^[a-zA-Z]+"
        if (!event.target.value.match(cityPattern)) {
            this.setState({
                [event.target.id]: "Please enter valid city name",
                [error]: `Invalid ${event.target.name}`,
                err: true,
            })
        } else {
            this.setState({
                [event.target.id]: " ",
                [error]: "",
                err: false,
            })
        }
    }

    changeState = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
        this.buttonVisibility()
    }

    handleCustomer = () => {
        this.setState({
            customerPanel: true,
            btn1: "hidden",
            disableFlag: true
        })
        this.state.disableFlag = true
        this.setTotalValue()
        this.discountCoupon()
    }

    getMyOrder = () => {
        this.setState({
            orderID: 4321123
        }, () => this.props.history.push(`/orders/successful/${this.state.orderID}`))
        // new AdminService().placedOrder(this.state.totalPrice).then(response => {
        //     this.setState({
        //         orderID: response.data.data
        //     }, () => this.props.history.push(`/orders/successful/${this.state.orderID}`))
        // }).catch((error) => {
        //     console.log(error)
        // })
        // console.log('get my order')
    }


    handleSummary = () => {
        this.setState({
            summaryPanel: true,
            btn2: "hidden",
            a: "visible",
            text: true,
            disableFlag: true
        })
        this.state.disableFlag = true
        this.setTotalValue()
        this.buttonVisibility()
    }

    getDetails = () => {
        const data = {
            pincode: this.state.pincode,
            locality: this.state.locality,
            address: this.state.address,
            city: this.state.city,
            landmark: this.state.landmark,
            addressType: this.state.addressType,
        }

        // new AdminService().getDetails(data).then(response => {
        //     console.log(response)
        // }).catch((error) => {
        //     console.log(error)
        // })
    }


    handleCheckOut = () => {
        console.log('handle checkout')
        this.getMyOrder()
        this.getDetails()
        //this.addCoupon()
    }

    handleFocus = () => {
        this.setState({
            text: false,
            btn2: true,
            a: "hidden"
        })
    }

    getUser = () => {
        new AdminService().userDetails().then(response => {
            this.setState({
                userData: response.data
            })
        }).catch((error) => {
            console.log(error)
        })
    }

    componentDidMount() {
        this.handleCart()
        // this.getUser()
        this.buttonVisibility()
    }

    handleCart = () => {
       // new AdminService().myCart().then(response => {
            this.setState({
                checkoutData: new AdminService().myWishlist()
            })
        /*}).catch((error) => {
            this.setState({
                checkoutData: []
            })
        })*/
    }

    setTotalValue = () => {
        let newVar = this.state.checkoutData.map((books, index) => {
            return (books.bookPrice * books.quantity)
        });
        this.state.totalPrice = newVar.reduce((a, b) => a + b)
        this.setState({
            totalValue: this.state.totalPrice
        })
    }

    formCheck() {
        return this.state.pincode.trim().length > 0 && this.state.locality.trim().length > 0 &&
            this.state.address.trim().length > 0 && this.state.city.trim().length > 0;
    }

    errorCheck() {
        return this.state.pinCode.trim().length === 0 && this.state.locaLity.trim().length === 0 &&
            this.state.addRess.trim().length === 0 && this.state.ciTy.trim().length === 0;
    }

    buttonVisibility() {
        if (this.errorCheck() && this.formCheck()) {
            this.setState({
                color: "maroon",
                btnDisable: false
            })
        } else {
            this.setState({
                color: "grey",
                btnDisable: true
            })
        }
    }

    getCoupon = () => {
        this.setState({
            visibilityOfDialogBox: true
        })
    }

    handleClose = () => {
        this.setState({
            visibilityOfDialogBox: false
        })
    }

    handleTotalPrice = (data, status, price, index) => {
        this.setState({
            visibilityOfDialogBox: false,
            coupon: data,
            couponStatus: status,
            couponPrice: price,
            discountCoupon: (this.state.totalPrice - price) < 0 ? 0 : this.state.totalPrice - price,
            index: index
        })
    }

    handleCancel = () => {
        this.setState({visibilityOfDialogBox: false});
    }

    discountCoupon = () => {
        new AdminService().getCoupon(this.state.totalPrice).then(response => {
            this.setState({
                coupons: response.data.data
            })
        }).catch((error) => {
            console.log(error)
        })
    }

    addCoupon = () => {
        new AdminService().addDiscountPrice(this.state.coupon, this.state.totalPrice).then(response => {
            this.setState({
                discountCoupon: response.data.data
            })
        }).catch((error) => {
            console.log(error)
        })
    }


    render() {

        const theme = createMuiTheme({
            palette: {
                primary: {
                    main: '#a52a2a',
                },
            },
        });
        let cartData = new AdminService().myWishlist(); //this.state.checkoutData

        // let user = localStorage.getItem('Authorization');
        //if (!user) {
          //  return <SignUp/>
        //} else
            return (
                <div>
                    <CbHeader/>
                    <ul className="breadcrumb">
                        <li><a href="/">Home</a></li>
                        <li>My Wishlist</li>
                    </ul>
                    
                    <Container id="cartcontainer" maxWidth="md">
                        <Card className={cartData.length === 1 ? "bookdiv1" : "bookdiv"} variant="outlined">
                            <h4>My Wishlist ({cartData.length})</h4>
                            <div className={cartData.length <= 2 ? "no-scroll" : "scrollbar"}>
                                {
                                    cartData.length > 0 ? cartData.map((books, index) => {
                                        return <Wishlistitems flag={this.state.disableFlag}
                                                          handleSummary={this.setTotalValue}
                                                          key={books.id} price={books.totalPrice}
                                                          cartData={cartData} handleCart={this.handleCart}
                                                          cartID={books.id}
                                                          quantity={books.quantity}
                                                          books={books} index={index}/>
                                    }) : <div className="nocartitems">
                                        <img className="noitemsimage" src={require("../../assets/empty-wishlist.png")}
                                             alt="Cart Is Empty"/>
                                        <h3 id="emptycart">Please Add Books To Wishlist</h3>
                                    </div>
                                }
                            </div>
                            {/* <Button onClick={this.handleCustomer}
                                    style={cartData.length === 0 ? {visibility: "hidden"} : {visibility: this.state.btn1}}
                                    id="orderBtn">
                                Continue
                            </Button> */}

                        </Card>
                       
                          
                      
                       
                    </Container>
                    
                    <CbFooter/>
                </div>
            );
    }
}

export default Wishlist;