import { Component, inject } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SessionService } from '../../../application/services/session.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, RouterModule, MatSidenavModule, MatListModule, MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  showFiller: boolean = false;
  timer: string = '00:00:00';
  sessionService: SessionService = inject(SessionService);
  constructor() {
    this.sessionService.inilitilizeSession();
    this.sessionService.formattedTime.subscribe(timer => this.timer = timer)
  }

  closeSession(): void {
    this.sessionService.closeSession();
  }
}

