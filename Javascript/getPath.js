function getPath(el) {
   let element = el;
   let outputArr = [];
   let ouputPath = "";
   while (element.localName !== "body") {
      if (element.localName == "li") {
         let i = 1;
         let elWhile = element;

         while (elWhile.previousElementSibling) {
            elWhile = elWhile.previousElementSibling;
            i++;
         }
         outputArr.unshift("li:nth-child(" + i + ")");
      } else {
         if (element.hasAttribute("class")) {
            outputArr.unshift(
               `${element.localName}.${element.getAttribute("class")}`
            );
         } else {
            outputArr.unshift(element.localName);
         }
      }
      element = element.parentElement;
   }
   outputArr.unshift("body");
   ouputPath = outputArr.join(">");
   if(document.querySelectorAll(ouputPath).length>1) ouputPath  += ':first-of-type';
   return ouputPath;
}
module.exports = getPath; 