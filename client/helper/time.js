

export const dateToString = (date) => {
    date = new Date(date);
    const currentDate = new Date();
    const timeDifference = currentDate - date;
    const minutesDifference = Math.floor(timeDifference / (1000 * 60));
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const weeksDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7));

    if (weeksDifference > 0) {
        return `${weeksDifference} week${weeksDifference > 1 ? 's' : ''} ago`;
    } else if (daysDifference > 0) {
        return `${daysDifference} day${daysDifference > 1 ? 's' : ''} ago`;
    } else if (hoursDifference > 0) {
        return `${hoursDifference} hour${hoursDifference > 1 ? 's' : ''} ago`;
    } else {
        return `${minutesDifference} minute${minutesDifference > 1 ? 's' : ''} ago`;
    }
}