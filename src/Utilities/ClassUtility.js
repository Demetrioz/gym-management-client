import moment from 'moment';
import Enumerable from 'linq';

import Utility from 'Utilities/Utility';

import Settings from 'Settings';

class ClassUtility {

    static xPositionMap = {
        'Sunday': 0,
        0: 'Sunday',
        'Monday': 1,
        1: 'Monday',
        'Tuesday': 2,
        2: 'Tuessday',
        'Wednesday': 3,
        3: 'Wednesday',
        'Thursday': 4,
        4: 'Thursday',
        'Friday': 5,
        5: 'Friday',
        'Saturday:': 6,
        6: 'Saturday',
    }

    static calculateScheduleYPosition(time) {

        // 5:00 = 0, increase 2 for each hour, increase 1 if 30 minutes
        let y = 0;

        let hours = moment(time).hours();
        let minutes = moment(time).minutes();

        y = y + ((hours - 5) * 2);
        y = y + (minutes / 30);

        return y;
    }

    static calculateScheduleHeight(beginTime, endTime) {

        // Height increases 1 for every 30 minutes
        let begin = moment(beginTime);
        let end = moment(endTime);
        return (end.diff(begin, 'minutes') / 30);
    }

    static getFirstAvailableTime(scheduleList) {
        let available = {};

        // Loop through all available days
        for(let day = 0; day < 7; day++) {

            // Get all schedules for the current day
            let currentSchedules = Enumerable
                .from(scheduleList)
                .where(schedule => ClassUtility.xPositionMap[schedule.day] === day)
                .toArray();

            // Get all y positions for the current list of classes
            let takenYPositions = [];
            currentSchedules.forEach(schedule => {
                let position = ClassUtility.calculateScheduleYPosition(schedule.beginTime);
                let duration = ClassUtility.calculateScheduleHeight(schedule.beginTime, schedule.endTime);

                takenYPositions.push(position);

                for(let i = 1; i < duration; i++) {
                    position += 1;
                    takenYPositions.push(position);
                }

            });

            takenYPositions.sort(Utility.sortNumber);

            // console.log("taken positions:", takenYPositions);

            // Iterate through all possible class times and return the first available
            for(let y = 0; y < Settings.classScheduleIntervalCount; y++) {
                if(takenYPositions[y] !== y) {

                    // console.log("y:", y);
                    available.day = ClassUtility.xPositionMap[day];

                    // 0 = 5:00, add :30 for every 1, 01:00 for every 2
                    let hour = Settings.classScheduleStart.substring(0,2);
                    let minute = Settings.classScheduleStart.substring(3);

                    // console.log("hour:", hour);
                    // console.log("minute:", minute);
                    let numericHour = parseInt(hour);
                    let numericMinute = parseInt(minute);

                    let hourOffset = Math.floor(y / 2);
                    for(let i = 0; i < hourOffset; i++) {
                        numericHour += 1;
                    }

                    let minuteOffset = y % 2;
                    for(let i = 0; i < minuteOffset; i++) {
                        numericMinute = numericMinute === 30
                            ? 0
                            : 30;
                    }

                    // console.log("hourOffset:", hourOffset);
                    // console.log("minuteOffset:", minuteOffset);

                    // console.log("numeric times:", numericHour, numericMinute);

                    hour = numericHour < 10
                        ? `0${numericHour}`
                        : `${numericHour}`;

                    let numericEndHour = numericMinute < 10
                        ? numericHour
                        : numericHour + 1;

                    let endHour = numericEndHour < 10
                        ? `0${numericEndHour}`
                        : `${numericEndHour}`

                    minute = numericMinute < 10
                        ? `0${numericMinute}`
                        : `${numericMinute}`;

                    let end = numericMinute < 10
                        ? `${endHour}:30`
                        : `${endHour}:00`

                    available.start = `${hour}:${minute}`;
                    available.end = end;
                    break;
                }
            }

            if(available.day && available.start && available.end);
                break;
        }

        return available;
    }
}

export default ClassUtility;