import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private expirationTimestamp: number = Number(localStorage.getItem('expiration'));
  private intervalId: any;
  public timeLeft: number = 0;
  public formattedTime: BehaviorSubject<string> = new BehaviorSubject('');

  public inilitilizeSession(): void {
    this.timeLeft = this.calculateTimeLeft();
    this.startTimer();
  }
  private calculateTimeLeft(): number {
    const now = Math.floor(Date.now() / 1000);
    return Math.max(0, this.expirationTimestamp - now);
  }

  private updateTimer(): void {
    this.timeLeft = this.calculateTimeLeft();
    this.formattedTime.next(this.formatTime(this.timeLeft));
    if (this.timeLeft === 0) {
      localStorage.removeItem('token');
      this.closeSession();
    }
  }

  public closeSession(): void {
    this.stopTimer();
    localStorage.removeItem('token');
    window.location.href = ''
  }
  private startTimer(): void {
    this.intervalId = setInterval(() => {
      this.updateTimer();
    }, 1000);
  }

  private stopTimer(): void {
    clearInterval(this.intervalId);
  }
  private formatTime(timestamp: number): string {
    const hours = Math.floor(timestamp / 3600);
    const minutes = Math.floor((timestamp % 3600) / 60);
    const seconds = Math.floor((timestamp % 60) );

    const paddedHours = hours > 0 ? `${hours}:` : '';
    const paddedMinutes = minutes > 10 && hours > 0 ? `${minutes}` : minutes;
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${paddedHours}${paddedMinutes}:${paddedSeconds}`
  }
}
