/**
 * UUID Generator without dependencies
 * @author Breadriuss
 * @return String
*/
export const generatorUID = (): string => {

  let timeLow = (Date.now() * 1000).toString(16);

  timeLow = timeLow.slice(-8).padStart(8, '0');  

  let timeMid = Math.floor(Math.random() * 65536).toString(16);
  let timeHiAndVersion = Math.floor(Math.random() * 65536).toString(16)
  let clockSeqHiAndReserved = Math.floor(Math.random() * 65536).toString(16);
  let node = Math.floor(Math.random() * 281474976710656).toString(16);

  timeLow = timeLow.padStart(8, '0');  //Relleno si es necesario
  timeMid = timeMid.padStart(4, '0');
  timeHiAndVersion = timeHiAndVersion.padStart(4, '0');
  clockSeqHiAndReserved = clockSeqHiAndReserved.padStart(4, '0');
  node = node.padStart(12, '0');

  timeHiAndVersion = (parseInt(timeHiAndVersion, 16) & 0x0fff | 0x4000).toString(16).padStart(4, '0');
  clockSeqHiAndReserved = (parseInt(clockSeqHiAndReserved, 16) & 0x3fff | 0x8000).toString(16).padStart(4, '0');

  const uuidString = `${timeLow}-${timeMid}-${timeHiAndVersion}-${clockSeqHiAndReserved}-${node}`;

  return uuidString;
}