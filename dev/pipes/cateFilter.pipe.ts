import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'cateFilter'
})
export class CateFilter implements PipeTransform {
    transform(value: Array<any>, args:string, args2:string):any {
        if (value.length === 0) {
            return value;
        }
        let resultArray = [];
        if (args2==='') {
          for(let item of value) {
              resultArray.push(item);
          }
        } else {
          if (args==='price' || args==='rating') {
            for (let item of value) {
              if(item[args] == args2) {
                resultArray.push(item);
              }
            }
          } else if(args==='type') {
            for (let item of value) {
              let hereTypeArray = item.type;
              for(let eachType of hereTypeArray) {
                if(eachType === args2) {
                  resultArray.push(item);
                  break;
                }
              }
            }
          }
        }
        return resultArray;
    }
}
