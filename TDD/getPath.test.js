/**
 * @jest-environment jsdom
 */

const getPath  = require('../Javascript/getPath')


describe("getPath", () => {
    beforeEach(() => {
    
    document.body.innerHTML =`
     
         <div class="some" id="333">
             <p>
                 <ul id="55">
                     <li>Этот</li>
                     <li id="someId">тест</li>
                     <li id="123">тест</li>
                 </ul>
             </p>
         </div>`
   });
 
    test("findEl", () => {
       let el = document.getElementById("someId");
       expect(getPath(el)).toHaveLength;
    });
    test("elUnique", () => {
       let el = document.getElementById("someId");
       expect(document.querySelectorAll(getPath(el)).length).toEqual(1);
    });
 });