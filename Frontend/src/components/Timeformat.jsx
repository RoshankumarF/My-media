const FormatTimeAgo = (date) => {
    const seconds = Math.floor(
        (Date.now() - new Date(date).getTime()) / 1000
    );

    if (seconds < 60) return "Just now";

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
        return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    }

    const days = Math.floor(hours / 24);
    if (days < 30) {
        return `${days} ${days === 1 ? "day" : "days"} ago`;
    }

    const months = Math.floor(days / 30);
    if (months < 12) {
        return `${months} ${months === 1 ? "month" : "months"} ago`;
    }

    const years = Math.floor(months / 12);
    return `${years} ${years === 1 ? "year" : "years"} ago`;
};


export default FormatTimeAgo