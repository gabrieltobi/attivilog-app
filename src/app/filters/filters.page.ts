import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.page.html',
  styleUrls: ['./filters.page.scss'],
})
export class FiltersPage implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private modalCtrl: ModalController, public loadingCtrl: LoadingController, private storage: Storage, public toastController: ToastController) {
    this.form = this.formBuilder.group({
      notaFiscal: [null],
      destinatarioDocumento1: ['']
    });
  }

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({ message: 'Carregando' })
    await loading.present();
    const filters = await this.storage.get('filters');

    if (filters) {
      let parsedFilters = {
        notaFiscal: (filters.notaFiscal || null),
        destinatarioDocumento1: (filters.destinatarioDocumento1 || '')
      }

      this.form.setValue(parsedFilters)
    }

    await loading.dismiss();
  }

  async setFilters() {
    const { value } = this.form

    if (!this.validate(value)) {
      return
    }

    let parsedValue: any = {}
    Object.keys(value).forEach(key => {
      const vl = value[key];

      if (vl || (vl === 0)) {
        parsedValue[key] = value[key];
      }
    })

    //notaFiscal must be a string
    if (parsedValue.notaFiscal) {
      parsedValue.notaFiscal += '';
    }

    await this.storage.set('filters', parsedValue);
    this.modalCtrl.dismiss(value);
  }

  validate(value) {
    if (!value.notaFiscal && (value.notaFiscal !== 0) && !value.destinatarioDocumento1) {
      this.showToastRequired()
      return false
    }

    return true;
  }

  async showToastRequired() {
    const toast = await this.toastController.create({ message: 'É necessário informar pelo menos um filtro', duration: 3000 })
    await toast.present();
  }
}
