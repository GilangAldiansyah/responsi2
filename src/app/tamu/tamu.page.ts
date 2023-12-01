import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-tamu',
  templateUrl: './tamu.page.html',
  styleUrls: ['./tamu.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class TamuPage implements OnInit {

  constructor(public _apiService: ApiService, private modal: ModalController) {}

  dataTamu: any = [];
  modal_tambah = false;
  id: any;
  nama: any;
  alamat: any;
  modal_edit = false;

  ngOnInit() {
    this.getTamu();
  }

  getTamu() {
    this._apiService.tampil('tampil.php').subscribe({
      next: (res: any) => {
        console.log('sukses', res);
        this.dataTamu = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  reset_model() {
    this.id = null;
    this.nama = '';
    this.alamat = '';
  }

  open_modal_tambah(isOpen: boolean) {
    this.modal_tambah = isOpen;
    this.reset_model();
    this.modal_tambah = true;
    this.modal_edit = false;
  }

  open_modal_edit(isOpen: boolean, idget: any) {
    this.modal_edit = isOpen;
    this.id = idget;
    console.log(this.id);
    this.ambilTamu(this.id);
    this.modal_tambah = false;
    this.modal_edit = true;
  }

  cancel() {
    this.modal.dismiss();
    this.modal_tambah = false;
    this.reset_model();
  }

  tambahTamu() {
    if (this.nama != '' && this.alamat != '') {
      let data = {
        nama: this.nama,
        alamat: this.alamat,
      };

      this._apiService.tambah(data, '/tambah.php').subscribe({
        next: (hasil: any) => {
          this.reset_model();
          console.log('berhasil tambah tamu');
          this.getTamu();
          this.modal_tambah = false;
          this.modal.dismiss();
        },
        error: (err: any) => {
          console.log('gagal tambah tamu');
        },
      });
    } else {
      console.log('gagal tambah tamu karena masih ada data yg kosong');
    }
  }

  // hapusTamu(id: any) {
  //   this._apiService.hapus(id, '/hapus.php?id=').subscribe({
  //     next: (res: any) => {
  //       console.log('sukses', res);
  //       this.getTamu();
  //       console.log('berhasil hapus data');
  //     },
  //     error: (error: any) => {
  //       console.log('gagal');
  //     },
  //   });
  // }

  ambilTamu(id: any) {
    this._apiService.lihat(id, '/lihat.php?id=').subscribe({
      next: (hasil: any) => {
        console.log('sukses', hasil);
        let tamu = hasil;
        this.id = tamu.id;
        this.nama = tamu.nama;
        this.alamat = tamu.alamat;
      },
      error: (error: any) => {
        console.log('gagal ambil data');
      },
    });
  }

  editTamu() {
    let data = {
      id: this.id,
      nama: this.nama,
      alamat: this.alamat,
    };
    this._apiService.edit(data, '/edit.php').subscribe({
      next: (hasil: any) => {
        console.log(hasil);
        this.reset_model();
        this.getTamu();
        console.log('berhasil edit Tamu');
        this.modal_edit = false;
        this.modal.dismiss();
      },
      error: (err: any) => {
        console.log('gagal edit Tamu');
      },
    });
  }

}
