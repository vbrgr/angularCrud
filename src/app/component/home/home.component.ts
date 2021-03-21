import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { TransferService } from '../../service/transfer.service';
import { ConfirmationDialogService } from '../../service/confirmation-dialog/confirmation-dialog.service';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  users: any;

  userForm: FormGroup;
  userupdateForm: FormGroup;
  submitted = false;
  invalidLogin: boolean;
  loading = false;
  errorMsg: string;
  successMsg: string;
  action: any;
  usersData: any;
  editData: any;
  name: string;
  email: string;
  password: string;
  type: string;
  constructor( private router: Router, private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private transferService: TransferService,
    private http: HttpClient,
    private confirmationDialogService: ConfirmationDialogService,
    private userService: UserService) {
      this.route.params.subscribe(params => this.action = params);
      this.route.params.subscribe(id => this.action = id);
      this.userForm = formBuilder.group({
        firstname: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]*$')]],
        lastname: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]*$')]],
        id: [this.action['id']]
    });
     // this.formControlValueChanged();
  }
  ngOnInit() {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 2,
      responsive: true,
       // Declare the use of the extension in the dom parameter
       dom: 'Bfrtip',
       // Configure the buttons
       buttons: [
         'colvis',
         'copy',
         'print',
         'excel'
       ],
       colReorder: {
        order: [1, 0, 2],
        fixedColumnsRight: 2
      },
    };
    this.userService.getUsers()
    .subscribe(users => {
      this.users = users;
      // Calling the DT trigger to manually render the table
      this.dtTrigger.next();
    });

    this.successMsg = this.transferService.getData();
      this.userService.getUsers().subscribe((data : any[])=>{
      console.log(data);
      this.usersData = data;
  })
     this.editData = { id: null, firstname: null, lastname: null};
     if (this.action['id']) {
       
        this.userService.getUser(this.action['id']).subscribe(res => {
          this.editData = res;
        }, (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log('Client side Error !');
          } else {
            console.log('Server side Error !' + err);
          }
        });
      }
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }
 

  get f() { return this.userForm.controls; }
  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.userForm.invalid) {
          return;
      }
      const form = this.userForm.value;
    if (this.action['id'] != null) {
      this.updateUser(this.userForm.value);
    } else {
    this.createUser(this.userForm.value);
    }
  }


  public createUser(user){
    this.userService.createUser(user).subscribe((ret)=>{
          console.log("User created: ", ret);
          this.transferService.setData('User created');
          this.router.navigate(['home']);
    });
}
public deleteUser(id){
  this.userService.deleteUser(id).subscribe((ret)=>{
        console.log("User deleted: ", ret);
        this.transferService.setData('User Deleted');
        this.userService.getUsers()
    .subscribe(users => {
      this.users = users;
      // Calling the DT trigger to manually render the table
      this.dtTrigger.next();
    });
        this.router.navigate(['home']);
  })
}


public updateUser(user){
  this.userService.updateUser(user).subscribe((ret)=>{
        console.log("User updated: ", ret);
        this.transferService.setData('User Updated');
        this.router.navigate(['home']);
  });
} 

menuClickHandler(route) {
  this.router.navigate([route]);
}

}
