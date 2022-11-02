import { Injectable } from '@angular/core';
import {
  BreakpointObserver,
  BreakpointState,
  Breakpoints,
} from '@angular/cdk/layout';
import { combineLatest, filter, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ViewportService {
  observe$ = this.getObserve$();

  constructor(private breakpointObserver: BreakpointObserver) {
    console.log(Breakpoints);
  }

  getCurrentBreakpoint(): Observable<'xsm' | 'sm' | 'md' | 'lg' | 'xlg'> {
    return this.observe$.pipe(
      tap((vals) => {
        console.log(vals);
      }),
      map((vals) => Object.entries(vals).find(([key, value]) => value)!),
      filter((val) => !!val),
      map(([key, value]) => key as any)
    );
  }

  private getObserve$() {
    const xsm$ = this.getMatch(Breakpoints.XSmall);
    const sm$ = this.getMatch(Breakpoints.Small);
    const md$ = this.getMatch(Breakpoints.Medium);
    const lg$ = this.getMatch(Breakpoints.Large);
    const xlg$ = this.getMatch(Breakpoints.XLarge);
    return combineLatest([xsm$, sm$, md$, lg$, xlg$]).pipe(
      map(([xsm, sm, md, lg, xlg]) => ({
        xsm,
        sm,
        md,
        lg,
        xlg,
      }))
    );
  }

  private getMatch(value: string | readonly string[]) {
    return this.breakpointObserver.observe(value).pipe(map((v) => v.matches));
  }
}
