import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WorkspaceEventsService {
  private readonly refreshSource = new Subject<void>();
  readonly refreshRequested$ = this.refreshSource.asObservable();

  requestRefresh(): void {
    this.refreshSource.next();
  }
}