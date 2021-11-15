module Resolvers
  class Tasks < GraphQL::Schema::Resolver
    type [Types::TaskType], null: false

    argument :word, String, required: false
    argument :done_ids, [ID], required: false
    argument :sort_type, String, required: false
    argument :is_asc,    Boolean, required: false
    argument :target,    String,  required: false

    def resolve(**args)
      return Task.all.order('created_at': 'DESC') if args.empty?

      sort_key = args[:sort_type].underscore # スネークケース
      sort_val = args[:is_asc] ? 'ASC' : 'DESC'
      case args[:target]
      when 'all' then
        tasks = Task.where('title LIKE ? OR description LIKE ?', "%#{args[:word]}%", "%#{args[:word]}%")
      when 'title' then
        tasks = Task.where('title LIKE ?', "%#{args[:word]}%")
      when 'description' then
        tasks = Task.where('description LIKE ?', "%#{args[:word]}%")
      end
      tasks
        .where(done_id: args[:done_ids])
        .order(sort_key => sort_val)
    end
  end
end
