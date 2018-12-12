import { Component } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { Storage } from '@ionic/storage';
import { NavController, LoadingController, ToastController, AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { FiltersPage } from '../filters/filters.page';
import { DetailPage } from '../detail/detail.page';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss'],
})
export class ListPage {
  items = []

  constructor(public api: RestApiService, private storage: Storage, private navCtrl: NavController, public modalController: ModalController, public loadingCtrl: LoadingController, public toastController: ToastController, public alertController: AlertController) {
  }

  async ngOnInit() {
    const userData = await this.storage.get('userData');

    if (userData) {
      return this.search()
    }

    await this.navCtrl.navigateRoot('/acesso');
  }

  search = async () => {
    const filters = await this.storage.get('filters')

    if (!filters) {
      return this.openFilters();
    }

    const loading = await this.loadingCtrl.create({ message: 'Carregando' })
    await loading.present();

    this.api.post('/buscar-nota-destino', filters, await this.api.getToken)
      .subscribe(data => {
        this.items = data;
        loading.dismiss();
      }, async (error) => {
        const toast = await this.toastController.create({ message: (error.error.message || error.message), duration: 4000, color: 'danger' })
        await toast.present();
        loading.dismiss();
      });
  }

  async openFilters() {
    const modal = await this.modalController.create({
      component: FiltersPage,
      backdropDismiss: false
    });

    await modal.present();

    modal.onWillDismiss()
      .then(this.search)
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Atenção',
      message: 'Deseja mesmo deslogar?',
      buttons: [
        {
          text: 'Não, voltar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => { }
        }, {
          text: 'Sim, quero sair',
          handler: async () => {
            const loading = await this.loadingCtrl.create({ message: 'Saindo' })
            await loading.present();

            await this.storage.clear();
            await this.navCtrl.navigateRoot('/acesso');
            await loading.dismiss();
          }
        }
      ]
    });

    await alert.present();
  }

  async goToDetail(nota) {
    const modal = await this.modalController.create({
      component: DetailPage,
      componentProps: {
        nota
      }
    });

    await modal.present();
  }
}
