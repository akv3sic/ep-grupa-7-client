export const truncateDescription = (description: string, length: number = 30): string => {
    return description.length > length ? description.substring(0, length) + '...' : description;
};
