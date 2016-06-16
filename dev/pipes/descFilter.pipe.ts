import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'descFilter'
})
export class DescFilter implements PipeTransform {
    transform(value: Array<any>, args:string):any {
        if (value.length === 0) {
            return value;
        }

        let resultArray = [];
        args = args.toLowerCase();
        for (let item of value) {
          if(args==='') {
            resultArray.push(item);
          } else {
            if (item.description.toLowerCase().match('^.*' + args + '.*$')) {
                resultArray.push(item);
            }
          }

        }
        return resultArray;
    }
}
