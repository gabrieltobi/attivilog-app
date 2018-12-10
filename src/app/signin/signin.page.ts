import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  private todo: FormGroup;

  constructor(private formBuilder: FormBuilder, public api: RestApiService, public loadingController: LoadingController, private storage: Storage, private navCtrl: NavController) {
    this.todo = this.formBuilder.group({
      usuario: ['', Validators.required],
      senha: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  async logForm() {
    await this.api.post('/auth', this.todo.value)
      .subscribe(res => {
        this.storage.set('userData', res);
        this.navCtrl.navigateForward('/home');
      }, err => {
        console.log(err);
      });
  }
}
