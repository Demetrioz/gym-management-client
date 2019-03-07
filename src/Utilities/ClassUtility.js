import moment from 'moment';

class ClassUtility {

    static xPositionMap = {
        'Sunday': 0,
        'Monday': 1,
        'Tuesday': 2,
        'Wednesday': 3,
        'Thursday': 4,
        'Friday': 5,
        'Saturday:': 6,
    }

    static calculateScheduleYPosition(time) {

        // 5:00 = 0, increase 2 for each hour, increase 1 if 30 minutes
        let y = 0;

        let hours = moment(time).hours();
        let minutes = moment(time).minutes();

        y = y + ((hours - 5) * 2)
        y = y + (minutes / 30)

        return y;
    }

    static calculateScheduleHeight(beginTime, endTime) {

        // Height increases 1 for every 30 minutes
        let begin = moment(beginTime);
        let end = moment(endTime);
        return (end.diff(begin, 'minutes') / 30);
    }

    static getFirstAvailableTime(scheduleList) {
        
    }
}

export default ClassUtility;