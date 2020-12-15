import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss'],
})
export class ParentComponent implements OnInit {
  @ViewChild('menubar') menuBar: ElementRef;

  isLargeScreen = window.innerWidth >= 576 ? true : false;
  menu: String = '';
  routerEvent: any;
  showMenu: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.routerEvent = this.router.events.subscribe((res) => {
      if (res instanceof NavigationEnd) {
        this.menu = this.route.snapshot.firstChild.url[0].path;
      }
    });
  }

  @HostListener('window:resize', ['$event']) onResize(event) {
    this.isLargeScreen = event.target.innerWidth >= 576 ? true : false;
    if (this.isLargeScreen) this.showMenu = false;
  }

  toogleMenu() {
    const found = this.menuBar.nativeElement.classList.contains('show');
    if (found) return this.menuBar.nativeElement.classList.remove('show');
    this.menuBar.nativeElement.classList.add('show');
  }

  ngOnInit(): void {}
}
