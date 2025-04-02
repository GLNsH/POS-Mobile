export function getDateTime (is24hours=false) {
    let monthNames = [
        'January','February','March','April','May','June','July','August','September','October','November','December'
    ];
    let now = new Date();
    
    let day = now.getDate();
    let month = monthNames[now.getMonth()];
    let year = now.getFullYear();
    
    let hours = now.getHours();
    let minutes = now.getMinutes();
    
    let date = `${month} ${day}, ${year}`;

    if (is24hours) {
        let time = `${hours}:${minutes}`;
        return [date,time];
    }

    let AMPM = 'AM';
    if (hours/12 > 1) {
        hours -= 12;
        AMPM = 'PM';
    }
    let time = `${hours}:${minutes} ${AMPM}`;
    return [date,time] // date: string, time: string
}