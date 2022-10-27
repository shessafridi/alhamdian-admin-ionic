import { Injectable } from '@angular/core';
import {
  BreakpointObserver,
  BreakpointState,
  Breakpoints,
} from '@angular/cdk/layout';
import { combineLatest, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ViewportService {
  observe$ = this.getObserve$();

  constructor(private breakpointObserver: BreakpointObserver) {
    console.log(Breakpoints);
  }

  private getObserve$() {
    const xsm$ = this.getMatch(Breakpoints.XSmall);
    const sm$ = this.getMatch(Breakpoints.Small);
    const md$ = this.getMatch(Breakpoints.Medium);
    const lg$ = this.getMatch(Breakpoints.Large);
    const xlg$ = this.getMatch(Breakpoints.XLarge);
    return combineLatest([xsm$, sm$, md$, lg$, xlg$]).pipe(
      map(([xsm, sm, md, lg, xlg]) => {
        return {
          xsm,
          sm,
          md,
          lg,
          xlg,
        };
      })
    );
  }

  getCurrentBreakpoint(): Observable<'xsm' | 'sm' | 'md' | 'lg' | 'xlg'> {
    return this.observe$.pipe(
      map((vals) => Object.entries(vals).find(([key, value]) => value)!),
      map(([key, value]) => key as any)
    );
  }

  private getMatch(value: string | readonly string[]) {
    return this.breakpointObserver.observe(value).pipe(map((v) => v.matches));
  }
}
