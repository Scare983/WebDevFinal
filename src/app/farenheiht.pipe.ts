import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'farenheiht'
})
export class FarenheihtPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return ((value * (9/5))+32).toFixed(0);
  }

}
