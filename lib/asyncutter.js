const afs = require('fs/promises');
const Duration = require('./duration.js');
/**
* 
* @param {{srcInput: string,
*          srcOuput: string, 
*          start: number,
*          end: number}
*          } toCut 
*/
async function asyncut(toCut = {}) {
    const srcInput = toCut.srcInput,
        srcOutput = toCut.srcOutput
    size = (await afs.lstat(srcInput)).size,
        { duration, offset } = Duration.getDuration(srcInput),
        startTime = toCut.start || 0,
        endTime = toCut.end || duration,
        valuePerSecond = (size - offset) / duration,
        start = startTime * valuePerSecond,
        end = endTime * valuePerSecond,

        fileInput = await afs.open(srcInput),

        console.log(fileInput, startTime, endTime);
    try {
        const offsetBuffer = Buffer.alloc(offset);
        await fileInput.read(offsetBuffer, 0, offsetBuffer.length, offset);
        await afs.writeFile(srcOutput, offsetBuffer)

        const audioBuffer = Buffer.alloc(end - start);
        await fileInput.read(audioBuffer, 0, audioBuffer.length, parseInt(start + offset));
        await afs.writeFile(srcOutput, audioBuffer)

    } catch (error) {
        console.log(e)
    } finally {
        await fileInput.close()
    }


}

exports.asyncut = asyncut;