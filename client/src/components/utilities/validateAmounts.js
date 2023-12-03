export function validateAmounts(props) {
   let status = ''
   // no amount entered

   if (!props) {
       status = 'no amount entered';

   } else if (isNaN(props)) {
       status = 'amount must be a number';

   } else if (Number(props) < 0) {
       status = 'amount must be > 0';

   }

   return status;


}
