function CompoundModel(sequelize, Sequelize){
    const Compound = sequelize.define("compound", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        CompoundName: {
            type: Sequelize.TEXT
        },
        CompounrDescription: {
            type: Sequelize.TEXT
        },
        strImageSource: {
            type: Sequelize.TEXT
        },
        strImageAttribution: {
            type: Sequelize.TEXT
        },
        dateModified: {
            type: Sequelize.DATE
        }
    },{
        timestamps: false
    });

    return Compound;
}

module.exports = CompoundModel;
