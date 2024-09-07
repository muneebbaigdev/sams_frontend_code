import React from 'react'

function Warningletterprint() {
    function printDiv(divId) {

        var printContents = document.getElementById(divId).innerHTML;
        var originalContents = document.body.innerHTML;
    
        document.body.innerHTML = printContents;
    
        window.print();
    
        document.body.innerHTML = originalContents;
    }
    
      return (
        <div>
          <div id="printableArea">
          <h1>Print me</h1>
        </div>
    
    <input type="button" onClick={()=>{printDiv("printableArea")}} value="print a div!" />
        </div>
      )
}

export default Warningletterprint
