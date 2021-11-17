module Resolvers
  class Tasks < GraphQL::Schema::Resolver
    PER_PAGE = 10

    type Types::TasksType, null: false

    argument :word, String, required: false
    argument :done_ids, [ID], required: false
    argument :sort_type, String, required: false
    argument :is_asc,    Boolean, required: false
    argument :target,    String,  required: false
    argument :page,      Int,     required: false

    def resolve(page: 1, **args)
      if args.empty?
        tasks = Task.all.order(created_at: 'DESC')
      else
        tasks = Task.search(**args.slice(:word, :target, :done_ids, :sort_type, :is_asc))
      end
      count = tasks.count
      {
        tasks: tasks.page(page).per(PER_PAGE),
        count: count,
        max_page: (count / 10.0).ceil
      }
    end
  end
end
