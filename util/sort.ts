export function byDate<T>(order: 'desc' | 'asc', dateExtractor: (t: T) => Date) {

    return (a: T, b: T): number => {
        if (order === 'asc') {
            return dateExtractor(a).getTime() - dateExtractor(b).getTime();
        } else {
            return dateExtractor(b).getTime() - dateExtractor(a).getTime();
        }
    }
}