import { Component, inject, Inject } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [HeaderComponent,CommonModule],
  templateUrl: './plans.component.html',
  styleUrl: './plans.component.css'
})
export class PlansComponent {
  isplan:string='';
  http=inject(HttpClient);
  router=inject(Router);
  
  goBack() {
    // window.history.back(); 
    this.router.navigateByUrl("home");
  }
  
  constructor(){
    this.http.get("http://localhost:5000/users/checkplan").subscribe((res:any)=>{
      console.log(res.authcred.planType);
      // this.isplan = res.authcred.planType.toLowerCase();
    },err=>console.log(err))  
  }

  razorpayKey = 'rzp_test_E6LlXaOl1uAoZf'; // Replace with your actual Razorpay key


  basicPlan() {
    this.createOrder(49, 'INR', 'Basic');
  }

  advancePlan() {
    this.createOrder(99, 'INR', 'Advanced');
  }

  createOrder(amount: number, currency: string, plan: string) {
    // Call your backend to create the order
    this.http.post('http://localhost:5000/create-order', { amount, currency })
      .subscribe((order: any) => {
        this.launchRazorpay(order.id, order.amount, plan);
      });
  }


  launchRazorpay(orderId: string, amount: number, plan: string) {
    const options = {
      key: this.razorpayKey, // Your Razorpay Key ID
      amount: amount, // Amount in paisa
      currency: 'INR',
      name: plan,
      description: 'Subscription Payment',
      order_id: orderId, // Pass the order ID from Razorpay
      handler: (response: any) => {
        // Handle success here
        this.paymentSuccess(response, plan);
      },
      prefill: {
        name: 'John Doe', // Prefill customer info if available
        email: 'johndoe@example.com',
        contact: '9999999999'
      },
      theme: {
        color: '#F37254'
      }
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  }

  paymentSuccess(response: any, plan: string) {

      this.http.post('http://localhost:5000/payment-success', {
        razorpayOrderId: response.razorpay_order_id,
        razorpayPaymentId: response.razorpay_payment_id,
        razorpaySignature: response.razorpay_signature,
        paymentAmount: response.amount,
        planType: plan
      }).subscribe((res) => {
        console.log('Payment details saved successfully:', res);
      }, (error) => { 
        console.error('Error saving payment details:', error);
      });

    Swal.fire({
      title: 'Payment Successful!',
      text: `You have successfully subscribed to the ${plan}.`,
      icon: 'success',
      confirmButtonText: 'OK'
    });
    console.log('Razorpay Payment ID:', response.razorpay_payment_id);
  }


  contactus(){
    Swal.fire({
      title: 'Contact Us',
      text: 'Please reach out to our support team at support@example.com for more details on the custom plan.',
      icon: 'info',
      confirmButtonText: 'OK',
      confirmButtonColor: '#3085d6'
    });
  }
}
