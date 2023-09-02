const maxItemAssociation = function (arrInput) {
   let count = 0,
      i,
      j,
      a,
      b,
      sumItemInUser = [],
      objectFP = {},
      indexMaximum = 0,
      retArrr = [];
   //здесь создали объект и занесли в него сколько раз упомянается наш товар по всем выборкам
   for (i = 0; i < arrInput.length; i++) {
      for (j = 0; j < arrInput[i].length; j++) {
         if (objectFP.hasOwnProperty(arrInput[i][j])) {
            continue;
         } else {
            for (a = 0; a < arrInput.length; a++) {
               for (b = 0; b < arrInput[a].length; b++) {
                  if (arrInput[i][j] === arrInput[a][b]) {
                     count++;
                  }
               }
            }
            objectFP[arrInput[i][j]] = count;
            count = 0;
         }
      }
   }
   for (i = 0; i < arrInput.length; i++) {
      for (j = 0; j < arrInput[i].length; j++) {
         count += objectFP[arrInput[i][j]];
      }
      sumItemInUser.push(count);
      count = 0;
   }
   //находим индекс эл-та (и массива) в котором большего всего число, а згначит и совпадений
   indexMaximum = sumItemInUser.indexOf(Math.max.apply(null, sumItemInUser));
   //пробегаемся по всем массивам и заносим в окончательный массив товары
   for (i = 0; i < arrInput.length; i++) {
      for (a = 0; a < arrInput.length; a++) {
         if (arrInput[a].indexOf(arrInput[indexMaximum][i]) != -1) {
            for (b = 0; b < arrInput[a].length; b++) {
               if (retArrr.indexOf(arrInput[a][b]) == -1) {
                  retArrr.push(arrInput[a][b]);
               }
            }
         }
      }
   }

   return retArrr.sort();
};

console.log(
   maxItemAssociation([
      ["q", "w", "a"],
      ["a", "b"],
      ["a", "c"],
      ["q", "e"],
      ["b", "r"],
   ])
);
