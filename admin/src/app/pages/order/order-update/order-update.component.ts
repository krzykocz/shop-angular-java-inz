import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../../services/order.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {MessageService} from '../../../services/message.service';

@Component({
  selector: 'app-order-update',
  templateUrl: './order-update.component.html',
  styleUrls: ['./order-update.component.css']
})
export class OrderUpdateComponent implements OnInit {

  public id;
  public order;
  public orderItems;
  public total = 0;
  public messages;

  public message = {
    message: ''
  };


  constructor(private router: Router, private _Activatedroute: ActivatedRoute, private userService: UserService, private orderService: OrderService, private messageService: MessageService) {
  }

  ngOnInit() {
    this.id = this._Activatedroute.snapshot.paramMap.get('id');
    this.orderService.getOrderById(this.id).subscribe(result => {
      this.order = result;
      console.log(result);
    });
    this.orderService.getOrderDetailsByOrderId(this.id).subscribe(result => {
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
      console.log(result);
    });
  }

  sendMessage() {
    // console.log(this.message.message);
    this.messageService.createMessageForOrder(this.message, this.id).subscribe(result => {
      this.getMessages();
    });
  }

}
