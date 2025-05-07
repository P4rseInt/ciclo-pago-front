import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  items: MenuItem[] = [];
  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };

  constructor(private readonly router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        this.items = this.buildBreadCrumb();
      });
  }

  private buildBreadCrumb(): MenuItem[] {
    const breadcrumbs: MenuItem[] = [];

    const rootRoute = this.router.config.find((r) => r.path === '');
    if (rootRoute?.data?.['breadcrumb']) {
      breadcrumbs.push({
        label: rootRoute.data['breadcrumb']!,
        routerLink: '/'
      });
    }

    const segments = this.router.url
      .split('?')[0]
      .split('/')
      .filter((seg) => seg.length > 0);

    let acc = '';
    segments.forEach((seg) => {
      acc += `/${seg}`;
      const route = this.router.config.find((r) => r.path === seg);
      const label = route?.data?.['breadcrumb'];
      if (label) {
        breadcrumbs.push({ label, routerLink: acc });
      }
    });

    return breadcrumbs;
  }
}
