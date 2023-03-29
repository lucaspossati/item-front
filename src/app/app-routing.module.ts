import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateItemComponent } from './components/item/create-item/create-item.component';
import { ListItemComponent } from './components/item/list-item/list-item.component';

const routes: Routes = [
  {path: '', component: ListItemComponent},
  {path: 'item', component: CreateItemComponent},
  {path: 'item/:itemCode', component: CreateItemComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
