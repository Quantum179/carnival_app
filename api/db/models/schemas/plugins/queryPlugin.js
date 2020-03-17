//global plugin
export const buildAnRunQuery = (query, options) => {
  if(Object.keys(options).length > 0) {
    let {fields, populate, sort, limit} = options

    if(populate != null) {
      query.populate(populate)
    }
    if(sort != null) {
      query.sort(sort)
    }
    if(limit != null) {
      query.limit(limit)
    }
    if(fields != null) {
      query.select(fields)
    }
  }

  return query.exec()
}

export default function(schema, opts) {
  schema.statics._getMany = function(params = {}, options = {}) {
    let query = this.find(params)
    return buildAnRunQuery(query, options)
  }
  schema.statics._getOne = function(params = {}, options = {}) {
    let query = this.findOne(params)
    return buildAnRunQuery(query, options)
  }
  schema.statics._getByID = function(id = {}, options = {}) {
    let query = this.findById(id)
    return buildAnRunQuery(query, options)
  }
  schema.statics._getByUUID = function(id = {}, options = {}) {
    let query = this.findOne({uuid: id})
    return buildAnRunQuery(query, options)
  }
  schema.statics._create = function(item) {
    return this.create(item)
  }
  schema.statics._update = function(params, item, options = {}) {
    let query = this.update(params, {$set: item})
    return buildAnRunQuery(query, options)
  }
  schema.statics._deleteByID = function(id) {
    return this.remove(id)
  } 
}