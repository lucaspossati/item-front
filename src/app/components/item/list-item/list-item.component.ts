import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmBoxEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { ToastrService } from 'ngx-toastr';
import { manageItemTypes } from 'src/app/models/enums/manage-item-type';
import { Item } from 'src/app/models/item-model/item';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {
  
  itemList: Item[] = [];

  selectedFilter: any;

  filter!: any;

  metadata = {
    types: manageItemTypes,
  };

  constructor
  (
    private itemService: ItemService,
    private router: Router,
    private confirmBoxEvokeService: ConfirmBoxEvokeService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getList();
  }

  getList(){
    this.itemService.getList(this.filter).subscribe({
      next: (resp) => {
        this.itemList = resp;
      }, 
      error: (e) => {
        this.itemList = [];
      }, 
    });
  }

  updateList(event: any){
    this.filter = event.value;
    this.getList();
  }

  clearFilter(){
    this.getList();
  }

  delete(itemCode: string){
    
    const subscription = this.confirmBoxEvokeService.danger('Alert!', 'Are you sure you want to delete the item?', 'Confirm', 'Decline')
      .subscribe({
        next: (resp) => {
          this.itemService.remove(itemCode).subscribe((resp: any) => {
            this.itemList = this.itemList.filter(x => x.itemCode != itemCode);
            this.toastr.success('Successfully deleted item', 'Success');
          });
        }
      });
  
    setTimeout(() => {
      subscription.unsubscribe();
    }, 2000);
    
    
    
  }

  edit(itemCode: string){
    this.router.navigate(['/edit/' + itemCode]);
  }

  cutDescription(item: Item){
    if(item.description.length > 20)
      item.description = item.description.substring(0,20) + '...';

    return item.description;
  }

}
