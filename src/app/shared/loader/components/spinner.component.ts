import { Component, inject } from '@angular/core';
import { LoaderService } from '@shared/loader/services/loader.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  loadingService = inject(LoaderService);

  isLoading$ = this.loadingService.isLoading;
}
