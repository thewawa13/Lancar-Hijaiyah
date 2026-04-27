import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    // TAMBAHKAN /:id supaya bisa menerima ID jilid
    path: 'jilid/:id', 
    loadChildren: () => import('./jilid/jilid.module').then( m => m.JilidPageModule)
  },
  {
    // TAMBAHKAN /:id/:page supaya bisa menerima ID jilid dan nomor halaman
    path: 'reader/:id/:page', 
    loadChildren: () => import('./reader/reader.module').then( m => m.ReaderPageModule)
  },
  {
    path: 'bookmark',
    loadChildren: () => import('./bookmark/bookmark.module').then( m => m.BookmarkPageModule)
  },
  {
    path: 'info',
    loadChildren: () => import('./info/info.module').then( m => m.InfoPageModule)
  },
  {
    path: 'game',
    loadChildren: () => import('./game/game.module').then( m => m.GamePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
