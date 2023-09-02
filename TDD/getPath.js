function getPath(el) {
   let element = el;
   let ouputArr = [];
   while (element.localName != "body") {
      if (element.localName == "li") {
         let i = 1;
         let elWhile = element;

         while (elWhile.previousElementSibling) {
            elWhile = elWhile.previousElementSibling;
            i++;
         }
         ouputArr.unshift("li:nth-child(" + i + ")");
      } else {
         if (element.hasAttribute("class")) {
            ouputArr.unshift(
               `${element.localName}.${element.getAttribute("class")}`
            );
         } else {
            ouputArr.unshift(element.localName);
         }
      }
      element = element.parentElement;
   }
   ouputArr.unshift("body");
   return ouputArr.join(" ");
}

 module.exports = getPath;