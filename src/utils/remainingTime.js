export function remainingTime(targetTime) {
    const now = new Date();
    const target = new Date(targetTime);

    if (target < now) {
        return { message: 'Time is over!', color: 'gray' };
    }

    const diffMs = target - now;

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    let message = '';
    let color = '';

    if (days > 0) {
        message += `${days} day${days > 1 ? 's' : ''} `;
        color = 'green';
    } else if (hours > 0) {
        message += `${hours} hr${hours > 1 ? 's' : ''} `;
        color = 'green';
    } else if (minutes > 0) {
        message += `${minutes} min${minutes === 1 ? '' : 's'} `;
        color = 'red';
    } else {
        message = 'Less than a minute';
        color = 'red';
    }

    return { message: message.trim() + ' left', color };
}
