const formatTime = (timeString) => {
    const date = new Date(timeString);
    const options = {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'UTC'
    };
    return date.toLocaleString('en-US', options);
};

export { formatTime };
