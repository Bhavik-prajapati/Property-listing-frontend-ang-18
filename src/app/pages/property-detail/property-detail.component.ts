import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyDetailService } from './property-detail.service';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { PaymentService } from '../payment-gateway/payment.service';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';


declare var bootstrap: any;
declare var Razorpay: any;

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [DatePipe,CommonModule],
  templateUrl: './property-detail.component.html',
  styleUrl: './property-detail.component.css'
})
export class PropertyDetailComponent {

  goBack() {
    window.history.back(); 
  }

  http=inject(HttpClient);
  paymentService=inject(PaymentService);
  constructor(private route: ActivatedRoute,private propertyservice:PropertyDetailService) {
    const token = localStorage.getItem("token") || "";
    const decodedToken: any = jwtDecode(token);
    // console.log(decodedToken,"decode token......",decodedToken.user.id)
  }
  property:any={};
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.propertyservice.getpropertybyid(id).subscribe((res:any)=>{
      this.property=res;
    },error=>{
      console.log(error)
    })
  }

  prevSlide(id: string) {
    const element = document.getElementById(`propertyCarousel${id}`);
    if (element) {
      const carousel = new bootstrap.Carousel(element);
      carousel.prev();
    }
  }

  nextSlide(id: string) {
    const element = document.getElementById(`propertyCarousel${id}`);
    if (element) {
      const carousel = new bootstrap.Carousel(element);
      carousel.next();
    }
  }

  
  
  viewphone(){
    const uniqueReceiptId = 'receipt_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
    const orderData = {
      amount: 10,
      currency: 'INR',
      receipt: uniqueReceiptId 
    };
    this.paymentService.createOrder(orderData).subscribe(order => {
      const options = {
        key: 'rzp_test_E6LlXaOl1uAoZf', // Replace with your Razorpay Key ID
        amount: order.amount,
        currency: order.currency,
        name: 'Test Company',
        description: 'Test Transaction',
        order_id: order.id,
        handler: (response: any) => {
          const paymentData = {
            razorpay_order_id: order.id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          };

          this.paymentService.verifyPayment(paymentData).subscribe(
            () => {
              alert('Payment successful and verified!');
              const paymentData = {
                razorpay_order_id: order.id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                transaction_status: 'completed',
                timestamp: new Date(), 
                user_id: 123, 
                payment_method: 'card',
                amount_paid: order.amount, 
                receipt_number: response.receipt_number,
                transaction_id: response.transaction_id
              };
              // console.log(paymentData);
              this.showOneTimePopup();
            },
            () => {
              alert('Payment verification failed.');
            }
          );
        },
        prefill: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#3399cc'
        }
      };

      const rzp1 = new Razorpay(options);
      rzp1.open();
    });

  }

  showOneTimePopup() {
    if (!localStorage.getItem('popupShown')) {
      Swal.fire({
        title: 'Mo: 9825342912 (kindly Note this number)',
        text: 'Thank you for your payment. This is a one-time message.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        localStorage.setItem('popupShown', 'true');
      });
    }
  }

}
