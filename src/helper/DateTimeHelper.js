import moment from 'moment'
/**
 * calculate Expired Time
 * @param {*} data array or an Item
 * @returns  calculated data
 */
export function calculateExpiredTime (data) {
    // data is an item
    if (!data.length) {
       return calculateDuration(data)
    }
    // data is items array
    return data.map(item => {
        return calculateDuration(item)
    })
}

/**
 * calculate duration from now to item.expires and set result to item
 * @param {*} item 
 * @returns item with calculated data
 */
function calculateDuration(item) {
    if (!item.expires) {
        item.expiredIn = '-'
        return item
    }
    let diffTime = item.expires ? (moment(item.expires).diff(moment.utc(), 'minutes')) : null
    if (diffTime > 0) {
        const duration = moment.duration(diffTime, 'minutes')
        item.expiredIn = ''
        if (duration.days() > 0) {
            item.expiredIn += duration.days() + 'day '
        }
        if (duration.hours() > 0) {
            item.expiredIn += duration.hours() + 'hours '
        }
        if (duration.minutes() > 0) {
            item.expiredIn += duration.minutes() + 'mins'
        }
    } else {
        item.expiredIn = 'Expired'
    }
    return item
}