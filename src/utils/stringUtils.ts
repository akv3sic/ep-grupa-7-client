/**
 * Truncates a string description to a specified length and appends '...' if the string exceeds the length.
 *
 * @param {string} description - The description to truncate.
 * @param {number} [length=30] - The maximum length of the returned string. Default is 30.
 * @returns {string} - The truncated description.
 */
const truncateDescription = (description: string, length: number = 30): string => {
    return description.length > length ? description.substring(0, length) + '...' : description;
};

/**
 * Converts a full name to its initials. Each word in the name contributes one initial.
 *
 * @example
 * // returns "JD"
 * fullNameToInitials("John Doe");
 *
 * @param {string} name - The full name to be converted.
 * @returns {string} - The initials corresponding to the full name.
 */
const fullNameToInitials = (name: string): string => {
    if (!name) return '';
    const parts = name.split(' ');
    let initials = '';
    for (let i = 0; i < parts.length; i++) {
        if (parts[i].length > 0 && parts[i] !== '') {
            initials += parts[i][0].toUpperCase();
        }
    }
    return initials;
};

export { truncateDescription, fullNameToInitials };
