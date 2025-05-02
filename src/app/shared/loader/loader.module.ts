import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '@shared/loader/components/spinner.component';
import { LoaderService } from '@shared/loader/services/loader.service';

@NgModule({
  declarations: [SpinnerComponent],
  imports: [CommonModule],
  exports: [SpinnerComponent],
  providers: [LoaderService]
})
export class LoaderModule {}
