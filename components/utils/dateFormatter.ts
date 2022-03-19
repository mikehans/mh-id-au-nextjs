export default function dateFormatter(theDate:string, format:string) {
    const months = {
        short: [
            'Jan', 'Feb', 'Mar', 'Apr',
            'May', 'Jun', 'Jul', 'Aug',
            'Sep', 'Oct', 'Nov', 'Dec'
        ],
        long: [
            'January', 'February', 'March', 'April',
            'May', 'June', 'July', 'August',
            'September', 'October', 'November', 'December'
        ]
    }

    const postDate = new Date(theDate);
    const postDateString = `${postDate.getDate()} ${months[format][postDate.getMonth()]} ${postDate.getFullYear()}`;

    return postDateString;
}