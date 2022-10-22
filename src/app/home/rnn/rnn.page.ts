import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";
import { BaseChartDirective } from 'ng2-charts';
import { RnnService } from './rnn.service';
import { AlertController, LoadingController, SegmentChangeEventDetail } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';

const units={
    "year":"YYYY",
    "average_temperature":"Temperature(Celcius)",
    "rainfall":"Rainfall(mm/100)",
    "crude_oil_price":"Crude Oil($ per Barrel)",
    "wheat_production":"wheat Produce(metric ton/1000)",
    "inflation":"Inflation(%)",
    "wheat_price":"Wheat Price(rs per quintal/10)"
};

const X_AXIS='year';
//const Y_AXIS='wheat_price'

@Component({
  selector: 'app-rnn',
  templateUrl: './rnn.page.html',
  styleUrls: ['./rnn.page.scss'],
})
export class RnnPage implements OnInit {
  segVal="availData";
  isLoading = false;
  form: FormGroup;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  public inData={};
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: []
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true
  };
  public lineChartLegend = true;

  constructor(private rnnService: RnnService,private loadingCtrl:LoadingController,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    this.loadData();

    this.form = new FormGroup({
      avTemp: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      rainfall: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      crudPrice: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      wheatProduce: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      inflation: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }


  generateData(data,labelKey){
    let chartData = {
      labels:[],
      datasets:[]
    }
  
    chartData.labels = data[labelKey].map(function (x) { 
      return parseInt(x); 
    });

    for (let key in data){
      //console.log(index);
      if(key !== labelKey){
        let obj={}
        let pData = data[key]
        if(key =="wheat_production"){

          obj['data']= pData.map(function (x) { 
            return x/1000; 
          });

        }else if (key=="rainfall"){
          obj['data']= pData.map(function (x) { 
            return x/100; 
          });
        }
        else if(key=="wheat_price"){
          obj['data'] = pData.map(function (x) { 
            return x/10; 
          });
        }
        else{
          obj['data']=pData
        }
        obj['label']=units[key]
        obj['fill']= true;
        obj['tension']= 0.3,
        obj['borderColor']= 'black',
        obj['backgroundColor']= 'rgba(255,0,0,0.2)'

        chartData.datasets.push(obj);
      }
    }
    return chartData;
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


  updateChart(datasets,labels){
    //this.chart.chart.labels
    this.chart.chart.data.labels=labels;
    this.chart.chart.data.datasets=datasets;
    this.chart.chart.update();
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    this.segVal = event.toString();
    if (this.segVal  === 'availData') {
      this.loadData();
    } 
    else {
      this.isLoading = false;

    }
  }

  loadData(){
    this.loadingCtrl.create({keyboardClose:true,message:'Logging in'})
      .then(loadingEl =>{
        loadingEl.present();

        this.rnnService.wheatPriceData().subscribe(result =>{
          this.isLoading = false;
          loadingEl.dismiss();
          this.inData = this.generateData(result.data,X_AXIS);
          this.updateChart(this.inData['datasets'],this.inData['labels']);
          //console.log(this.inData);
        },
        error =>{
          this.isLoading = false;
          loadingEl.dismiss();
          this.showAlert('An error ocurred!',JSON.stringify(error.error));
        });
      });
  }

  predictPrice(){
    if (!this.form.valid) {
      //console.log('invalid form...');
      this.showAlert('Invalid Input!','Please fill all form input..');
      return;
    }

    let bodyParams = this.prepRequestParam();
    this.loadingCtrl.create({keyboardClose:true,message:'Predicting...'})
      .then(loadingEl =>{
        loadingEl.present();

        this.rnnService.predict_wheat_price(bodyParams).subscribe(result =>{
          loadingEl.dismiss();
          //console.log(result);
          this.showAlert('**Predicted Wheat Price**',`---- ${result.price} ${result.unit} ----`);
        },
        error =>{
          loadingEl.dismiss();
          this.showAlert('An error ocurred!',JSON.stringify(error.error));
        });
      });

  }

  resetForm(){
    this.form.reset();
  }

  prepRequestParam(){
    let obj={
      "average_temperature":parseFloat(this.form.value.avTemp),
      "rainfall":parseFloat(this.form.value.rainfall),
      "crude_oil_price":parseFloat(this.form.value.crudPrice),
      "wheat_production":parseFloat(this.form.value.wheatProduce),
      "inflation":parseFloat(this.form.value.inflation),
    }
    return obj;
  }

}





















  // newDataPoint(data, label) {
  //   this.lineChartData.datasets.forEach((dataset, index) => {
  //     this.lineChartData.datasets[index].data.push(parseInt(data));
  //   });

  //   this.lineChartData.labels = [...this.lineChartData.labels, label];

  //   console.log(data,label)
  //   console.log(this.chart.chart)
  // }

// const CSV_data = {
//   "unit":{
//     "year":"YYYY",
//     "average_temperature":"Celcius",
//     "rainfall":"mm",
//     "crude_oil_price":"$ per Barrel",
//     "wheat_production":"Metric Ton",
//     "inflation":"%",
//     "wheat_price":"Rs per Quintal"
//   },
//   "data": {
//       "year": [
//           1998.0,
//           1999.0,
//           2000.0,
//           2001.0,
//           2002.0,
//           2003.0,
//           2004.0,
//           2005.0,
//           2006.0,
//           2007.0,
//           2008.0,
//           2009.0,
//           2010.0,
//           2011.0,
//           2012.0,
//           2013.0,
//           2014.0,
//           2015.0,
//           2016.0,
//           2017.0,
//           2018.0,
//           2019.0,
//           2020.0,
//           2021.0
//       ],
//       "average_temperature": [
//           24.19,
//           24.94,
//           24.82,
//           24.71,
//           25.09,
//           24.86,
//           24.94,
//           24.71,
//           25.01,
//           25.02,
//           24.76,
//           25.48,
//           25.42,
//           24.83,
//           24.77,
//           24.65,
//           24.79,
//           24.91,
//           25.27,
//           25.16,
//           25.01,
//           24.95,
//           24.8,
//           24.99
//       ],
//       "rainfall": [
//           1187.06,
//           1062.54,
//           1041.99,
//           1024.41,
//           908.1,
//           1054.2,
//           1028.3,
//           1114.5,
//           1189.7,
//           1133.78,
//           1156.11,
//           998.12,
//           1248.69,
//           1144.57,
//           1065.87,
//           1254.63,
//           1065.13,
//           1124.45,
//           1118.23,
//           1157.12,
//           1018.81,
//           1320.91,
//           1231.95,
//           1209.84
//       ],
//       "crude_oil_price": [
//           14.42,
//           19.35,
//           30.38,
//           25.98,
//           26.19,
//           31.08,
//           41.51,
//           56.64,
//           66.05,
//           72.34,
//           99.67,
//           61.95,
//           79.48,
//           94.88,
//           94.05,
//           97.98,
//           93.17,
//           48.66,
//           43.29,
//           50.8,
//           65.23,
//           56.99,
//           39.68,
//           68.17
//       ],
//       "wheat_production": [
//           66350.0,
//           71288.0,
//           76369.0,
//           69681.0,
//           72766.0,
//           65761.0,
//           72156.0,
//           68637.0,
//           69355.0,
//           75807.0,
//           78570.0,
//           80679.0,
//           80804.0,
//           86874.0,
//           94882.0,
//           93506.0,
//           95850.0,
//           86527.0,
//           87000.0,
//           98510.0,
//           99870.0,
//           103600.0,
//           107860.0,
//           109586.0
//       ],
//       "inflation": [
//           13.23,
//           4.67,
//           4.01,
//           3.78,
//           4.3,
//           3.81,
//           3.77,
//           4.25,
//           5.8,
//           6.37,
//           8.35,
//           10.88,
//           11.99,
//           8.86,
//           9.31,
//           11.06,
//           6.67,
//           4.91,
//           4.95,
//           3.33,
//           3.94,
//           3.73,
//           6.62,
//           5.13
//       ],
//       "wheat_price": [
//           475.0,
//           510.0,
//           550.0,
//           580.0,
//           610.0,
//           620.0,
//           620.0,
//           630.0,
//           640.0,
//           850.0,
//           1000.0,
//           1080.0,
//           1100.0,
//           1170.0,
//           1285.0,
//           1350.0,
//           1400.0,
//           1450.0,
//           1525.0,
//           1625.0,
//           1735.0,
//           1840.0,
//           1925.0,
//           1975.0
//       ]
//   }
// }
