export const formattedDate = (date) => new Date(date).toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
});

export const formatNumber = (number) => {
    return number.toLocaleString('ru-RU', { 
        minimumFractionDigits: 0, 
        maximumFractionDigits: 2 
    });
}