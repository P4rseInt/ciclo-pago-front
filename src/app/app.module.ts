import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CicloPagoModule } from '@components/ciclo-pago/ciclo-pago.module';
import { LoaderModule } from '@shared/loader/loader.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoadingInterceptor } from './interceptors/loading/loading.interceptor';
import { BreaddcrumbModule } from '@shared/breadcrumb/breadcrumb.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CicloPagoModule,
    LoaderModule,
    HttpClientModule,
    BreaddcrumbModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  exports: [AppComponent]
})
export class AppModule {}
