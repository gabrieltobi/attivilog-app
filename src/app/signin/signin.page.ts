import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage {
  private form: FormGroup;

  constructor(private formBuilder: FormBuilder, public api: RestApiService, public loadingCtrl: LoadingController, private storage: Storage, private navCtrl: NavController, public toastController: ToastController) {
    this.form = this.formBuilder.group({
      usuario: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

  signIn() {
    if (!this.validate()) {
      return;
    }

    this.loadingCtrl.create({ message: 'Autenticando' })
      .then(loading => {
        loading.present();

        this.api.post('/auth', this.form.value)
          .subscribe(res => {
            this.storage.set('userData', res);
            this.navCtrl.navigateForward('/lista');
            loading.dismiss();
          }, (error) => {
            this.toastController.create({ message: error, duration: 4000, color: 'danger' })
              .then(toast => toast.present());
            loading.dismiss();
          });
      });
  }

  validate() {
    if (!this.form.valid) {
      if (!this.form.controls.usuario.valid) {
        if (this.form.controls.usuario.errors.required) {
          this.toastController.create({ message: 'Usuário Inválido', duration: 3000 })
            .then(toast => toast.present());
        }
      } else {
        if (!this.form.controls.senha.valid) {
          if (this.form.controls.senha.errors.required) {
            this.toastController.create({ message: 'Senha Inválida', duration: 3000 })
              .then(toast => toast.present());
          }
        }
      }
    }

    return this.form.valid;
  }
}
