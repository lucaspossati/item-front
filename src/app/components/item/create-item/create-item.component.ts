import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Observable, takeWhile } from 'rxjs';
import { manageItemTypes } from 'src/app/models/enums/manage-item-type';
import { Item } from 'src/app/models/item-model/item';
import { ItemService } from 'src/app/services/item.service';
import { ToastrService } from 'ngx-toastr';
import { Error } from 'src/app/models/error/error';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.css']
})
export class CreateItemComponent implements OnInit {

  itemToEdit: Item;
  formItem!: UntypedFormGroup;
  itemCode: string = '';
  obs:any;
  imagePath: any = 'assets/images/upload-icon.png';

  metadata = {
    types: manageItemTypes,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService,
    private _sanitizer: DomSanitizer,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.createForm();

    this.route.params.subscribe( params => 
      {
        this.itemCode = params['itemCode'];

        if(this.itemCode != null){
          this.get();
        }
      }
    );

  }

  get(){
    this.itemService.get(this.itemCode).subscribe((resp: any) => {
      this.itemToEdit = resp;

      this.setValuesInForm(this.itemToEdit);
    });
  }

  createForm(){
    this.formItem = new UntypedFormGroup({
      itemCode: new UntypedFormControl(null, Validators.required),
      description: new UntypedFormControl(null, Validators.required),
      active: new UntypedFormControl(true, Validators.required),
      customerDescription: new UntypedFormControl(null),
      salesItem: new UntypedFormControl(false, Validators.required),
      stockItem: new UntypedFormControl(false, Validators.required),
      purchasedItem: new UntypedFormControl(false, Validators.required),
      barcode: new UntypedFormControl(null, Validators.required),
      manageItemBy: new UntypedFormControl(null, Validators.required),
      minimumInventory: new UntypedFormControl(null, Validators.required),
      maximumInventory: new UntypedFormControl(null, Validators.required),
      remarks: new UntypedFormControl(null),
      imagePath: new UntypedFormControl(null, Validators.required),
    });
  }

  setValuesInForm(item: Item){
    this.formItem.get('itemCode')!.setValue(item.itemCode);
    this.formItem.get('description')!.setValue(item.description);
    this.formItem.get('active')!.setValue(item.active);
    this.formItem.get('customerDescription')!.setValue(item.customerDescription);
    this.formItem.get('salesItem')!.setValue(item.salesItem);
    this.formItem.get('stockItem')!.setValue(item.stockItem);
    this.formItem.get('purchasedItem')!.setValue(item.purchasedItem);
    this.formItem.get('barcode')!.setValue(item.barcode);
    this.formItem.get('manageItemBy')!.setValue(item.manageItemBy);
    this.formItem.get('minimumInventory')!.setValue(item.minimumInventory);
    this.formItem.get('maximumInventory')!.setValue(item.maximumInventory);
    this.formItem.get('remarks')!.setValue(item.remarks);
    this.formItem.get('imagePath')!.setValue(item.imagePath);
    this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + item.imagePath);
  }

  save() {
    if (this.formItem.invalid) {
      this.toastr.error('Fill in all required fields', 'Error');
      return;
    }

    var cmd = this.formItem.value;

    if (this.itemCode) {
      cmd.manageItemBy = Number(cmd.manageItemBy);
      this.obs = this.itemService.update(this.formItem.value);
    } else {
      cmd.manageItemBy = Number(cmd.manageItemBy);
      this.obs = this.itemService.create(this.formItem.value);
    }

    this.obs.subscribe({
      next: (resp: any) => {
        this.toastr.success(this.itemCode == undefined ? 'Item created successfully' : 'Item updated successfully', 'Success');

        if(this.itemCode == undefined){
          setTimeout(() => {
            this.router.navigate(['/'])
          }, 3000);
        }
      }, 
      error: (e: any) => {
        e.error.errors.forEach((error : Error) => {
          this.toastr.error(error.errorMessage, 'Error');
        });
      },
    });
  }

  uploadImage(event: any) {
    let fileType = event.target.files[0].type;
    if (fileType.match(/image\/*/)) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.imagePath = event.target.result;
      };

      this.toBase64(event.target as HTMLInputElement).pipe().subscribe(resp => {
        this.formItem.get('imagePath')!.setValue(resp.buffer);
      });

    } else {
      window.alert('Please select correct image format');
    }
  }

  public toBase64(file: any): Observable<any> {
    let reader = new FileReader();
    let fileName = file.files[0].name;
    let contentType = file.files[0].type;
    
    reader.readAsBinaryString(file.files[0]);
    
    return new Observable(observer => {
      reader.onload = () => {
        const buffer = btoa(reader.result as string);
        observer.next({
        fileName,
        buffer,
        contentType,
          url: `data:${contentType};base64, ${buffer}`
        });
      }
      
      reader.onerror = error => observer.error(error);
    
    });
    
  }
}
