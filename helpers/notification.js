const prisma = require('../helpers/database')

/**
 * Create new notification data to database
 * @param {number} entity_type - 1: new PO, 2: new DN
 * @param {number} entity_id - id of entity (PO)
 * @param {number} actor - id of user logged in
 * @param {number} notifier - id of user notified
 */
const notify = async (entity_type, entity_id, actor, notifier) => {
    const notifObject = await prisma.d_notification_object.create({
        data: {
            entity_type,
            entity_id,
            status: 1
        }
    })

    await prisma.d_notification_change.create({
        data: {
            id_notification_object: notifObject.id_notification_object,
            id_company: actor,
            status: 1
        }
    })

    await prisma.d_notification.create({
        data: {
            id_notification_object: notifObject.id_notification_object,
            id_company: notifier,
            status: 0
        }
    })
}

module.exports = { notify }