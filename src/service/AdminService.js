import Axios from 'axios'
import Constant from '../config/Constant'
import React from 'react';
export class AdminService extends React.Component{
    addbook = (e, data) => {
        e.preventDefault();
        return Axios({
            method: 'post',
            url: `${Constant.apiUrl}admin/book`,
            data: data,
        })
    }

    displaybook = (page) => {
        return Axios({
            method: 'get',
            params: {PageNo: page, PageSize: 8},
            url: `${Constant.apiUrl}books`,
        })
    }

    getCount = () => {
        return Axios({
            method: 'get',
            url: `${Constant.apiUrl}books/count`,
        })
    }

    searchAndFilter = (pageNo, searchText, filterName) => {
        return Axios({
            method: 'get',
            url: `${Constant.apiUrl}sort/${pageNo - 1}/${searchText}/${filterName}`,
            
            
        })
    
    }

    addToCart = (data) => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        cartItems.push(data);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        /*return Axios({
            method: 'post',
            headers: {token: localStorage.getItem('Authorization')},
            url: `${Constant.apiUrl}cart`,
            data: data,
        })*/
    }
    
    addToWishlist = (data) => {
        const wishlistItems = JSON.parse(localStorage.getItem('wishlistItems') || '[]');
        wishlistItems.push(data);
        localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
        /*return Axios({
            method: 'post',
            headers: {token: localStorage.getItem('Authorization')},
            url: `${Constant.apiUrl}cart`,
            data: data,
        })*/
    }

    myCart = () => {
        return JSON.parse(localStorage.getItem('cartItems') ? localStorage.getItem('cartItems') : '[]');
        /*return Axios({
            method: 'get',
            headers: {token: localStorage.getItem('Authorization')},
            url: `${Constant.apiUrl}cart`
        })*/
    }
    myWishlist = () => {
        return JSON.parse(localStorage.getItem('wishlistItems') ? localStorage.getItem('wishlistItems') : '[]');
        /*return Axios({
            method: 'get',
            headers: {token: localStorage.getItem('Authorization')},
            url: `${Constant.apiUrl}cart`
        })*/
    }

    updateCart = (cartValues) => {
        return Axios({
            method: 'put',
            headers: {token: localStorage.getItem('Authorization')},
            url: `${Constant.apiUrl}cart`,
            data: cartValues
        })
    }

    // remove = (id) => {
    //     new AdminService().remove(id); //.then(response => {
    //         this.props.handleCart()
    //     //}).catch((error) => {
    //         // console.log(error)
    //    // })
    // }
remove = (id) => {
        const cartItems = this.myCart();
        cartItems.splice(cartItems.findIndex(item => item.id === id), 1);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        // return Promise(true);
        /*return Axios({
            method: 'delete',
            headers: {token: localStorage.getItem('Authorization')},
            url: `${Constant.apiUrl}cart/${id}`
        })*/
    }
    removeWishlist = (id) => {
        const wishlistItems = this.myWishlist();
        wishlistItems.splice(wishlistItems.findIndex(item => item.id === id), 1);
        localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
        // return Promise(true);
        /*return Axios({
            method: 'delete',
            headers: {token: localStorage.getItem('Authorization')},
            url: `${Constant.apiUrl}cart/${id}`
        })*/
    }
   

    uploadFile = (formData) => {
        return Axios({
            method: 'post',
            data: formData,
            url: `${Constant.apiUrl}admin/books/image`
        })
    }

    register = (registerData) => {

      
        // return Axios({
        //     method: 'post',
        //     url: `${Constant.apiUrl}user/register`,
        //     data: registerData
        // })
    }

    login = (loginData) => {
        return Axios({
            method: 'post',
            url: `${Constant.apiUrl}user/login`,
            data: loginData
        })
    }

    userDetails = () => {
        return Axios({
            headers: {token: localStorage.getItem('Authorization')},
            method: 'get',
            url: `${Constant.apiUrl}customer`,
        })
    }

    forgetPassword = (emailID) => {
        return Axios({
            method: 'post',
            params: {emailID: emailID},
            url: `${Constant.apiUrl}user/forget/password`,
        })
    }

    resetPassword = (password, token) => {
        return Axios({
            method: 'post',
            params: {password: password, token: token},
            url: `${Constant.apiUrl}user/confirm/password/`,
        })
    }

    verifyEmail = (token) => {
        return Axios({
            method: 'post',
            params: {token: token},
            url: `${Constant.apiUrl}user/verify/mail`
        })
    }

    resendMail = (emailID) => {
        return Axios({
            method: 'post',
            url: `${Constant.apiUrl}user/resend/email/${emailID}`
        })
    }

    getDetails = (data) => {
        return Axios({
            headers: {token: localStorage.getItem('Authorization')},
            method: 'post',
            url: `${Constant.apiUrl}customer`,
            data: data
        })
    }

    placedOrder = (totalprice,discountPrice) => {
       // return JSON.parse(localStorage.getItem('totalprice') ? localStorage.getItem('totalprice') : '[]');
        return Axios({
            headers: {token: localStorage.getItem('Authorization')},
            method: 'post',
            params: {totalprice: totalprice,discountPrice:discountPrice},
            url: `${Constant.apiUrl}order`,
        })
    }

    myOrder = () => {
        return Axios({
            headers: {token: localStorage.getItem('Authorization')},
            method: 'get',
            url: `${Constant.apiUrl}order`,
        })
    }

    // getCoupon = (totalPrice) => {
        
    //     return Axios({
    //         headers: {token: localStorage.getItem('Authorization')},
    //         method: 'get',
    //         params: {totalPrice: totalPrice},
    //         url: `${Constant.apiUrl}coupon`,
    //     })
    // }

    addDiscountPrice = (discountCoupon, totalPrice) => {
        return Axios({
            headers: {token: localStorage.getItem('Authorization')},
            method: 'post',
            params: {discountCoupon: discountCoupon, totalPrice: totalPrice},
            url: `${Constant.apiUrl}coupon`,
        })
    }

}