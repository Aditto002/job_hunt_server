import userModel from '../models/user.model.js'
import SSLCommerzPayment from 'sslcommerz-lts'
import {ObjectId} from 'mongodb'
const store_id = process.env.STORE_ID
const store_passwd = process.env.STORE_PASSWORD
const is_live = false
const trans_id = new ObjectId().toString()
import dotenv from "dotenv"
dotenv.config();

 export const paymentApply = async (req, res) => {
  const jobId = req.params.id;
  console.log("hjob id      ",jobId)
  const userId = req.user
  console.log(userId)
  const price = 5000;
  try {
    const user = await userModel.findById(userId._id)
    if (!user) {
      return res.status(404).json({ status: 'fail', message: 'User not found' })
    }
    // console.log(user)

    const data = {
      total_amount: price,
      currency: 'BDT',
      tran_id: trans_id, // use unique tran_id for each api call
      success_url: `http://192.168.1.228:3000/api/auth/success-payment?jobId=${jobId}`,
      fail_url: `http://192.168.1.228:3000/fail-payment`,
      cancel_url: `http://192.168.1.228:3000/cancel-payment`,
      ipn_url: `http://localhost:3000/ipn`,
      shipping_method: 'Courier',
      product_name: 'Computer.',
      product_category: 'Electronic',
      product_profile: 'general',
      cus_name: user.email,
      cus_email: user?.email,
      cus_add1: 'Dhaka',
      cus_add2: 'Dhaka',
      cus_city: 'Dhaka',
      cus_state: 'Dhaka',
      cus_postcode: '1000',
      cus_country: 'Bangladesh',
      cus_phone: '01711111111',
      cus_fax: '01711111111',
      ship_name: 'Customer Name',
      ship_add1: 'Dhaka',
      ship_add2: 'Dhaka',
      ship_city: 'Dhaka',
      ship_state: 'Dhaka',
      ship_postcode: 1000,
      ship_country: 'Bangladesh',
    }
    
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    sslcz.init(data).then(apiResponse => {
      // Redirect the user to payment gateway
      console.log(apiResponse)
      let GatewayPageURL = apiResponse.GatewayPageURL
      console.log(GatewayPageURL)
      res.send({ url: GatewayPageURL })
      // console.log("Redirecting to: ", GatewayPageURL);
    })
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal server error' })
  }
}

export const successPayment = async (req, res, next) => {
  try {
    // const userId= req.user._id
    // const userId= jobId
    const jobId = req.query.jobId;
    console.log("SuccessPayment------ ",jobId);
     
    // Find the user
    const user = await userModel.findByIdAndUpdate(
      jobId,
        {
          userType:'Admin'
        },
        { new: true }
      )
      console.log("user    ",user)
    if (!user) {
      return res.status(404).json({ status: 'fail', message: 'User not found' })
    }

    res.status(200).json({ message: 'Payment Successfull!, Now please sign out and login again' })

    // Redirect to success-payment page
    //return res.status(200).redirect(`${process.env.FRONTEND_URL}/success-payment/id=${postId}`)
  } catch (err) {
    console.log("error  ", err)
    return res.status(200).json({ message: 'error Successfull!' })
  }
}