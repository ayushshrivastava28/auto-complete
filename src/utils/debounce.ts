export function debounce(func: () => void, delay: number): () => void {
    let timeoutId: ReturnType<typeof setTimeout> | null = null; // Initialize as null
    return function() {
        clearTimeout(timeoutId!); // Use nullish coalescing operator to handle null or undefined
        timeoutId = setTimeout(func, delay);
    };
}