import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { AccordionModule } from 'primeng/accordion';
import { InputTextModule } from 'primeng/inputtext';
import { StepsModule } from 'primeng/steps';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    BreadcrumbModule,
    RouterTestingModule,
    DividerModule,
    TableModule,
    ButtonModule,
    CardModule,
    AccordionModule,
    InputTextModule,
    StepsModule,
    HttpClientTestingModule,
    BrowserAnimationsModule
  ],
  exports: [
    CommonModule,
    BreadcrumbModule,
    RouterTestingModule,
    DividerModule,
    TableModule,
    ButtonModule,
    CardModule,
    AccordionModule,
    InputTextModule,
    StepsModule,
    HttpClientTestingModule,
    BrowserAnimationsModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class TestingModule {}
