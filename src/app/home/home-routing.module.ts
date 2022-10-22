import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

// const routes: Routes = [
//   {
//     path: '',
//     component: HomePage,
//   }
// ];

const routes: Routes = [
  {
    path: 'tabs',
    component: HomePage,
    children: [
      {
        path: 'cnn',
        children: [
          {
            path: '',
            loadChildren: () => import('./cnn/cnn.module').then(m => m.CnnPageModule)
          },
          // {
          //   path: ':placeId',
          //   loadChildren: () => import('./discover/place-detail/place-detail.module').then(m => m.PlaceDetailPageModule)
          // }
        ]
      },
      {
        path: 'rnn',
        children: [
          {
            path: '',
            loadChildren: () => import('./rnn/rnn.module').then(m => m.RnnPageModule)
          },
          // {
          //   path: 'new',
          //   loadChildren: () => import('./offers/new-offer/new-offer.module').then(m => m.NewOfferPageModule)
          // },
          // {
          //   path: 'edit/:placeId',
          //   loadChildren: () => import('./offers/edit-offer/edit-offer.module').then(m => m.EditOfferPageModule)
          // },
          // {
          //   path: ':placeId',
          //   loadChildren: () => import('./offers/offer-bookings/offer-bookings.module').then(m => m.OfferBookingsPageModule)
          // }
        ]
      },
      {
        path: '',
        redirectTo: '/places/tabs/cnn',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/places/tabs/cnn',
    pathMatch: 'full'
  }
  // {
  //   path: 'cnn',
  //   loadChildren: () => import('./cnn/cnn.module').then( m => m.CnnPageModule)
  // },
  // {
  //   path: 'rnn',
  //   loadChildren: () => import('./rnn/rnn.module').then( m => m.RnnPageModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
