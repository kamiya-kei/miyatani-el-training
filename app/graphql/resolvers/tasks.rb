module Resolvers
  class Tasks < BaseResolver
    PER_PAGE = 10

    type Types::TasksType, null: true

    argument :word, String, required: false
    argument :done_ids, [ID], required: false
    argument :sort_type, String, required: false
    argument :is_asc,    Boolean, required: false
    argument :target,    String,  required: false
    argument :page,      Int,     required: false
    argument :user_id,   ID,      required: false
    argument :label_id,  ID,      required: false

    def resolve(user_id: nil, **args)
      tasks = Task.search(target_user_id!(user_id), args)
      page = args.fetch(:page, 1)
      count = tasks.count
      {
        tasks: tasks.page(page).per(PER_PAGE),
        count: count,
        max_page: (count / 10.0).ceil
      }
    end
  end
end
