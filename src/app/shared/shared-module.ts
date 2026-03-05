import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonDataTable } from './components/common-data-table/common-data-table';
import { ErrorHandling } from './components/error-handling/error-handling';
import { NotFoundPage } from './components/not-found-page/not-found-page';
import { Toast } from './services/Toast/toast/toast';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { LOCAL_STORAGE } from './services/TokenStorage/token-storage-service';
import { NoLeadingSpace } from './directives/no-leading-space';


@NgModule({
  declarations: [
    CommonDataTable,
    ErrorHandling,
    NotFoundPage,
    Toast,
    NoLeadingSpace
  ],
  imports: [
    CommonModule,
    NgbToast
  ],
  exports:[CommonDataTable,Toast]

})
export class SharedModule { }
