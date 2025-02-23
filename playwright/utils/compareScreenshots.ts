import * as fs from 'fs';
import { PNG } from 'pngjs';

/**
 * Dynamically imports pixelmatch and compares screenshots, returning the mismatch count.
 */
export async function compareScreenshots(
    fileA: string,
    fileB: string,
    diffFile: string,
    threshold = 0.1
): Promise<number> {
    const { default: pixelmatch } = await import('pixelmatch'); // ES module import at runtime

    const img1 = PNG.sync.read(fs.readFileSync(fileA));
    const img2 = PNG.sync.read(fs.readFileSync(fileB));
    const { width, height } = img1;
    const diff = new PNG({ width, height });

    const mismatch = pixelmatch(
        img1.data,
        img2.data,
        diff.data,
        width,
        height,
        { threshold }
    );
    fs.writeFileSync(diffFile, PNG.sync.write(diff));
    return mismatch;
}
