import { Sequelize } from "sequelize";

const db = new Sequelize('infinite_scroll_db', 'root', '', {
        host:"localhost",
        dialect:"mysql"
})

export default db