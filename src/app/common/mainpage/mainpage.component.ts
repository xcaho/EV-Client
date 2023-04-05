import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent {
  var: any

  onSubmit(f: NgForm) {
    console.log(f.value);
    this.var = f;
    console.log(this.var.form.controls.nazwaSpotkania.value);
  }

}
