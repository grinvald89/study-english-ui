import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'percent'
})
export class PercentPipe implements PipeTransform {
    transform(value: number): string {
        return value.toFixed(2);
    }
}
