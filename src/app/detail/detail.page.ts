import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  nota: any = {}

  constructor(private datePipe: DatePipe, private modalCtrl: ModalController) { }

  ngOnInit() {
    const format = "dd/MM/yyyy HH:mm:ss";

    if (this.nota.dthremissao) {
      this.nota.dthremissao = this.datePipe.transform(this.nota.dthremissao, format);
    }
    if (this.nota.dthremissaomanifesto) {
      this.nota.dthremissaomanifesto = this.datePipe.transform(this.nota.dthremissaomanifesto, format);
    }
    if (this.nota.dthrentrega) {
      this.nota.dthrentrega = this.datePipe.transform(this.nota.dthrentrega, format);
    }
    if (this.nota.inicioderota) {
      this.nota.inicioderota = this.datePipe.transform(this.nota.inicioderota, format);
    }
    if (this.nota.previsaoentrega) {
      this.nota.previsaoentrega = this.datePipe.transform(this.nota.previsaoentrega, format);
    }
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
