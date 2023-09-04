var fn1 = () => {
   console.log("fn1");
   return Promise.resolve(1);
};
var fn2 = () =>
   new Promise((resolve) => {
      console.log("fn2");
      setTimeout(() => resolve(2), 1000);
   });

function promiseReduce(asyncFunctions, reduce, initialValue) {
   let promise = Promise.resolve(initialValue);
   for (let i = 0; i < asyncFunctions.length; i++) {
      const func = asyncFunctions[i];
      promise = promise.then((memo) => {
         return func().then((value) => {
            return reduce(memo, value);
         });
      });
   }
   return promise;
}

promiseReduce(
   [fn1, fn2],
   function (memo, value) {
      console.log("reduce");
      return memo * value;
   },
   1
).then(console.log);

//рабочий код через async

// async function promiseReduce(asyncFunctions, reduce, initialValue) {
//    var func;
//    // Реализация
//    let lastData = initialValue;
//    //let data1;

//    for (let i = 0; i < asyncFunctions.length; i++) {
//       func = asyncFunctions[i];
//       const data = await func();

//       lastData = reduce(lastData, data);
//    }
//    return lastData;
// }
