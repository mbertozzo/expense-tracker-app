module.exports = (db, offset, limit) => {
  return db.movement
    .findAndCountAll({
      offset,
      limit,
      order: [ ['id', 'DESC'] ]
    })
    .then(result => ({
      nodes: result.rows,
      totalCount: result.count
    })
    )
}