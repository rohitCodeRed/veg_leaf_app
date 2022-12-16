import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  Input
} from '@angular/core';
import {
  Capacitor
} from '@capacitor/core';

import { Camera, CameraResultType } from '@capacitor/camera';

import { AlertController, LoadingController, Platform } from '@ionic/angular';

import { CnnService } from 'src/app/home/cnn/cnn.service';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss']
})
export class ImagePickerComponent implements OnInit {
  @ViewChild('filePicker', { static: false }) filePickerRef: ElementRef<HTMLInputElement>;
  //@Output() imagePick = new EventEmitter<string | File>();
  showPreview = false;
  selectedImage: string;
  usePicker = false;
  upload_photo = false;
  leaf_file: File
  message:string;
  isMessage=false;

  constructor(private platform: Platform,private cnnService:CnnService,private loadingCtrl:LoadingController,
    private alertCtrl: AlertController) {}

  ngOnInit() {
    console.log('Mobile:', this.platform.is('mobile'));
    console.log('Hybrid:', this.platform.is('hybrid'));
    console.log('iOS:', this.platform.is('ios'));
    console.log('Android:', this.platform.is('android'));
    console.log('Desktop:', this.platform.is('desktop'));
    if (
      (this.platform.is('mobile') && !this.platform.is('hybrid')) ||
      this.platform.is('desktop')
    ) {
      this.usePicker = true;
    }
  }

  onPickImage = async () => {

    if (Capacitor.isPluginAvailable('Camera')) {
      console.log("Camera available...")
    }
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });

    let blob = await fetch(image.webPath).then(r => r.blob());

    let fileObj = new File([blob], "leaf.png",{ "type": "mime" });

    this.leaf_file = fileObj;
    //console.log(image.path,image.webPath,image);
    // let upload_file_name = image.path
    let image_src_url = image.webPath;
    this.selectedImage= image_src_url;
    this.showPreview = true;
    this.upload_photo = true;
    this.isMessage = false;
    //console.log(this.leaf_file)
      
  };

  deleteImg(){
    this.upload_photo = false;
    this.showPreview = false;
    this.selectedImage = "";
    this.isMessage = false;
  }

  uploadClassify(){

    this.loadingCtrl.create({keyboardClose:true,message:'Classifying..'})
      .then(loadingEl =>{
        loadingEl.present();

        this.cnnService.predict_Leaf_photo(this.leaf_file)
        .subscribe(resdata => {
                    //console.log(resdata);
                    loadingEl.dismiss();
                    this.isMessage = true;
                    this.message = resdata.message.image_name.toUpperCase()

                  },
                  error => {
                    console.log("On Predicting",error);
                    loadingEl.dismiss();
                    this.showAlert('An error ocurred!',JSON.stringify(error.error))
                  });

        });
   
    }

  showAlert(header,message){
      this.alertCtrl
                .create({
                  header: header,
                  message: message,
                  buttons: [
                    {
                      text: 'Okay',
                      handler: () => {
                        //TODO..
                      }
                    }
                  ]
                })
                .then(alertEl => alertEl.present());
    }

}


// onFileChosen(event: Event) {
  //   const pickedFile = (event.target as HTMLInputElement).files[0];
  //   if (!pickedFile) {
  //     return;
  //   }
  //   const fr = new FileReader();
  //   fr.onload = () => {
  //     const dataUrl = fr.result.toString();
  //     this.selectedImage = dataUrl;
  //     //this.imagePick.emit(pickedFile);
  //   };
  //   fr.readAsDataURL(pickedFile);
  // }

  // onPickImage() {
  //   if (!Capacitor.isPluginAvailable('Camera')) {
  //     this.filePickerRef.nativeElement.click();
  //     return;
  //   }
  //   Camera.getPhoto({
  //     quality: 50,
  //     source: CameraSource.Prompt,
  //     correctOrientation: true,
  //     // height: 320,
  //     width: 300,
  //     resultType: CameraResultType.Base64
  //   })
  //     .then(image => {
  //       this.selectedImage = image.base64String;
  //       this.imagePick.emit(image.base64String);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       if (this.usePicker) {
  //         this.filePickerRef.nativeElement.click();
  //       }
  //       return false;
  //     });
  // }

