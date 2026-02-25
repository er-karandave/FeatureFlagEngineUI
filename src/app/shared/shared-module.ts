import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonDataTable } from './components/common-data-table/common-data-table';
import { ErrorHandling } from './components/error-handling/error-handling';
import { NotFoundPage } from './components/not-found-page/not-found-page';
import { Toast } from './services/Toast/toast/toast';


@NgModule({
  declarations: [
    CommonDataTable,
    ErrorHandling,
    NotFoundPage,
    Toast
  ],
  imports: [
    CommonModule,
  ]
})
export class SharedModule { }
