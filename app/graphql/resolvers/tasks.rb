module Resolvers
  class Tasks < GraphQL::Schema::Resolver
    type [Types::TaskType], null: false

    def resolve
      Task.all.order(created_at: 'DESC')
    end
  end
end
