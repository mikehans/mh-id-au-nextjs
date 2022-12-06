type file = {
  filename: string,
  date: any
}

export function sortByDateDesc(file1: file, file2: file): number {
  if (new Date(file1.date) < new Date(file2.date)) {
    return 1;
  }
  if (new Date(file1.date) > new Date(file2.date)) {
    return -1;
  }
  return 0;
}

export function sortByDate(file1: file, file2: file): number {
  if (new Date(file1.date) > new Date(file2.date)) {
    return 1;
  }
  if (new Date(file1.date) < new Date(file2.date)) {
    return -1;
  }
  return 0;
}