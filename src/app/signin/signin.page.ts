import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
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
export class SigninPage implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, public api: RestApiService, public loadingCtrl: LoadingController, private storage: Storage, private navCtrl: NavController, public toastController: ToastController) {
    this.form = this.formBuilder.group({
      usuario: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.storage.get('userData').then((userData) => {
      if (userData) {
        this.navCtrl.navigateRoot('/lista');
      }
    });
  }

  async signIn() {
    if (!this.validate()) {
      return;
    }

    const loading = await this.loadingCtrl.create({ message: 'Autenticando' })
    loading.present();

    this.api.post('/auth', this.form.value, await this.api.getToken)
      .subscribe(async (res) => {
        await this.storage.set('userData', res);
        await this.navCtrl.navigateForward('/lista');
        loading.dismiss();
      }, (error) => {
        this.toastController.create({ message: this.getErrorMessage(error), duration: 4000, color: 'danger' })
          .then(toast => toast.present());
        loading.dismiss();
      });
  }

  getErrorMessage(error) {
    if (typeof error.error === 'string') {
      return error.error;
    }

    return error.message;
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
