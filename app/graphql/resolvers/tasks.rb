module Resolvers
  class Tasks < GraphQL::Schema::Resolver
    type [Types::TaskType], null: false

    def resolve
      Task.all
    end
  end
end
