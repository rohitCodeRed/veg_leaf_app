import { Component, OnInit } from '@angular/core';
import { MenuController, SegmentChangeEventDetail } from '@ionic/angular';
import { AuthService } from '../../auth/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { CnnService } from './cnn.service';

@Component({
  selector: 'app-cnn',
  templateUrl: './cnn.page.html',
  styleUrls: ['./cnn.page.scss'],
})
export class CnnPage implements OnInit {

  isLoading = false;
  segVal = 'classifyLeaf'
  vegetables_leaf = []

  ngOnInit() {
  }

  constructor( 
    private authService: AuthService,
    private cnnService: CnnService,
    private router:Router,
    private loadingCtrl:LoadingController,
    private alertCtrl: AlertController) { }

  onFilterUpdate(event:any) {
    //console.log(event)
    this.segVal = event.detail.value.toString();
    if (this.segVal  === 'classifyLeaf') {
      this.isLoading=false;
    } else {
      this.isLoading=true;
      this.cnnService.vegetableLeafs().subscribe(data=>{
          this.isLoading=false;
          this.vegetables_leaf = data;
          //console.log(data)
      });
    }
  }
}
