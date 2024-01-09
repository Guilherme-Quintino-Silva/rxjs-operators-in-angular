import { Component, OnInit } from '@angular/core';
import { Observable, filter, first, from, map, of, pipe, tap } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public mapValues$: any;
  public times$ = from(['Palmeiras', 'Corinthians', 'São Paulo', 'Santos']);
  ngOnInit() {
    const firstValue = this.times$.pipe(first());
    firstValue.subscribe((a) => console.log(a));
    
    const valuesReduce = this.getValues().pipe(
      map(x => x.reduce((i, e) => i + e.salary, 0))
    );
    valuesReduce.subscribe(m => {
      console.log(m)
      this.mapValues$ = m;
    });

    const valuesMap = this.getValues().pipe(
      map(x => x.map((e) => e.salary * 2))
    );

    valuesMap.subscribe(m => {
      console.log(m)
    });

    const valuesFilter = this.getValues().pipe(map((x) => x.filter(x => x.age >= 18)))

    valuesFilter.subscribe(m => {
      console.log(m)
    });
  }

  public getValues(): Observable<any[]> {
    const values = [
      { name: 'Guilherme', age: 32, salary: 9000 },
      { name: 'Maria', age: 12, salary: 300 },
      { name: 'Ana', age: 19, salary: 6000 },
      { name: 'Rebeca', age: 18, salary: 3000 },
      { name: 'Sofia', age: 22, salary: 10000 },
      { name: 'Jonathan', age: 26, salary: 5000 }
    ];

    return of(values);
  }
}
