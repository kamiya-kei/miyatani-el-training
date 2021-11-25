module Resolvers
  class Tasks < GraphQL::Schema::Resolver
    PER_PAGE = 10

    type Types::TasksType, null: true

    argument :word, String, required: false
    argument :done_ids, [ID], required: false
    argument :sort_type, String, required: false
    argument :is_asc,    Boolean, required: false
    argument :target,    String,  required: false
    argument :page,      Int,     required: false
    argument :user_id,   ID,      required: false

    def resolve(user_id: nil, **args)
      user = context[:user]
      if user_id.present? && user.role.id != Role::ADMIN
        raise GraphQL::ExecutionError, 'admin only'
      end

      target_user_id = user_id || user.id # ユーザーを指定していなければログイン中のユーザーのデータを取得
      page = args.fetch(:page, 1)

      tasks = Task.where(user_id: target_user_id).search(**search_params(args))
      count = tasks.count
      {
        tasks: tasks.page(page).per(PER_PAGE),
        count: count,
        max_page: (count / 10.0).ceil
      }
    end

    private

    def search_params(args)
      {
        word: args.fetch(:word, ''),
        target: args.fetch(:target, 'all'),
        done_ids: args.fetch(:done_ids, [-1, 0, 1]),
        sort_type: args.fetch(:sort_type, 'created_at'),
        is_asc: args.fetch(:is_asc, false)
      }
    end
  end
end
