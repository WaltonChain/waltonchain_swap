export function arrSplit(arr, index, size) {
    const offset = (index - 1) * size;
    return offset + size >= arr.length ? arr.slice(offset, arr.length) : arr.slice(offset, offset + size);
}