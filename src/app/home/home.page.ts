import { Component } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  items = []

  constructor(public api: RestApiService, private storage: Storage, private navCtrl: NavController) {
  }

  ngOnInit() {
    this.storage.get('userData').then((userData) => {
      console.log(userData)
      this.search()
    });
  }

  async search() {
    await this.api.post('/buscar-nota-destino', { "notaFiscal": "251392" })
      .subscribe(res => {
        console.log(res);
        this.items = res
      }, err => {
        console.log(err);
      });
  }
}
