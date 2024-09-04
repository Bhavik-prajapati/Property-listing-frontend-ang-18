import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaymentService } from './payment.service';
import { environment } from '../../../environments/environment';

declare var Razorpay: any;
@Component({
  selector: 'app-payment-gateway',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './payment-gateway.component.html',
  styleUrl: './payment-gateway.component.css'
})
export class PaymentGatewayComponent {
  amount: number = 500; // Default amount in INR

  constructor(private paymentService: PaymentService) { }

  initiatePayment(): void {
    const orderData = {
      amount: this.amount,
      currency: 'INR',
      receipt: 'receipt_12345' // Unique receipt identifier
    };

    this.paymentService.createOrder(orderData).subscribe(order => {
      const options = {
        key: environment.razorpayKey, // Replace with your Razorpay Key ID
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


}
