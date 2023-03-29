import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateItemComponent } from './components/notification/create-item/create-item.component';
import { ListItemComponent } from './components/notification/list-item/list-item.component';

const routes: Routes = [
  {path: '', component: ListItemComponent},
  {path: 'new', component: CreateItemComponent},
  {path: 'edit/:itemCode', component: CreateItemComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
