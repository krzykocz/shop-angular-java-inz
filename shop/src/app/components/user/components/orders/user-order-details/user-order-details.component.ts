import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../../../../services/order.service';
import {ActivatedRoute} from '@angular/router';
import {MessageService} from '../../../../../services/message.service';

@Component({
  selector: 'app-user-order-details',
  templateUrl: './user-order-details.component.html',
  styleUrls: ['./user-order-details.component.css']
})
export class UserOrderDetailsComponent implements OnInit {

  public id: any = null;
  public order: any;
  public orderItems: any;
  public total = 0;
  public messages;
  public complaint;

  public message = {
    message: ''
  };

  constructor(private orderService: OrderService, private _Activatedroute: ActivatedRoute, private messageService: MessageService) {
  }

  ngOnInit() {
    this.id = this._Activatedroute.snapshot.paramMap.get('id');

    this.orderService.getUserOrderById(this.id).subscribe(result => {
      console.log(result);
      this.order = result;
      this.complaint = result['complaint'];
    });

    this.orderService.getOrderDetailsByOrderId(this.id).subscribe(result => {
      console.log(result);
      this.orderItems = result;
      this.countTotal();
    });
    this.getMessages();
  }

  countTotal() {
    this.total = 0;
    for (const item of this.orderItems) {
      this.total += (item.count * item.price);
    }
  }

  getMessages() {
    this.messageService.getAllOrderMessages(this.id).subscribe(result => {
      this.messages = result['content'];
    });
  }

  sendMessage() {
    this.messageService.createMessageForOrder(this.message, this.id).subscribe(result => {
      this.getMessages();
    });

  }

}
